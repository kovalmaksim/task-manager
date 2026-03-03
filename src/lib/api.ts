import { Task } from "@/types/task";
const BASE_URL = "http://localhost:3001/tasks";

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return res.json();
}

export async function createTask(task: Omit<Task, "id" | "createdAt">) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...task,
      createdAt: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to create task");
  }

  return res.json();
}

export async function updateTask({
  id,
  data,
}: {
  id: string;
  data: Partial<Task>;
}) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update task");
  }

  return res.json();
}

export async function deleteTask(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete task");
  }

  return true;
}
