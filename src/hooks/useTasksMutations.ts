"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "@/lib/query-keys";
import { Task } from "@/types/task";
import { createTask, updateTask, deleteTask } from "@/lib/api";

export const useTaskMutations = () => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: (data: Omit<Task, "id" | "createdAt">) => createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks });
      toast.success("Задача создана");
    },
    onError: () => {
      toast.error("Ошибка при создании задачи");
    },
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Task> }) =>
      updateTask({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks });
      toast.success("Задача обновлена");
    },
    onError: () => {
      toast.error("Ошибка при обновлении задачи");
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks });
      toast.success("Задача удалена");
    },
    onError: () => {
      toast.error("Ошибка при удалении задачи");
    },
  });

  return { create, update, remove };
};
