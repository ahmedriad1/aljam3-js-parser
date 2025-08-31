import { fetchFileFromHF } from './hf';
import { parseLibraryTsv } from './tsv';
import type { LibrarySlug } from './utils';

export const fetchLibraryBooks = async (library: LibrarySlug) => {
  const tsvText = await fetchFileFromHF(library, 'index.tsv');
  return parseLibraryTsv(tsvText, library);
};

export const fetchPagesFromTxt = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(
      `Failed to fetch ${url}: (${response.status}) ${response.statusText}`,
    );

  const text = await response.text();
  return text.split(/\r?\nPAGE_SEPARATOR\r?\n/).map((page, index) => ({
    content: page,
    number: index + 1,
  }));
};
