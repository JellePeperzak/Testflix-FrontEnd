import { useState, useEffect } from "react";

const useResponsiveJumpDistance = () => {
  // Set an initial width based on the environment
  const [jumpDistance, setJumpDistance] = useState(() => {
    if (typeof window === "undefined") {
      return 0;
    } else {
      if (window.innerWidth < 500) {
        return 2;
      } else if (window.innerWidth < 800) {
        return 3;
      } else if (window.innerWidth < 1100) {
        return 4;
      } else if (window.innerWidth < 1400) {
        return 5;
      } else {
        return 6;
      }
    }
  });

  useEffect(() => {
    // Exit if window is undefined (i.e., during server-side rendering)
    if (typeof window === "undefined") return;

    const handleResize = () => {
      if (window.innerWidth < 500) {
        setJumpDistance(2)
      } else if (window.innerWidth < 800) {
        setJumpDistance(3)
      } else if (window.innerWidth < 1100) {
        setJumpDistance(4)
      } else if (window.innerWidth < 1400) {
        setJumpDistance(5)
      } else {
        setJumpDistance(6)
      }
    };
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return jumpDistance;
};

export default useResponsiveJumpDistance;
