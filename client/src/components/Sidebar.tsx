import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, LayoutDashboard } from "lucide-react";

export default function Sidebar() {
  const nav = useNavigate();

  return (
    <aside className="w-60 bg-gray-50 border-r h-screen p-5 space-y-6">
      <h2 className="text-xl font-bold">Menu</h2>

      <div className="space-y-3">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => nav("/dashboard")}
        >
          <Home className="mr-2 h-4 w-4" /> Dashboard
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => nav("/dashboard")}
        >
          <LayoutDashboard className="mr-2 h-4 w-4" /> Boards
        </Button>
      </div>
    </aside>
  );
}
