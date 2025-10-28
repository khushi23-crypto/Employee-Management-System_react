// src/main.rs
use std::env;
use std::str::FromStr;

use actix_web::{middleware::Logger, web, App, HttpResponse, HttpServer, Responder, get, post, put, delete, HttpRequest};
use bigdecimal::{BigDecimal, ToPrimitive};
use serde::{Deserialize, Serialize};
use sqlx::{PgPool, postgres::PgPoolOptions};
use argon2::{Argon2, PasswordHasher, PasswordVerifier, password_hash::SaltString, PasswordHash};
use jsonwebtoken::{encode, decode, Header, Validation, EncodingKey, DecodingKey};
use chrono::{Utc, Duration, NaiveDateTime};
use rand::rngs::OsRng;

#[derive(Deserialize)]
struct RegisterRequest {
    name: String,
    email: String,
    password: String,
}

#[derive(Deserialize)]
struct LoginRequest {
    email: String,
    password: String,
}

#[derive(Serialize, Deserialize, Clone)]
struct Claims {
    sub: String,
    exp: usize,
}

// This is the struct we send to the frontend (JSON-friendly)
#[derive(Serialize, Debug)]
struct EmployeeOut {
    id: i32,
    name: String,
    email: String,
    position: Option<String>,
    salary: Option<f64>,             // converted from BigDecimal
    created_at: Option<NaiveDateTime>,
}

// This matches DB row types for sqlx::query_as!
#[derive(sqlx::FromRow, Debug)]
struct EmployeeRow {
    id: i32,
    name: String,
    email: String,
    position: Option<String>,
    salary: Option<BigDecimal>,
    created_at: Option<NaiveDateTime>,
}

#[derive(Deserialize)]
struct EmployeeCreate {
    name: String,
    email: String,
    position: Option<String>,
    salary: Option<f64>, // frontend-friendly
}

#[derive(Deserialize)]
struct EmployeeUpdate {
    name: Option<String>,
    email: Option<String>,
    position: Option<String>,
    salary: Option<f64>, // frontend-friendly
}

// === DB helper ===
async fn get_db_pool() -> PgPool {
    let database_url =
        env::var("DATABASE_URL").expect("DATABASE_URL must be set in .env");
    PgPoolOptions::new()
        .max_connections(8)
        .connect(&database_url)
        .await
        .expect("Failed to create DB pool")
}

// === JWT helpers ===
fn generate_jwt(email: &str) -> String {
    let exp = (Utc::now() + Duration::hours(8)).timestamp() as usize;
    let claims = Claims { sub: email.to_owned(), exp };
    let secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
    encode(&Header::default(), &claims, &EncodingKey::from_secret(secret.as_bytes()))
        .expect("Failed to encode jwt")
}

fn verify_jwt_from_header(req: &HttpRequest) -> Result<String, HttpResponse> {
    let header = match req.headers().get("authorization") {
        Some(h) => h.to_str().unwrap_or("").to_string(),
        None => return Err(HttpResponse::Unauthorized().body("Authorization header missing")),
    };
    let token = header.strip_prefix("Bearer ").unwrap_or(&header).to_string();
    let secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
    match decode::<Claims>(&token, &DecodingKey::from_secret(secret.as_bytes()), &Validation::default()) {
        Ok(data) => Ok(data.claims.sub),
        Err(_) => Err(HttpResponse::Unauthorized().body("Invalid or expired token")),
    }
}

// Convert row -> out
fn row_to_out(x: EmployeeRow) -> EmployeeOut {
    let salary_f64 = x.salary.and_then(|s| s.to_f64());
    EmployeeOut {
        id: x.id,
        name: x.name,
        email: x.email,
        position: x.position,
        salary: salary_f64,
        created_at: x.created_at,
    }
}

// === Routes ===

#[post("/api/register")]
async fn register(pool: web::Data<PgPool>, body: web::Json<RegisterRequest>) -> impl Responder {
    // hash password
    let salt = SaltString::generate(&mut OsRng);
    let argon2 = Argon2::default();
    let hashed = match argon2.hash_password(body.password.as_bytes(), &salt) {
        Ok(h) => h.to_string(),
        Err(_) => return HttpResponse::InternalServerError().body("Hashing failed"),
    };
    // insert
    let res = sqlx::query!("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
        body.name, body.email, hashed)
        .execute(pool.get_ref()).await;
    match res {
        Ok(_) => HttpResponse::Created().body("User created"),
        Err(e) => {
            eprintln!("DB error: {}", e);
            HttpResponse::InternalServerError().body("DB error")
        }
    }
}

#[post("/api/login")]
async fn login(pool: web::Data<PgPool>, body: web::Json<LoginRequest>) -> impl Responder {
    let rec = sqlx::query!("SELECT password FROM users WHERE email=$1", body.email)
        .fetch_one(pool.get_ref()).await;
    let row = match rec {
        Ok(r) => r,
        Err(_) => return HttpResponse::Unauthorized().body("Invalid credentials"),
    };
    let parsed = PasswordHash::new(&row.password).map_err(|_| HttpResponse::InternalServerError().body("Hash parse error")).unwrap();
    let argon2 = Argon2::default();
    if argon2.verify_password(body.password.as_bytes(), &parsed).is_err() {
        return HttpResponse::Unauthorized().body("Invalid credentials");
    }
    let token = generate_jwt(&body.email);
    HttpResponse::Ok().json(serde_json::json!({ "token": token }))
}

#[get("/api/employees")]
async fn list_employees(pool: web::Data<PgPool>) -> impl Responder {
    let rows = sqlx::query_as!(
        EmployeeRow,
        "SELECT id, name, email, position, salary, created_at FROM employees ORDER BY id"
    )
    .fetch_all(pool.get_ref())
    .await;

    match rows {
        Ok(r) => {
            let items: Vec<EmployeeOut> = r.into_iter().map(row_to_out).collect();
            HttpResponse::Ok().json(items)
        }
        Err(e) => {
            eprintln!("DB error: {}", e);
            HttpResponse::InternalServerError().body("Failed to fetch employees")
        }
    }
}

#[get("/api/employees/{id}")]
async fn get_employee(pool: web::Data<PgPool>, path: web::Path<i32>) -> impl Responder {
    let id = path.into_inner();
    let row = sqlx::query_as!(
        EmployeeRow,
        "SELECT id, name, email, position, salary, created_at FROM employees WHERE id=$1",
        id
    )
    .fetch_optional(pool.get_ref())
    .await;
    match row {
        Ok(Some(x)) => {
            let emp = row_to_out(x);
            HttpResponse::Ok().json(emp)
        }
        Ok(None) => HttpResponse::NotFound().body("Employee not found"),
        Err(e) => {
            eprintln!("DB error: {}", e);
            HttpResponse::InternalServerError().body("Failed to fetch employee")
        }
    }
}

#[post("/api/employees")]
async fn create_employee(pool: web::Data<PgPool>, body: web::Json<EmployeeCreate>, req: HttpRequest) -> impl Responder {
    // require auth
    if verify_jwt_from_header(&req).is_err() {
        return HttpResponse::Unauthorized().body("Unauthorized");
    }

    // convert Option<f64> -> Option<BigDecimal>
    let salary_bd: Option<BigDecimal> = match body.salary {
        Some(s) => {
            // format to 2 decimals to match NUMERIC(12,2)
            let s_str = format!("{:.2}", s);
            match BigDecimal::from_str(&s_str) {
                Ok(b) => Some(b),
                Err(_) => return HttpResponse::BadRequest().body("Invalid salary format"),
            }
        }
        None => None,
    };

    let res = sqlx::query!(
        "INSERT INTO employees (name, email, position, salary) VALUES ($1, $2, $3, $4) RETURNING id",
        body.name, body.email, body.position, salary_bd
    )
    .fetch_one(pool.get_ref())
    .await;

    match res {
        Ok(r) => HttpResponse::Created().json(serde_json::json!({ "id": r.id })),
        Err(e) => {
            eprintln!("DB error: {}", e);
            HttpResponse::InternalServerError().body("Failed to create employee")
        }
    }
}

#[put("/api/employees/{id}")]
async fn update_employee(pool: web::Data<PgPool>, path: web::Path<i32>, body: web::Json<EmployeeUpdate>, req: HttpRequest) -> impl Responder {
    if verify_jwt_from_header(&req).is_err() {
        return HttpResponse::Unauthorized().body("Unauthorized");
    }
    let id = path.into_inner();

    let salary_bd: Option<BigDecimal> = match body.salary {
        Some(s) => {
            let s_str = format!("{:.2}", s);
            match BigDecimal::from_str(&s_str) {
                Ok(b) => Some(b),
                Err(_) => return HttpResponse::BadRequest().body("Invalid salary format"),
            }
        }
        None => None,
    };

    let res = sqlx::query!(
        "UPDATE employees SET
            name = COALESCE($1, name),
            email = COALESCE($2, email),
            position = COALESCE($3, position),
            salary = COALESCE($4, salary)
         WHERE id = $5",
        body.name.clone(), body.email.clone(), body.position.clone(), salary_bd, id
    )
    .execute(pool.get_ref())
    .await;

    match res {
        Ok(_) => HttpResponse::Ok().body("Updated"),
        Err(e) => {
            eprintln!("DB error: {}", e);
            HttpResponse::InternalServerError().body("Update failed")
        }
    }
}

#[delete("/api/employees/{id}")]
async fn delete_employee(pool: web::Data<PgPool>, path: web::Path<i32>, req: HttpRequest) -> impl Responder {
    if verify_jwt_from_header(&req).is_err() {
        return HttpResponse::Unauthorized().body("Unauthorized");
    }
    let id = path.into_inner();
    let res = sqlx::query!("DELETE FROM employees WHERE id=$1", id)
        .execute(pool.get_ref()).await;
    match res {
        Ok(_) => HttpResponse::Ok().body("Deleted"),
        Err(e) => {
            eprintln!("DB error: {}", e);
            HttpResponse::InternalServerError().body("Delete failed")
        }
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    env_logger::init();
    let pool = get_db_pool().await;

    // create tables if not exists (simple inline migrations)
    // users (for login) & employees
    let _ = sqlx::query(
        r#"CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )"#).execute(&pool).await;
    let _ = sqlx::query(
        r#"CREATE TABLE IF NOT EXISTS employees (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            position TEXT,
            salary NUMERIC(12,2),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )"#).execute(&pool).await;

    println!("Starting server on 127.0.0.1:8080");
    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .wrap(Logger::default())
            .service(register)
            .service(login)
            .service(list_employees)
            .service(get_employee)
            .service(create_employee)
            .service(update_employee)
            .service(delete_employee)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
