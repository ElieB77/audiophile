export const replaceString = (
  data: string,
  stringToReplace: string,
  replaceBy: string
) => {
  return data.replace(`${stringToReplace}`, `${replaceBy}`);
};
