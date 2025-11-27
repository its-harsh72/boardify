import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/axios";
import Column from "../components/kanban/Column";
import { DragDropContext,type  DropResult } from "@hello-pangea/dnd";
import MainLayout from "@/layouts/MainLayout";

interface Task {
  _id: string;
  title: string;
  status: string;
  priority: string;
}

export default function BoardView() {
  const { id } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const res = await api.get(`/tasks/board/${id}`);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDrag = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (destination.droppableId === source.droppableId) return;

    // update UI instantly
    const updated = tasks.map((t) =>
      t._id === draggableId ? { ...t, status: destination.droppableId } : t
    );
    setTasks(updated);

    // update backend
    await api.put(`/tasks/${draggableId}`, {
      status: destination.droppableId,
    });
  };

  const statuses = ["todo", "in-progress", "done"];

  return (
     <MainLayout>
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Board</h1>

      <DragDropContext onDragEnd={handleDrag}>
        <div className="grid grid-cols-3 gap-6">
          {statuses.map((status) => (
            <Column
              key={status}
              status={status}
              tasks={tasks.filter((t) => t.status === status)}
              boardId={id!}
              refresh={fetchTasks}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
    </MainLayout>
  );
}
