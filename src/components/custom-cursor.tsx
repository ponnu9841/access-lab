import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorInnerRef.current) {
        cursorInnerRef.current.style.transform = `translate(${
          e.clientX - 3
        }px, ${e.clientY - 3}px)`;
      }
    };

    const handleMouseEnter = () => {
      if (cursorInnerRef.current) {
        cursorInnerRef.current.style.visibility = "visible";
      }
    };

    const handleMouseLeave = () => {
      if (cursorInnerRef.current) {
        cursorInnerRef.current.style.visibility = "hidden";
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cursorInnerRef}
      className="fixed left-0 top-0 pointer-events-none rounded-full transform translate-z-0 visible w-2 h-2 bg-primary z-[10000001] transition-[width,height,margin,opacity] duration-300 ease-in-out"
    ></div>
  );
};

export default CustomCursor;
