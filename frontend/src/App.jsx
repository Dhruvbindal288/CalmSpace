import { Routes, Route, Navigate } from "react-router-dom";

// Page Imports
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NewDiary from "./pages/NewDiary";
import Chat from "./pages/Chat";
import Diary_id from "./pages/Diary_id";
import UpdateDiary from "./pages/UpdateDiary"; 


import Footer from "./components/Footer";
import Navbar from "./components/Navbar";


import { useAuthUser } from "./hooks/useAuthUser";

function App() {
  const { data: user, isLoading } = useAuthUser();

 
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-10 text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar user={user} />
      <div className="pt-14"> 
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />

          <Route
            path="/diary"
            element={user ? <Diary /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/diary/:id"
            element={user ? <Diary_id /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/new-diary"
            element={user ? <NewDiary /> : <Navigate to="/login" replace />}
          />
          
         
          <Route
            path="/diary/update/:id"
            element={user ? <UpdateDiary /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/mood"
            element={user ? <div className="p-10 text-center">Mood Tracker Page</div> : <Navigate to="/login" replace />}
          />
          <Route
            path="/chat"
            element={user ? <Chat /> : <Navigate to="/login" replace />}
          />
          
          {/* Fallback 404 Route */}
          <Route
            path="*"
            element={<div className="text-center p-10 text-gray-600">404 | Page Not Found</div>}
          />
        </Routes>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;
