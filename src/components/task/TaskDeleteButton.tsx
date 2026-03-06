"use client";

import { FC, useState } from "react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useTaskMutations } from "@/hooks/useTasksMutations";
import { Trash2 } from "lucide-react";

interface TaskDeleteButtonProps {
  taskId: string;
}

export const TaskDeleteButton: FC<TaskDeleteButtonProps> = ({ taskId }) => {
  const { remove } = useTaskMutations();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    remove.mutate(taskId);
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <div className="flex gap-2">
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm" className="hidden sm:flex">
            Delete
          </Button>
        </AlertDialogTrigger>

        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="icon" className="sm:hidden">
            <Trash2 size={16} />
          </Button>
        </AlertDialogTrigger>
      </div>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить задачу?</AlertDialogTitle>
          <AlertDialogDescription>
            Это действие нельзя отменить
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
