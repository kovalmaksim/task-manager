import { Badge } from "@/components/ui/badge";
import { FC } from "react";

export type Status = "todo" | "in_progress" | "done";

interface StatusBadgeProps {
  status: Status;
}

export const StatusBadge: FC<StatusBadgeProps> = ({ status }) => {
  const styles: Record<Status, string> = {
    todo: "bg-gray-500",
    in_progress: "bg-blue-500",
    done: "bg-green-500",
  };

  const labels: Record<Status, string> = {
    todo: "Todo",
    in_progress: "In progress",
    done: "Done",
  };

  return (
    <Badge className={`${styles[status]} text-white`}>{labels[status]}</Badge>
  );
};
