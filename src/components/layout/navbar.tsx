"use client";
// import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import NextImage from "../Image";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
	{ name: "Home", link: "/" },
	{ name: "About", link: "/about" },
	{ name: "Services", link: "/services" },
	{ name: "Contact", link: "/contact" },
];

export default function Navbar() {
	const headerRef = useRef<HTMLDivElement | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	useEffect(() => {
		const handleScroll = () => {
			if (headerRef.current) {
				const screenWidth = window.innerWidth;
				const topHeight = screenWidth > 768 ? 44 : 0;
				const classes = ["fixed", "top-0", "shadow-md"];
				if (window.scrollY > topHeight) {
					headerRef.current.classList.add(...classes);
				} else {
					headerRef.current.classList.remove(...classes);
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);
	return (
		<div className="min-h-[85px]">
			<div ref={headerRef} className="h-[85px] bg-background z-50 w-full">
				<nav className="flex items-center gap-4 justify-between w-full z-50 h-full container">
					<div className="relative h-[72px] min-w-[206px]">
						<NextImage src="/logo.png" alt="logo" />
					</div>
					<ul className="hidden sm:flex gap-6">
						{navItems.map((item, index) => (
							<li
								key={index}
								className="flex justify-center items-center text-foreground"
							>
								<Link
									key={item.name}
									href={item.link}
									className="inline-flex items-center px-1 text-sm font-medium"
								>
									{item.name}
								</Link>
							</li>
						))}
						<div className="ml-5">
							<ThemeToggle />
						</div>
					</ul>
					<div className="sm:hidden flex items-center z-50">
						<Sheet open={isOpen} onOpenChange={setIsOpen}>
							<SheetTrigger asChild>
								<Button variant="ghost" size="icon" className="text-gray-600">
									<Menu className="h-6 w-6" />
									<span className="sr-only">Open main menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent
								side="right"
								className="w-[240px] sm:w-[300px]"
								aria-describedby={undefined}
							>
								<SheetTitle aria-describedby={undefined}></SheetTitle>
								<nav className="flex flex-col gap-4">
									{navItems.map((item) => (
										<Link
											key={item.name}
											href={item.link}
											className="text-gray-600 hover:text-gray-900 block px-3 py-2 text-base font-medium"
											onClick={() => setIsOpen(false)}
										>
											{item.name}
										</Link>
									))}
								</nav>
							</SheetContent>
						</Sheet>
					</div>
				</nav>
			</div>
		</div>
	);
}
