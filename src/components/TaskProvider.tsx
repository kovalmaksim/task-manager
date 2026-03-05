"use client";

import {
  createContext,
  useState,
  FC,
  PropsWithChildren,
  useMemo,
  use,
} from "react";

interface TaskContextProps {
  search: string;
  setSearch: (value: string) => void;

  statusFilter: string;
  setStatusFilter: (value: string) => void;

  priorityFilter: string;
  setPriorityFilter: (value: string) => void;
}

const TaskFilterContext = createContext<TaskContextProps | null>(null);

export const useTaskFilters = () => {
  const context = use(TaskFilterContext);

  if (!context) {
    throw new Error("useRaskFilters must be used within TaskPRovider");
  }

  return context;
};

export const TaskProvider: FC<PropsWithChildren> = ({ children }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const value = useMemo(
    () => ({
      search,
      setSearch,
      statusFilter,
      setStatusFilter,
      priorityFilter,
      setPriorityFilter,
    }),
    [search, statusFilter, priorityFilter],
  );

  return <TaskFilterContext value={value}>{children}</TaskFilterContext>;
};
