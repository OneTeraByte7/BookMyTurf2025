import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LogOut, Calendar, CreditCard, Bot, SoccerBall, Badge } from "lucide-react";

const UserSidebar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/login");
  };

  const menuItems = [
    { name: "Book Turf with Payment", icon: <Badge size={20} />, path: "/book-turf" },
    { name: "Payment History", icon: <CreditCard size={20} />, path: "/payment-history" },
    { name: "Events", icon: <Calendar size={20} />, path: "/events" },
    { name: "AI Bots", icon: <Bot size={20} />, path: "/ai-bots" },
  ];

  return (
    <div className="h-screen w-64 bg-green-900 text-white shadow-xl border-r border-green-700 flex flex-col">
      <div className="p-6 text-center text-xl font-bold text-green-400 border-b border-green-700">
        User Dashboard
      </div>

      <nav className="flex-grow">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-5 py-3 text-lg rounded-md transition-all duration-300 ${
              active === item.name ? "bg-green-700" : "hover:bg-green-800"
            }`}
            onClick={() => setActive(item.name)}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-5 py-3 bg-red-600 hover:bg-red-700 text-lg font-bold w-full text-left"
      >
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
};

export default UserSidebar;
