import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BoardCard from "../components/BoardCard";
import CreateBoardModal from "../components/CreateBoardModal";
import MainLayout from "@/layouts/MainLayout";
import { Plus, Search } from "lucide-react";

interface Board {
  _id: string;
  title: string;
  description?: string;
}

export default function Dashboard() {
  const nav = useNavigate();
  const [boards, setBoards] = useState<Board[]>([]);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchBoards = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/boards");
      setBoards(res.data);
    } catch (err) {
      nav("/");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const filteredBoards = boards.filter(board =>
    board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    board.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="px-6 lg:px-8 py-8 max-w-7xl mx-auto">
          
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Boards</h1>
              <p className="text-gray-600 mt-2">
                {boards.length} board{boards.length !== 1 ? 's' : ''} • Manage your projects
              </p>
            </div>
            
            {/* SEARCH AND BUTTON CONTAINER */}
            <div className="flex items-center gap-3">
              {/* SEARCH BAR - Smaller and next to button */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search boards..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
                />
              </div>
              
              <Button
                onClick={() => setOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 shadow-sm text-sm"
              >
                <Plus className="h-4 w-4" />
                Create
              </Button>
            </div>
          </div>

          {/* CONTENT */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredBoards.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="w-24 h-24 mx-auto mb-6 opacity-60">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png"
                  alt="No boards"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchQuery ? "No boards found" : "No boards yet"}
              </h3>
              <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                {searchQuery 
                  ? "Try adjusting your search terms"
                  : "Create your first board to get started with project management"
                }
              </p>
              {!searchQuery && (
                <Button
                  onClick={() => setOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
                >
                  Create Your First Board
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBoards.map((board, index) => (
                <div
                  key={board._id}
                  className="transform transition-transform duration-200 hover:scale-105"
                >
                  <BoardCard board={board} />
                </div>
              ))}
            </div>
          )}

          <CreateBoardModal open={open} setOpen={setOpen} refresh={fetchBoards} />
        </div>
      </div>
    </MainLayout>
  );
}