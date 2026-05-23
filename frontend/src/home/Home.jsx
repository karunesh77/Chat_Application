import { LogOut, MessageSquare } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-blue-400" />
          <span className="text-xl font-bold">ChatApp</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-300 text-sm">
            Hi, <span className="text-white font-medium">{user?.name}</span>
          </span>
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto mt-20 px-4 text-center">
        <div className="bg-gray-800 rounded-2xl p-12 shadow-xl">
          <MessageSquare className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-3">
            Welcome, {user?.name}!
          </h1>
          <p className="text-gray-400 text-lg mb-2">
            You're logged in as <span className="text-blue-400">{user?.email}</span>
          </p>
          <p className="text-gray-500 mt-6">
            Your chat app is ready. You can now deploy this to AWS!
          </p>
        </div>
      </main>
    </div>
  );
}
