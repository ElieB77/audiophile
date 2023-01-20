import { useState } from "react";

export const useSuccessModal = () => {
  const [isShowing, setIsShowing] = useState<boolean>(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  return [isShowing, toggle] as const;
};
