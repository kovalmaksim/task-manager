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
import { SortField, SortOrder, headers } from "@/constant";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Check, ArrowUp, ArrowDown } from "lucide-react";

const HomePage = () => {
  const { data: tasks = [], isLoading, isError } = useTasks();
  const { update, remove } = useTaskMutations();
  const { search, statusFilter, priorityFilter } = useTaskFilters();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const isMobile = useMedia("(max-width: 640px)");

  const filteredTasks = useMemo(() => {
    if (!tasks) return [];

    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  const sortedTasks = useMemo(() => {
    if (!sortField) return filteredTasks;

    const statusOrder = {
      todo: 0,
      in_progress: 1,
      done: 2,
    };
    const priorityOrder = {
      low: 0,
      medium: 1,
      high: 2,
    };

    return filteredTasks.toSorted((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case "status":
          aValue = statusOrder[a.status];
          bValue = statusOrder[b.status];
          break;
        case "priority":
          aValue = priorityOrder[a.priority];
          bValue = priorityOrder[b.priority];
          break;
        case "createdAt":
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        case "title":
        default:
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredTasks, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleToggleDone = ({ id, status: taskStatus }: Task) => {
    const status = taskStatus === "done" ? "todo" : "done";
    update.mutate({ id, data: { status } });
  };

  const handleDelete = (id: string) => {
    if (confirm("Удалить задачу?")) remove.mutate(id);
  };

  const handleEdit = (task: Task) => {
    setEditTask(task);
    setDialogOpen(true);
  };

  if (isLoading) return <TaskTableSkeleton rows={5} />;
  if (isError) return <div>Ошибка загрузки задач</div>;

  const SortIcon = sortOrder === "asc" ? ArrowUp : ArrowDown;

  return (
    <div className="p-8 max-w-350 mx-auto flex flex-col gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-evenly lg:items-center">
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
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Сортировать по:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  {sortField
                    ? headers.find((h) => h.key === sortField)?.label
                    : "Без сортировки"}
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {headers
                  //TODO
                  .filter((h) => h.key)
                  .map((header) => (
                    <DropdownMenuItem
                      key={header.key}
                      onClick={() => handleSort(header.key as SortField)}
                      className="flex items-center justify-between"
                    >
                      {header.label}
                      {sortField === header.key && (
                        <Check className="ml-2 w-4 h-4" />
                      )}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {sortField && (
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                }
              >
                <SortIcon size={16} />
              </Button>
            )}
          </div>

          {sortedTasks.map((task) => (
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
          tasks={sortedTasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleDone={handleToggleDone}
          onSort={handleSort}
          sortField={sortField}
          sortOrder={sortOrder}
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
