import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";

const fetchAffirmation = async () => {
  const res = await axiosInstance.get("/quote/"); 
  return res.data; 
};

function Home() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dailyAffirmation"],
    queryFn: fetchAffirmation,
   
    retry: false,
  });

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-200 via-pink-100 to-green-200 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Hello Bestie 👋
      </h1>
      <p className="text-lg text-gray-600 mb-6 text-center max-w-md">
        I’m your best friend who will never judge you 💜
      </p>

      <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 w-full max-w-md text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Daily Boost
        </h2>
        <p className="text-gray-500 italic">
          {isLoading
            ? "Loading your boost..."
            : isError
            ? "Oops! Something went wrong."
            : data?.quote || "Stay positive today!"}
        </p>
      </div>

      <div className="space-y-4 w-full max-w-sm">
        <button
          onClick={() => navigate("/new-diary")}
          className="w-full bg-purple-400 hover:bg-purple-500 text-white px-6 py-3 rounded-2xl shadow-md transition-all duration-300"
        >
          ✍️ Write in Diary
        </button>

        <button
          onClick={() => navigate("/chat")}
          className="w-full bg-pink-400 hover:bg-pink-500 text-white px-6 py-3 rounded-2xl shadow-md transition-all duration-300"
        >
          💬 Let’s Talk, Bestie
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-6 text-center">
        Your space is safe here. Everything you write is private.
      </p>
    </div>
  );
}

export default Home;
