"use client";

import { FC, useMemo } from "react";
import { Task } from "@/types/task";

interface TaskCountersProps {
  tasks: Task[];
}

export const TaskCounters: FC<TaskCountersProps> = ({ tasks }) => {
  const statusCounters = useMemo(() => {
    const counters = { todo: 0, in_progress: 0, done: 0 };
    tasks.forEach((t) => {
      counters[t.status]++;
    });

    return counters;
  }, [tasks]);

  return (
    <div className="flex flex-wrap gap-3 mt-4 mb-2">
      <div className="px-3 py-1 rounded bg-gray-100 dark:bg-gray-700">
        Todo: {statusCounters.todo}
      </div>
      <div className="px-3 py-1 rounded bg-blue-100 dark:bg-blue-700">
        In-progress: {statusCounters.in_progress}
      </div>
      <div className="px-3 py-1 rounded bg-green-100 dark:bg-green-700">
        Done: {statusCounters.done}
      </div>
      <div className="px-3 py-1 rounded bg-purple-100 dark:bg-purple-700">
        Total: {tasks.length}
      </div>
    </div>
  );
};
