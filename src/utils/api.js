// src/utils/api.js

const API_BASE = process.env.REACT_APP_API_URL || "http://127.0.0.1:8080/api";

// ✅ Centralized request helper
async function request(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    ...options,
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || `Request failed: ${res.status}`);
  }

  // Try parsing JSON safely
  try {
    return await res.json();
  } catch {
    return await res.text();
  }
}

// 🧑‍💼 Employee APIs
export async function fetchEmployees() {
  return request("/employees");
}

export async function fetchEmployee(id) {
  return request(`/employees/${id}`);
}

export async function createEmployee(employee, token) {
  return request("/employees", {
    method: "POST",
    body: JSON.stringify(employee),
    token,
  });
}

export async function updateEmployee(id, updates, token) {
  return request(`/employees/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
    token,
  });
}

export async function deleteEmployee(id, token) {
  return request(`/employees/${id}`, {
    method: "DELETE",
    token,
  });
}

// 👤 Auth APIs (for login/register if you add them in backend)
export async function registerUser(userData) {
  return request("/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

export async function loginUser(credentials) {
  return request("/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}
