import { useEffect } from "react";

const useSrollRestoration = () => {
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    // Restore scroll position
    const scrollY = localStorage.getItem("scrollPosition");
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY, 10));
    }

    const handleScroll = () => {
      localStorage.setItem("scrollPosition", String(window.scrollY));
    };

    window.addEventListener("scroll", handleScroll, { signal });

    return () => {
      controller.abort(); // This removes all event listeners attached with this signal
    };
  }, []);

  return null;
};

export default useSrollRestoration;
