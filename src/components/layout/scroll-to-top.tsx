"use client";
import React, { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { Button } from "@/components/ui/button";

const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	const handleScroll = () => {
		if (window.scrollY > 300) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div>
			{isVisible && (
				<Button
					onClick={scrollToTop}
					className="fixed bottom-10 right-10 z-50 bg-secondary text-white p-2 shadow-lg"
					variant="default"
					size="icon"
				>
					<IoIosArrowUp />
				</Button>
			)}
		</div>
	);
};

export default ScrollToTop;
