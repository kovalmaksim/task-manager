"use client";

import { useTasks } from "@/hooks/useTasks";
import { useTaskMutations } from "@/hooks/useTasksMutations";
import { Task } from "@/types/task";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TaskDialog } from "@/components/task/TaskDialog";
import { TaskTable } from "@/components/task/TaskTable";

const HomePage = () => {
  const { data: tasks = [], isLoading, isError } = useTasks();
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
      <TaskTable
        tasks={tasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleDone={handleToggleDone}
      />
      <TaskDialog
        task={editTask}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default HomePage;
