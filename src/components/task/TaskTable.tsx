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
import { TaskDeleteButton } from "./TaskDeleteButton";
import { Pencil } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

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
  onToggleDone,
}) => (
  <ScrollArea className="w-full rounded-lg border border-gray-200 dark:border-gray-700">
    <Table className="min-w-175 border-collapse border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
      <TableHeader className="bg-gray-100 dark:hover:bg-gray-300">
        <TableRow>
          {headers.map((headers) => (
            <TableHead
              className="p-2 first:text-center last:text-center text:left font-medium text-gray-700"
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
            <TableRow
              key={id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800"
            >
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
                    className="hidden sm:flex"
                  >
                    Edit
                  </Button>

                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => onEdit(task)}
                    className="sm:hidden"
                  >
                    <Pencil size={16} />
                  </Button>

                  <TaskDeleteButton taskId={task.id} />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
    <ScrollBar orientation="horizontal" />
  </ScrollArea>
);
