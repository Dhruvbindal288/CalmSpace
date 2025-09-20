import React from "react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-50 to-blue-50 py-6 mt-10 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center text-center space-y-3">
        
        
        <div className="text-xl font-semibold text-purple-600">
          CalmSpace 🌸
        </div>

     
        <p className="text-gray-600 italic max-w-2xl">
          "A safe space to share your thoughts, track your moods, and heal — 
          your best friend who will never judge you."
        </p>

      
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} CalmSpace. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
