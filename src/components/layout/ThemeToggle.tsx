"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";

export const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<Button
			variant="outline"
			size="icon"
			onClick={toggleTheme}
			aria-label="Toggle theme"
			className="relative p-0"
		>
			{theme === "light" ? (
				<Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-500 dark:text-yellow-300" />
			) : (
				<Moon className="rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-slate-700 dark:text-slate-200" />
			)}
			{/* <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-500 dark:text-yellow-300" />
			<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-slate-700 dark:text-slate-200" />
			<span className="sr-only">Toggle theme</span> */}
		</Button>
	);
};
