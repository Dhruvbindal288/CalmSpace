import React, { useState } from "react";
import { useCreateDiary } from "../hooks/useCreateDiary"; 

function NewDiary() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  
  const { mutate: createEntry, isLoading } = useCreateDiary();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    createEntry({ title, content });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-200 via-pink-100 to-green-200 p-6">
      <div className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          ✍️ Write a New Diary Entry
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
          required
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <textarea
            placeholder="How are you feeling today? Write your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={8}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
          ></textarea>

          <button
            type="submit"
            
            disabled={isLoading}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 rounded-2xl shadow-md transition disabled:bg-purple-400 disabled:cursor-not-allowed"
          >
           
            {isLoading ? "Saving..." : "Save Entry"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewDiary;
