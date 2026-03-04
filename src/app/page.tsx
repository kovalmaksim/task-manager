"use client";

import { useTasks } from "@/hooks/useTasks";
import { useTaskMutations } from "@/hooks/useTasksMutations";
import { Task } from "@/types/task";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TaskDialog } from "@/components/task/TaskDialog";

const HomePage = () => {
  const { data: tasks, isLoading, isError } = useTasks();
  const { update, remove } = useTaskMutations();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Ошибка загрузки задач</div>;

  const handleToggleDone = ({ id, status: taskStatus }: Task) => {
    const status = taskStatus === "done" ? "todo" : "done";

    update.mutate({
      id,
      data: { status },
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Удалить задачу?")) {
      remove.mutate(id);
    }
  };

  const handleEdit = (task: Task) => {
    setEditTask(task);
    setDialogOpen(true);
  };

  return (
    <div className="p-8 max-w-250 mx-auto flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Список задач</h1>
        <Button
          className="px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
          onClick={() => {
            setEditTask(null);
            setDialogOpen(true);
          }}
        >
          Добавить задачу
        </Button>
      </div>
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Выполнено</th>
            <th className="p-2 text-left">Заголовок</th>
            <th className="p-2">Статус</th>
            <th className="p-2">Приоритет</th>
            <th className="p-2">Дата</th>
            <th className="p-2">Действия</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task) => {
            const { id, title, description, status, priority, createdAt } =
              task;

            return (
              <tr
                key={id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="p-2 text-center">
                  <Checkbox
                    checked={status === "done"}
                    onCheckedChange={() => handleToggleDone(task)}
                  />
                </td>
                <td className="p-2 flex flex-col">
                  <span className="font-medium">{title}</span>
                  {description && (
                    <span className="text-sm text-gray-500">{description}</span>
                  )}
                </td>
                <td className="p-2">{status}</td>
                <td className="p-2">{priority}</td>
                <td className="p-2 text-sm text-gray-500">
                  {new Date(createdAt).toLocaleString()}
                </td>
                <td className="p-2 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <TaskDialog
        task={editTask}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default HomePage;
