export const statusOptions = [
  {
    value: "all",
    label: "Все",
  },
  {
    value: "todo",
    label: "ToDo",
  },
  {
    value: "in_progress",
    label: "In-progress",
  },
  {
    value: "done",
    label: "Done",
  },
];

export const priorityOptions = [
  {
    value: "all",
    label: "Все",
  },
  {
    value: "low",
    label: "Low",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "high",
    label: "High",
  },
];

export type SortField = "title" | "status" | "priority" | "createdAt";
export type SortOrder = "asc" | "desc";

export const headers: {
  label: string;
  key: SortField | null;
}[] = [
  { label: "Выполнено", key: null },
  { label: "Заголовок", key: "title" },
  { label: "Статус", key: "status" },
  { label: "Приоритет", key: "priority" },
  { label: "Дата", key: "createdAt" },
  { label: "Действия", key: null },
];
