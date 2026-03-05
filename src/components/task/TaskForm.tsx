"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Task } from "@/types/task";
import { useTaskMutations } from "@/hooks/useTasksMutations";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DialogFooter } from "../ui/dialog";

const taskSchema = z.object({
  title: z.string().min(3, "Минимум 3 символа"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["todo", "in_progress", "done"]),
});

export type TaskFormData = z.infer<typeof taskSchema>;

interface TaskFormProps {
  task: Task | null;
  onSuccess: () => void;
}

export const TaskForm = ({ task, onSuccess }: TaskFormProps) => {
  const { create, update } = useTaskMutations();

  const { control, handleSubmit, register, formState } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title ?? "",
      description: task?.description ?? "",
      priority: task?.priority ?? "medium",
      status: task?.status ?? "todo",
    },
  });

  const onSubmit = (data: TaskFormData) => {
    if (task) {
      update.mutate({ id: task.id, data }, { onSuccess });

      return;
    }

    create.mutate(data, { onSuccess });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
      <div>
        <Input placeholder="Заголовок" {...register("title")} />

        {formState.errors.title && (
          <p className="text-sm text-red-500 mt-1">
            {formState.errors.title.message}
          </p>
        )}
      </div>

      <Textarea
        placeholder="Описание"
        {...register("description")}
        className="w-full break-all overflow-auto"
      />

      <div className="flex gap-3">
        <Controller
          control={control}
          name="priority"
          render={({ field: { onChange, value } }) => (
            <Select value={value} onValueChange={onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Приоритет" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <Controller
          control={control}
          name="status"
          render={({ field: { onChange, value } }) => (
            <Select value={value} onValueChange={onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Статус" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="todo">Todo</SelectItem>
                <SelectItem value="in_progress">In-progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <DialogFooter>
        <Button type="submit">{task ? "Сохранить" : "Создать"}</Button>
      </DialogFooter>
    </form>
  );
};
