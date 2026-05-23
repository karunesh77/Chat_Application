import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import Login from "./login/Login.jsx";
import Signup from "./signup/Signup.jsx";
import Home from "./home/Home.jsx";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/signup"
        element={!user ? <Signup /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;
