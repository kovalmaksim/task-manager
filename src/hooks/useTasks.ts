"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "@/lib/api";
import { Task } from "@/types/task";
import { queryKeys } from "@/lib/query-keys";

export function useTasks() {
  return useQuery<Task[]>({
    queryKey: queryKeys.tasks,
    queryFn: fetchTasks,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
}
