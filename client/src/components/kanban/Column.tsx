import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import { Button } from "@/components/ui/button";
import { api } from "../../api/axios";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function Column({ status, tasks, boardId, refresh }: any) {
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);

  const createTask = async () => {
    if (!title) return alert("Title required");
    await api.post("/tasks", { title, boardId, status });
    setTitle("");
    setOpen(false);
    refresh();
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg border">
      <h2 className="font-semibold text-lg mb-4 capitalize">{status}</h2>

      <Droppable droppableId={status}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-3 min-h-[200px]"
          >
            {tasks.map((task: any, index: number) => (
              <TaskCard key={task._id} task={task} index={index} refresh={refresh} />
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Add Task */}
      <div className="mt-4">
        {open ? (
          <div className="space-y-2">
            <Input
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Button onClick={createTask} className="w-full">
              Add Task
            </Button>
          </div>
        ) : (
          <Button variant="outline" onClick={() => setOpen(true)} className="w-full">
            + Add Task
          </Button>
        )}
      </div>
    </div>
  );
}
