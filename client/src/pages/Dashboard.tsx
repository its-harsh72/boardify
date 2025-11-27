import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BoardCard from "../components/BoardCard";
import CreateBoardModal from "../components/CreateBoardModal";
import MainLayout from "@/layouts/MainLayout";

interface Board {
  _id: string;
  title: string;
  description?: string;
}

export default function Dashboard() {
  const nav = useNavigate();
  const [boards, setBoards] = useState<Board[]>([]);
  const [open, setOpen] = useState(false);

  const fetchBoards = async () => {
    try {
      const res = await api.get("/boards");
      setBoards(res.data);
    } catch (err) {
      nav("/"); // Redirect to login if unauthorized
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

 return (
    <MainLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Boards</h1>
          <Button onClick={() => setOpen(true)}>+ Create Board</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((b) => (
            <BoardCard key={b._id} board={b} />
          ))}
        </div>

        <CreateBoardModal open={open} setOpen={setOpen} refresh={fetchBoards} />
      </div>
    </MainLayout>
  );
}
