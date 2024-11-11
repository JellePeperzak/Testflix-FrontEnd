import { useState, useEffect } from "react";

const useResponsiveWidth = () => {
  // Set an initial width based on the environment
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

  useEffect(() => {
    // Exit if window is undefined (i.e., during server-side rendering)
    if (typeof window === "undefined") return;

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

export default useResponsiveWidth;
