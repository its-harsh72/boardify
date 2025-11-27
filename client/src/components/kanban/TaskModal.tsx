import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ActivityList from "./ActivityList";

export default function TaskModal({ open, setOpen, taskId }: any) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Task Activity</DialogTitle>
        </DialogHeader>

        <ActivityList taskId={taskId} />
      </DialogContent>
    </Dialog>
  );
}
