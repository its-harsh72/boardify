import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/axios";
import MainLayout from "@/layouts/MainLayout";
import {
  DragDropContext,
  Draggable,
  Droppable,
} from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import { Search } from "lucide-react";

// ✅ IMPORT THE COMPONENT
import NewTaskButton from "@/components/kanban/NewTaskButton";

interface Task {
  _id: string;
  title: string;
  status: string;
  priority: string;
}

interface Board {
  _id: string;
  title: string;
  description?: string;
}

export default function BoardView() {
  const { id } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [board, setBoard] = useState<Board | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("low");
  const [newTaskColumn, setNewTaskColumn] = useState("todo");

  const fetchBoardData = async () => {
    const [boardRes, tasksRes] = await Promise.all([
      api.get(`/boards/${id}`),
      api.get(`/tasks/board/${id}`),
    ]);
    setBoard(boardRes.data);
    setTasks(tasksRes.data);
  };

  useEffect(() => {
    fetchBoardData();
  }, [id]);

  // Create task API call
  const createTask = async () => {
    if (!newTaskTitle.trim()) return;

    await api.post("/tasks", {
      title: newTaskTitle,
      priority: newTaskPriority,
      status: newTaskColumn,
      boardId: id,
    });

    setOpenModal(false);
    setNewTaskTitle("");
    fetchBoardData();
  };

  // Drag handler
  const handleDrag = async (result: DropResult) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const updated = tasks.map((t) =>
      t._id === draggableId ? { ...t, status: destination.droppableId } : t
    );
    setTasks(updated);

    await api.put(`/tasks/${draggableId}`, {
      status: destination.droppableId,
    });
  };

  const statuses = [
    { id: "todo", title: "To Do", color: "bg-purple-500" },
    { id: "in-progress", title: "In Progress", color: "bg-orange-500" },
    { id: "done", title: "Done", color: "bg-green-500" },
  ];

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{board?.title}</h1>
            <p className="text-gray-500">{board?.description}</p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              placeholder="Search tasks..."
              className="pl-10 pr-4 py-2 border rounded-xl bg-white shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* KANBAN COLUMNS */}
        <DragDropContext onDragEnd={handleDrag}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {statuses.map((col) => (
              <div
                key={col.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 flex flex-col"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${col.color}`} />
                    <h2 className="font-semibold text-gray-900 text-sm uppercase">
                      {col.title}
                    </h2>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      {filteredTasks.filter((t) => t.status === col.id).length}
                    </span>
                  </div>
                </div>

                {/* NEW TASK BUTTON (Component) */}
                <NewTaskButton
                  columnId={col.id}
                  onClick={(columnId) => {
                    setNewTaskColumn(columnId);
                    setOpenModal(true);
                  }}
                />

                {/* TASK LIST */}
                <Droppable droppableId={col.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="space-y-4"
                    >
                      {filteredTasks
                        .filter((t) => t.status === col.id)
                        .map((task, index) => (
                          <Draggable
                            key={task._id}
                            draggableId={task._id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                                className="
                                  bg-white border border-gray-200 rounded-xl
                                  p-4 shadow-sm hover:shadow-md transition cursor-pointer
                                "
                              >
                                {/* Priority */}
                                <div
                                  className={`
                                    text-xs inline-block px-2 py-1 rounded-md mb-2
                                    ${
                                      task.priority === "high"
                                        ? "bg-red-100 text-red-700"
                                        : task.priority === "medium"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-blue-100 text-blue-700"
                                    }
                                  `}
                                >
                                  {task.priority}
                                </div>

                                {/* Title */}
                                <h4 className="font-semibold text-sm text-gray-900">
                                  {task.title}
                                </h4>
                              </div>
                            )}
                          </Draggable>
                        ))}

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}

          </div>
        </DragDropContext>

        {/* ADD TASK MODAL */}
        {openModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-5">
              <h2 className="text-xl font-semibold">Create New Task</h2>

              <div>
                <label className="text-sm font-medium">Task Title</label>
                <input
                  className="w-full mt-1 px-3 py-2 border rounded-xl"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Enter task name..."
                />
              </div>

              <div>
                <label className="text-sm font-medium">Priority</label>
                <select
                  className="w-full mt-1 px-3 py-2 border rounded-xl"
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setOpenModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={createTask}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                >
                  Create Task
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </MainLayout>
  );
}
