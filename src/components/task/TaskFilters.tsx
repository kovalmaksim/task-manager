"use client";

import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useTaskFilters } from "../TaskProvider";
import { statusOptions, priorityOptions } from "@/constant";

export const TaskFilters = () => {
  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
  } = useTaskFilters();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Input
        placeholder="Поиск по заголовку..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:max-w-xs"
      />

      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Статус" />
        </SelectTrigger>

        <SelectContent>
          {statusOptions.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={priorityFilter} onValueChange={setPriorityFilter}>
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Приоритет" />
        </SelectTrigger>

        <SelectContent>
          {priorityOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
