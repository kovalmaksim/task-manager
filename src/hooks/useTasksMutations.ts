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

    onMutate: (data) => {
      const previousTasks = queryClient.getQueryData<Task[]>(queryKeys.tasks);

      const optimisticTask: Task = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...data,
      };

      queryClient.setQueryData<Task[]>(queryKeys.tasks, (old) => [
        ...(old ?? []),
        optimisticTask,
      ]);

      return { previousTasks };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(queryKeys.tasks, context.previousTasks);
      }
      toast.error("Ошибка при создании задачи");
    },

    onSuccess: () => {
      toast.success("Задача создана");
    },
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Task> }) =>
      updateTask({ id, data }),

    onMutate: ({ id, data }) => {
      const previousTasks = queryClient.getQueryData<Task[]>(queryKeys.tasks);

      queryClient.setQueryData<Task[]>(
        queryKeys.tasks,
        (old) =>
          old?.map((task) => (task.id === id ? { ...task, ...data } : task)) ??
          [],
      );

      return { previousTasks };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(queryKeys.tasks, context.previousTasks);
      }
      toast.error("Ошибка при обновлении задачи");
    },

    onSuccess: () => {
      toast.success("Задача обновлена");
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteTask(id),

    onMutate: (id) => {
      const previousTasks = queryClient.getQueryData<Task[]>(queryKeys.tasks);

      queryClient.setQueryData<Task[]>(
        queryKeys.tasks,
        (old) => old?.filter((task) => task.id !== id) ?? [],
      );

      return { previousTasks };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(queryKeys.tasks, context.previousTasks);
      }
      toast.error("Ошибка при удалении задачи");
    },

    onSuccess: () => {
      toast.success("Задача удалена");
    },
  });

  return { create, update, remove };
};
