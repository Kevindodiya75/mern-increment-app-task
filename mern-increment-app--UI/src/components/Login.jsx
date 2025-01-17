import React, { useState } from "react";
import { loginUser } from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(username, password);
      toast.success("Login successful!");
      navigate("/increment");
      localStorage.setItem("token", response.token);
      localStorage.setItem("UserId", response.userId);
    } catch (error) {
      toast.error("Login failed! Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <input
          className="block w-full p-2 border rounded mb-4"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="block w-full p-2 border rounded mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <span>Don't have an account? </span>
          <button
            onClick={() => navigate("/register")}
            className="text-blue-500 underline"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
