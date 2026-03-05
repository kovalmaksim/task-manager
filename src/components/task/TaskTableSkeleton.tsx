"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Skeleton } from "../ui/skeleton";

export const TaskTableSkeleton = ({ rows = 5 }: { rows?: number }) => {
  const headers = [
    "Выполнено",
    "Заголовок",
    "Статус",
    "Приоритет",
    "Дата",
    "Действия",
  ];

  return (
    <Table className="border border-gray-200 rounded-lg overflow-hidden shadow-sm animate-pulse">
      <TableHeader className="bg-gray-100">
        <TableRow>
          {headers.map((header) => (
            <TableHead
              key={header}
              className="p-2 text-left font-medium text-gray-700"
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: rows }).map((_, idx) => (
          <TableRow key={idx}>
            <TableCell className="p-2">
              <Skeleton className="h-4 w-4 rounded" />
            </TableCell>
            <TableCell className="p-2 flex flex-col gap-1">
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="h-3 w-48 rounded" />
            </TableCell>
            <TableCell className="p-2">
              <Skeleton className="h-4 w-20 rounded" />
            </TableCell>
            <TableCell className="p-2">
              <Skeleton className="h-4 w-20 rounded" />
            </TableCell>
            <TableCell className="p-2">
              <Skeleton className="h-4 w-24 rounded" />
            </TableCell>
            <TableCell className="p-2">
              <Skeleton className="h-4 w-28 rounded" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
