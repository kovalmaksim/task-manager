"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  const Icon = currentTheme === "dark" ? Sun : Moon;

  return (
    <Button
      variant="outline"
      size="icon"
      className="transition-colors"
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
    >
      <Icon size={18} />
    </Button>
  );
};
