import { useState } from "react";

export const parseData = (dataToParse: any) => {
  return JSON.parse(dataToParse);
};

export const replaceString = (
  data: string,
  stringToReplace: string,
  replaceBy: string
) => {
  return data.replace(`${stringToReplace}`, `${replaceBy}`);
};

export const useModal = () => {
  const [isShowing, setIsShowing] = useState<boolean>(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  return [isShowing, toggle] as const;
};
