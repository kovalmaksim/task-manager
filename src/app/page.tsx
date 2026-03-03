"use client";

import { useTasks } from "@/hooks/useTasks";
import { useTaskMutations } from "@/hooks/useTasksMutations";

export default function HomePage() {
  const { data, isLoading, error } = useTasks();
  const { create, update, remove } = useTaskMutations();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading tasks</p>;

  return (
    <main style={{ padding: 20 }}>
      <h1>Task Manager</h1>

      <button
        onClick={() =>
          create.mutate({
            title: "New Task",
            description: "Testing POST",
            status: "todo",
            priority: "medium",
          })
        }
      >
        Add Task
      </button>
      <hr />

      {data?.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <h6>{task.description}</h6>
          <p>Status: {task.status}</p>
          <p>Priority: {task.priority}</p>

          <button
            onClick={() =>
              update.mutate({
                id: task.id,
                data: { status: "done" },
              })
            }
          >
            Mark as done
          </button>
          <br></br>

          <button onClick={() => remove.mutate(task.id)}>delete</button>
        </div>
      ))}
    </main>
  );
}
