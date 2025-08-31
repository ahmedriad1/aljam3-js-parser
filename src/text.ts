export const fetchPagesFromTxt = async (url: string) => {
  const text = await (await fetch(url)).text();
  return text.split(/\r?\nPAGE_SEPARATOR\r?\n/).map((page, index) => ({
    content: page,
    number: index + 1,
  }));
};
