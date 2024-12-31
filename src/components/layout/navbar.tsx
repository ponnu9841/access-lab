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
				const topHeight = 0;
				const classes = ["shadow-md", "bg-black", "border-none"];
				if (window.scrollY > topHeight) {
					headerRef.current.classList.add(...classes);
					headerRef.current.classList.remove("bg-black/50");
				} else {
					headerRef.current.classList.remove(
						...classes,
						"border-b",
						"borer-gray-500"
					);
					headerRef.current.classList.add("bg-black/50", "border-b");
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);
	return (
		<>
			<div
				ref={headerRef}
				className="h-[85px] z-50 w-full fixed top-0 left-0 z-50 md:text-background bg-black/50 border-b border-gray-300"
			>
				<nav className="flex items-center gap-4 justify-between w-full h-full container">
					<NextImage
						src="/logo.svg"
						alt="logo"
						className="aspect-square max-w-[72px] max-h-[72px]"
					/>
					<div>
						<ul className="hidden md:flex gap-6">
							{navItems.map((item, index) => (
								<li key={index} className="flex justify-center items-center">
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
						<div className="md:hidden flex items-center z-50">
							<Sheet open={isOpen} onOpenChange={setIsOpen}>
								<SheetTrigger asChild>
									<Button
										variant="ghost"
										size="icon"
										className="text-white hover:bg-transparent"
									>
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
									<div className="flex flex-col gap-4">
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
									</div>
								</SheetContent>
							</Sheet>
						</div>
					</div>
				</nav>
			</div>
			{/* <div className="h-[0.3px] relative top-[85px] bg-gray-300 w-full z-40"></div> */}
		</>
	);
}
