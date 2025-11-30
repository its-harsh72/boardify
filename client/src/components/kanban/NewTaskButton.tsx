import { Plus } from "lucide-react";

interface Props {
  columnId: string;
  color?: string; // optional, if you want different colors later
  onClick: (columnId: string) => void;
}

export default function NewTaskButton({ columnId, color, onClick }: Props) {
  return (
    <button
      onClick={() => onClick(columnId)}
      className="
        w-full py-2.5 mb-4 rounded-xl 
        bg-gray-100 hover:bg-gray-200 
        flex items-center justify-center gap-2
        text-sm font-medium text-gray-700 transition
      "
    >
      <Plus className={`w-4 h-4 ${color || ""}`} />
      New Task
    </button>
  );
}
