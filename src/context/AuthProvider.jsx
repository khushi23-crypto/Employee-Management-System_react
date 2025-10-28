import React, { createContext, useEffect, useState } from "react";
import { fetchEmployees } from "../utils/api";

export const AuthContext = createContext();

const API = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Login user
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Invalid credentials");
      }

      const data = await res.json();

      const userToken = data?.token;
      const userInfo = data?.user || null;

      if (!userToken) throw new Error("Token missing in response");

      localStorage.setItem("token", userToken);
      setToken(userToken);
      setUser(userInfo);

      await loadEmployees(userToken);
      return { success: true, user: userInfo };
    } catch (err) {
      console.error("❌ Login failed:", err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // ✅ Register new user
  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Registration failed");
      }

      const data = await res.json();
      console.log("✅ User registered:", data);
      return { success: true };
    } catch (err) {
      console.error("❌ Register failed:", err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setEmployees([]);
  };

  // ✅ Fetch all employees
  const loadEmployees = async (authToken = token) => {
    if (!authToken) return;
    try {
      const data = await fetchEmployees(authToken);
      setEmployees(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("❌ Error loading employees:", err);
    }
  };

  // ✅ Auto load on mount
  useEffect(() => {
    if (token) loadEmployees(token);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        employees,
        loading,
        login,
        register,
        logout,
        setEmployees,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
