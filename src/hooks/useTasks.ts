"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "@/lib/api";
import { Task } from "@/types/task";
import { queryKeys } from "@/lib/query-keys";

export const useTasks = () =>
  useQuery<Task[]>({
    queryKey: queryKeys.tasks,
    queryFn: fetchTasks,
  });
