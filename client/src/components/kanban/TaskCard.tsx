import { Draggable } from "@hello-pangea/dnd";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "../../api/axios";
import { Button } from "@/components/ui/button";
import TaskModal from "./TaskModal";
import { useState } from "react";

export default function TaskCard({ task, index, refresh }: any) {
  const [open, setOpen] = useState(false);

  const removeTask = async (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent card click opening modal
    await api.delete(`/tasks/${task._id}`);
    refresh();
  };

  return (
    <>
      <Draggable draggableId={task._id} index={index}>
        {(provided) => (
          <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="p-3 shadow-sm bg-white cursor-pointer"
            onClick={() => setOpen(true)} // open modal
          >
            <CardContent className="p-0">
              <div className="flex justify-between items-center">
                <p className="font-medium">{task.title}</p>

                {/* DELETE BUTTON */}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={removeTask} // now does NOT open modal
                >
                  X
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </Draggable>

      {/* TASK DETAILS MODAL */}
      <TaskModal open={open} setOpen={setOpen} taskId={task._id} />
    </>
  );
}
