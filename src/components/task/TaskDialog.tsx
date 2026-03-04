"use client";

import { Task } from "@/types/task";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { TaskForm } from "./TaskForm";

interface TaskDialogProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TaskDialog = ({ task, open, onOpenChange }: TaskDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106">
        <DialogHeader>
          <DialogTitle>
            {task ? "Редактировать задачу" : "Создать задачу"}
          </DialogTitle>
        </DialogHeader>

        <TaskForm
          key={task?.id ?? "create"}
          task={task}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
