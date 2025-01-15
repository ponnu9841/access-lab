
import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorOuterRef.current && cursorInnerRef.current) {
        cursorOuterRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorInnerRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const handleMouseEnter = () => {
      if (cursorOuterRef.current && cursorInnerRef.current) {
        cursorOuterRef.current.style.visibility = "visible";
        cursorInnerRef.current.style.visibility = "visible";
      }
    };

    const handleMouseLeave = () => {
      if (cursorOuterRef.current && cursorInnerRef.current) {
        cursorOuterRef.current.style.visibility = "hidden";
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
    <div>
      <div
        ref={cursorOuterRef}
        className="fixed left-0 top-0 ml-[-15px] mt-[-15px] pointer-events-none rounded-full transform translate-z-0 invisible w-10 h-10 border-2 border-opacity-50 border-primary z-[10000000] opacity-50 transition-all ease-out duration-75"
        style={{
          position: "fixed",
          transform: "translate(-50%, -50%)",
        }}
      ></div>
      <div
        ref={cursorInnerRef}
        className="fixed left-0 top-0 pointer-events-none rounded-full transform translate-z-0 invisible w-2 h-2 bg-primary z-[10000001] transition-[width,height,margin,opacity] duration-300 ease-in-out"
        style={{
          position: "fixed",
          transform: "translate(-50%, -50%)",
        }}
      ></div>
    </div>
  );
};

export default CustomCursor;
