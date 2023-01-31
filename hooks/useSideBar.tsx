import { useEffect, useState } from "react";

export const useSideBar = () => {
  const [isShowing, setIsShowing] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.style.overflow = isShowing ? "hidden" : "unset";
  }, [isShowing]);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  return [isShowing, toggle] as const;
};
