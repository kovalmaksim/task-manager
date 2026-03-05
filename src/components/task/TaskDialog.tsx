"use client";

import { FC } from "react";
import { Task } from "@/types/task";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { TaskForm } from "./TaskForm";

interface TaskDialogProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TaskDialog: FC<TaskDialogProps> = ({
  task,
  open,
  onOpenChange,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="w-full max-w-md sm:max-w-lg">
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
