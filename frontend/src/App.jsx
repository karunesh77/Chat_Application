import { useEffect, useState } from 'react';
import { Send, User, Search, Menu, X } from 'lucide-react';
import './App.css';
import { io } from "socket.io-client"


export default function ChatApp() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [users, setUsers] = useState([
    { id: 1, name: "Sarah Johnson", status: "online", avatar: "SJ", lastMessage: "See you tomorrow!", unread: 0 },
    { id: 2, name: "Mike Chen", status: "online", avatar: "MC", lastMessage: "Thanks for the help!", unread: 2 },
    { id: 3, name: "Emily Davis", status: "offline", avatar: "ED", lastMessage: "Let's catch up soon", unread: 0 },
    { id: 4, name: "James Wilson", status: "online", avatar: "JW", lastMessage: "Perfect!", unread: 1 },
    { id: 5, name: "Lisa Anderson", status: "offline", avatar: "LA", lastMessage: "Got it, thanks!", unread: 0 },
  ]);
  const [activeUser, setActiveUser] = useState(users[0]);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! How are you?", sender: "other", timestamp: "10:30 AM" },
    { id: 2, text: "I'm doing great! Just working on some projects.", sender: "me", timestamp: "10:32 AM" },
  
  ]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const socket = io('http://localhost:3000');
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('message', (data) => {
      setMessages([...messages, data]);
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
    return () => {
      socket.disconnect();
    };
  })

const handleSend=(e)=>{
  e.preventDefault();
  const message = {
    id: messages.length + 1,
    text: inputValue,
   
    timestamp: new Date().toLocaleTimeString(),
  };
  setMessages([...messages, message]);
  setInputValue('');
}

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Users Sidebar - Sliding Panel */}
      <div 
        className={`fixed lg:relative inset-y-0 left-0 z-30 w-80 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close button for mobile */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        {/* Sidebar Header */}
        <div className="px-4 py-5 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => setActiveUser(user)}
              className={`px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors ${
                activeUser.id === user.id ? 'bg-indigo-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-linear-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.avatar}
                </div>
                {user.status === 'online' && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-800 text-sm truncate">{user.name}</h3>
                  {user.unread > 0 && (
                    <span className="bg-indigo-500 text-white text-xs rounded-full px-2 py-0.5 font-semibold">
                      {user.unread}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 truncate">{user.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
        ></div>
      )}

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-linear-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-md px-6 py-4 flex items-center gap-3">
        {/* Menu button to toggle sidebar */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
        
        <div className="relative">
          <div className="w-10 h-10 bg-linear-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
            {activeUser.avatar}
          </div>
          {activeUser.status === 'online' && (
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
          )}
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-800">{activeUser.name}</h1>
          <p className="text-sm text-gray-500 capitalize">{activeUser.status}</p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.sender === 'me'
                  ? 'bg-indigo-500 text-white rounded-br-none'
                  : 'bg-white text-gray-800 rounded-bl-none shadow-md'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === 'me' ? 'text-indigo-100' : 'text-gray-400'
                }`}
              >
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <form onSubmit={handleSend} className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
          />
          <button
            type="submit"
            className="bg-indigo-500 text-white p-3 rounded-full hover:bg-indigo-600 transition-colors duration-200 flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}
