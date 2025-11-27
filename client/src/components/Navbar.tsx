import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { api } from "../api/axios";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  const nav = useNavigate();

  const handleLogout = async () => {
    await api.post("/auth/logout");
    nav("/");
  };

  return (
    <nav className="
      w-full 
      h-16 
      bg-white/80 
      backdrop-blur-md 
      border-b 
      shadow-sm 
      flex 
      items-center 
      justify-between 
      px-6
    ">
      {/* Left Section */}
      <h1 className="text-xl font-semibold tracking-tight text-gray-900">
        Boardify
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        
        {/* Avatar */}
        <Avatar className="h-9 w-9 cursor-pointer">
          <AvatarFallback className="bg-blue-600 text-white font-medium">
            B
          </AvatarFallback>
        </Avatar>

        {/* Logout Button */}
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="hover:bg-gray-100 transition"
        >
          Logout
        </Button>

      </div>
    </nav>
  );
}
