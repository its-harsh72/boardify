import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { api } from "../api/axios";
import { X, Plus, LayoutTemplate } from "lucide-react";

export default function CreateBoardModal({
  open,
  setOpen,
  refresh,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  refresh: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) return alert("Title is required");

    setIsLoading(true);
    try {
      await api.post("/boards", { title, description });
      refresh();
      setOpen(false);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Failed to create board:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="
          bg-white
          backdrop-blur-2xl
          border border-gray-100
          rounded-3xl
          shadow-2xl shadow-gray-200/50
          animate-in fade-in-0 zoom-in-95 duration-200
          p-0 overflow-hidden
          max-w-md
        "
      >
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-[#4A5FA5] to-[#5B71CA] p-6">
          <DialogHeader className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <LayoutTemplate className="h-5 w-5 text-white" />
                </div>
                <DialogTitle className="text-xl font-bold text-white">
                  Create New Board
                </DialogTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="
                  h-8 w-8 
                  bg-white/20 
                  hover:bg-white/30 
                  text-white
                  rounded-xl
                  transition-all
                  hover:scale-105
                "
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-white/80 font-normal">
              Organize your projects and tasks in a new workspace
            </p>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <span>Board Title</span>
              <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="e.g. Project Roadmap, Marketing Campaign, Q1 Planning"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="
                bg-gray-50/80
                border border-gray-200
                rounded-xl
                text-gray-900
                placeholder:text-gray-400
                focus:bg-white
                focus:border-[#4A5FA5]
                focus:ring-2 focus:ring-[#4A5FA5]/20
                transition-all
                duration-200
                px-4 py-3
                shadow-sm
              "
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Description
            </label>
            <Input
              placeholder="Add a short description of what this board will be used for..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="
                bg-gray-50/80
                border border-gray-200
                rounded-xl
                text-gray-900
                placeholder:text-gray-400
                focus:bg-white
                focus:border-[#4A5FA5]
                focus:ring-2 focus:ring-[#4A5FA5]/20
                transition-all
                duration-200
                px-4 py-3
                shadow-sm
              "
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            />
          </div>

          {/* Action Buttons - Enhanced Layout */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="
                flex-1 
                rounded-xl
                border-2 border-gray-200
                bg-white
                text-gray-700
                hover:bg-gray-50
                hover:border-gray-300
                hover:text-gray-900
                font-semibold
                transition-all
                duration-200
                py-3
                shadow-sm
              "
            >
              Cancel
            </Button>

            <Button
              onClick={handleCreate}
              disabled={!title.trim() || isLoading}
              className="
                flex-1 
                rounded-xl
                bg-gradient-to-r from-[#4A5FA5] to-[#5B71CA]
                hover:from-[#5B71CA] hover:to-[#6B83DF]
                text-white
                font-semibold
                shadow-lg
                shadow-[#4A5FA5]/25
                hover:shadow-xl hover:shadow-[#5B71CA]/30
                transition-all
                duration-200
                transform
                hover:scale-[1.02]
                disabled:opacity-50
                disabled:scale-100
                disabled:shadow-sm
                flex items-center justify-center gap-2
                py-3
              "
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Create Board
                </>
              )}
            </Button>
          </div>

          {/* Helper Text */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              You can add columns and tasks after creation
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}