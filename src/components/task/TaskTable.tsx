"use client";

import { FC } from "react";
import { Task } from "@/types/task";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { formatDate } from "@/lib/formatDate";
import { StatusBadge } from "./badges/StatusBadge";
import { PriorityBadge } from "./badges/PriorityBadge";

interface TaskTableProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleDone: (task: Task) => void;
}

const headers = [
  "Выполнено",
  "Заголовок",
  "Статус",
  "Приоритет",
  "Дата",
  "Действия",
];

export const TaskTable: FC<TaskTableProps> = ({
  tasks,
  onEdit,
  onDelete,
  onToggleDone,
}) => (
  <Table className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
    <TableHeader className="bg-gray-100">
      <TableRow>
        {headers.map((headers) => (
          <TableHead
            className="p-2 text-left font-medium text-gray-700"
            key={headers}
          >
            {headers}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {tasks.map((task) => {
        const { id, title, description, status, priority, createdAt } = task;

        return (
          <TableRow key={id} className="hover:bg-gray-50">
            <TableCell className="p-2 text-center">
              <Checkbox
                checked={status == "done"}
                onCheckedChange={() => onToggleDone(task)}
              />
            </TableCell>
            <TableCell className="p-2 flex flex-col max-w-75 ">
              <span className="font-medium truncate">{title}</span>
              {description && (
                <span className="text-sm text-gray-500 wrap-break-word whitespace-pre-wrap">
                  {description}
                </span>
              )}
            </TableCell>
            <TableCell className="p-2">
              <StatusBadge status={status}></StatusBadge>
            </TableCell>
            <TableCell className="p-2">
              <PriorityBadge priority={priority}></PriorityBadge>
            </TableCell>
            <TableCell className="p-2 text-sm text-gray-500">
              {formatDate(new Date(createdAt))}
            </TableCell>
            <TableCell className="p-2 align-middle">
              <div className="flex items-center justify-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(task)}
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(task.id)}
                >
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);
