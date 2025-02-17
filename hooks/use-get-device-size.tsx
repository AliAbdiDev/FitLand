import { useState, useEffect } from "react";

export function useGetDeviceSize(breakpoint: number = 640) {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean | null>(null); 

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > breakpoint);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isLargeScreen;
}
