import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Board } from "@/types/board";
import { useNavigate } from "react-router-dom";

interface BoardCardProps {
  board: Board;
}
export default function BoardCard({ board }: BoardCardProps) {
  const nav = useNavigate();

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition"
      onClick={() => nav(`/board/${board._id}`)}
    >
      <CardHeader>
        <CardTitle>{board.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{board.description || "No description"}</p>
      </CardContent>
    </Card>
  );
}
