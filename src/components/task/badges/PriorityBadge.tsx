import { FC } from "react";
import { Badge } from "@/components/ui/badge";

export type Priority = "low" | "medium" | "high";

interface PriorityBadgeProps {
  priority: Priority;
}

export const PriorityBadge: FC<PriorityBadgeProps> = ({ priority }) => {
  const styles: Record<Priority, string> = {
    low: "bg-gray-500",
    medium: "bg-yellow-500",
    high: "bg-red-500",
  };

  const labels: Record<Priority, string> = {
    low: "Low",
    medium: "Medium",
    high: "High",
  };

  return (
    <Badge className={`${styles[priority]} text-white`}>
      {labels[priority]}
    </Badge>
  );
};
