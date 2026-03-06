"use client";

import { FC } from "react";
import { Task } from "@/types/task";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { StatusBadge } from "./badges/StatusBadge";
import { PriorityBadge } from "./badges/PriorityBadge";
import { TaskDeleteButton } from "./TaskDeleteButton";
import { Pencil } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleDone: (task: Task) => void;
}

export const TaskCard: FC<TaskCardProps> = ({ task, onEdit, onToggleDone }) => (
  <div className="p-4 border rounded-lg shadow-sm flex flex-col gap-2 dark:border-gray-700">
    <div className="flex justify-between items-start">
      <Checkbox
        checked={task.status === "done"}
        onCheckedChange={() => onToggleDone(task)}
      />
      <div className="flex gap-2">
        <Button size="icon" onClick={() => onEdit(task)} className="sm:hidden">
          <Pencil />
        </Button>
        <TaskDeleteButton taskId={task.id} />
      </div>
    </div>
    <h2 className="font-medium">{task.title}</h2>
    {task.description && (
      <p className="text-sm text-gray-500 dark:text-gray-300">
        {task.description}
      </p>
    )}
    <div className="flex gap-2 text-sm">
      <StatusBadge status={task.status} />
      <PriorityBadge priority={task.priority} />
    </div>
  </div>
);
