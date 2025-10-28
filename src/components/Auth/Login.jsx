import React, { useState } from "react";
import { loginUser } from "../../utils/api"; // ✅ correct import path

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ Call the backend via utils/api.js
      const response = await loginUser({ email, password });

      // Example: backend returns { token, user }
      if (response.token) {
        handleLogin(response.user, response.token);
      } else {
        setError("Invalid credentials or unexpected response");
      }

      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#0f0f0f]">
      <div className="border-2 border-emerald-600 p-12 rounded-2xl shadow-lg">
        <form
          onSubmit={submitHandler}
          className="flex flex-col items-center justify-center"
        >
          <h1 className="text-3xl font-semibold text-emerald-400 mb-6">
            Employee Login
          </h1>

          {error && (
            <p className="text-red-500 text-sm mb-4 bg-red-500/10 p-2 rounded-md">
              {error}
            </p>
          )}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="text-white outline-none bg-transparent border-2 border-emerald-600 rounded-full py-3 px-5 text-xl placeholder:text-gray-400 w-72"
            type="email"
            placeholder="Enter your email"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="text-white outline-none bg-transparent border-2 border-emerald-600 rounded-full py-3 px-5 text-xl placeholder:text-gray-400 mt-4 w-72"
            type="password"
            placeholder="Enter password"
          />

          <button
            type="submit"
            disabled={loading}
            className={`mt-6 text-white border-2 border-emerald-600 bg-emerald-600 hover:bg-emerald-700 rounded-full py-3 px-8 text-xl transition-all ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
