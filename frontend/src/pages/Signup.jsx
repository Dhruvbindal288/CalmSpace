import React, { useState } from "react";
import calm from "../assets/calm.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signupMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/auth/signup", data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      // Refetch authenticated user
      queryClient.invalidateQueries(["authUser"]);
      navigate("/"); // Redirect to home after signup
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signupMutation.mutate(formData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${calm})` }}
    >
      <div className="absolute inset-0 bg-black opacity-20"></div>

      <div className="relative z-10 bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          
         {signupMutation.isError && (
  <p className="text-red-600 text-sm mb-2 text-center">
    {signupMutation.error.response?.data?.message || "Signup failed"}
  </p>
)}

          <button
            type="submit"
            disabled={signupMutation.isLoading}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {signupMutation.isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
