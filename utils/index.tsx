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
