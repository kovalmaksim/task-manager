"use client";

import { useTasks } from "@/hooks/useTasks";
import { useTaskMutations } from "@/hooks/useTasksMutations";
import { Task } from "@/types/task";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { TaskDialog } from "@/components/task/TaskDialog";
import { TaskTable } from "@/components/task/TaskTable";
import { TaskFilters } from "@/components/task/TaskFilters";
import { useTaskFilters } from "@/components/TaskProvider";
import { TaskTableSkeleton } from "@/components/task/TaskTableSkeleton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TaskCounters } from "@/components/task/TaskCounters";
import { useMedia } from "react-use";
import { TaskCard } from "@/components/task/TasckCard";

const HomePage = () => {
  const { data: tasks = [], isLoading, isError } = useTasks();
  const { update, remove } = useTaskMutations();
  const { search, statusFilter, priorityFilter } = useTaskFilters();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  const isMobile = useMedia("(max-width: 640px");

  const filteredTasks = useMemo(() => {
    if (!tasks) return [];

    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "all" || task.priority == priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  if (isLoading) return <TaskTableSkeleton rows={5} />;
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
    <div className="p-8 max-w-350 mx-auto flex flex-col gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-evenly lg:items-center ">
        <ThemeToggle />
        <h1 className="text-2xl">Список задач</h1>
        <TaskFilters />
        <Button
          size="sm"
          className="px-3 py-1.5 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer"
          onClick={() => {
            setEditTask(null);
            setDialogOpen(true);
          }}
        >
          Добавить задачу
        </Button>
      </div>
      <TaskCounters tasks={tasks} />

      {isMobile ? (
        <div className="flex flex-col gap-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleDone={handleToggleDone}
            />
          ))}
        </div>
      ) : (
        <TaskTable
          tasks={filteredTasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleDone={handleToggleDone}
        />
      )}

      <TaskDialog
        task={editTask}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default HomePage;
