import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaBars, FaTimes } from "react-icons/fa";


import axiosInstance from "../lib/axios";
import logo from "../assets/CalmSpace.png";


function Navbar({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post("/auth/logout");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/login");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="CalmSpace Logo" className="h-8 w-8" />
            <span className="text-lg font-semibold text-purple-600">
              CalmSpace
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-14">
            <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors">Home</Link>
            <Link to="/diary" className="text-gray-700 hover:text-purple-600 transition-colors">Diary</Link>
            <Link to="/chat" className="text-gray-700 hover:text-purple-600 transition-colors">Chatbot</Link>

            {user ? (
              <>
                
                <button
                  onClick={handleLogout}
                  disabled={logoutMutation.isLoading}
                  className="font-semibold text-purple-600 hover:text-red-600 transition-colors disabled:opacity-50"
                >
                  {logoutMutation.isLoading ? "Logging out..." : "Logout"}
                </button>
              </>
            ) : (
              <Link to="/login" className="font-bold text-gray-700 hover:text-purple-600 transition-colors">Login</Link>
            )}
          </div>

         
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-purple-600 focus:outline-none"
            >
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </div>

   
      {isOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md shadow-md">
          <div className="px-4 py-3 space-y-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-purple-600 transition-colors">Home</Link>
            <Link to="/diary" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-purple-600 transition-colors">Diary</Link>
            <Link to="/chat" onClick={() => setIsOpen(false)} className="block text-gray-700 hover:text-purple-600 transition-colors">Chatbot</Link>

            <div className="border-t border-gray-200 my-2"></div>

            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                disabled={logoutMutation.isLoading}
                className="block w-full text-left font-semibold text-purple-600 hover:text-red-600 transition-colors disabled:opacity-50"
              >
                {logoutMutation.isLoading ? "Logging out..." : "Logout"}
              </button>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)} className="block font-bold text-gray-700 hover:text-purple-600 transition-colors">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
