import { useState, useEffect } from "react";

export const useCartModal = () => {
  const [isShowing, setIsShowing] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.style.overflow = isShowing ? "hidden" : "unset";
  }, [isShowing]);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  return [isShowing, toggle] as const;
};
