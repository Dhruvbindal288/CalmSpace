import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';

import axiosInstance from '../lib/axios';
import { FaPaperPlane } from 'react-icons/fa';

function Chat() {
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([
    { from: 'bot', text: "Hi there! I'm your best friend. How are you feeling today?" }
  ]);
  const messagesEndRef = useRef(null);

  const chatMutation = useMutation({
    mutationFn: async (data) => {
     
      const res = await axiosInstance.post('/chat', data);
      return res.data;
    },
    onSuccess: (data) => {
      setHistory((prev) => [
        ...prev,
        { from: 'user', text: message },
        { from: 'bot', text: data.reply }
      ]);
      setMessage('');
    },
    onError: (error) => {
      console.error("Chat error:", error);
      setHistory((prev) => [
        ...prev,
        { from: 'user', text: message },
        { from: 'bot', text: "I'm sorry, I'm having a little trouble thinking right now. Please try again in a moment." }
      ]);
      setMessage('');
    }
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() || chatMutation.isLoading) return;

    const messageHistory = history.map(item => item.text);
    chatMutation.mutate({ message, history: messageHistory });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-200 via-pink-100 to-green-200 p-4">
      <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-3xl p-6 w-full max-w-2xl flex flex-col" style={{ height: '80vh' }}>
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          💬 Let's Talk, Bestie
        </h1>

        <div className="flex-1 overflow-y-auto pr-4 space-y-4">
          {history.map((item, index) => (
            <div key={index} className={`flex ${item.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs md:max-w-md p-3 rounded-2xl ${
                  item.from === 'user'
                    ? 'bg-purple-500 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                {item.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex items-center space-x-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            disabled={chatMutation.isLoading}
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            disabled={chatMutation.isLoading}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold p-4 rounded-full transition disabled:bg-purple-400 disabled:cursor-not-allowed"
          >
            {chatMutation.isLoading ? (
              <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
            ) : (
              <FaPaperPlane />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
