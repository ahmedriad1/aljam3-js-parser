import { tsvParse } from 'd3-dsv';
import { getLibraryBaseUrl, type LibrarySlug } from './utils';

type RawRow = {
  category: string;
  author: string;
  title: string;
  pages: string;
  volumes: string;
  pdf_paths: string;
  txt_paths: string;
  docx_paths: string;
};

const parseJsonPaths = (json: string, baseUrl: string) =>
  json
    .replace(/^\[|\]$/g, '')
    .split(',')
    .map(path => {
      const trimmedPath = path.slice(1, -1).trim();
      return `${baseUrl}/${
        trimmedPath.startsWith('./') ? trimmedPath.slice(2) : trimmedPath
      }`;
    });

const parseNumber = (value: string) => {
  const number = Number(value);
  return isNaN(number) ? null : number;
};

export const parseLibraryTsv = (tsvText: string, librarySlug: LibrarySlug) => {
  const baseUrl = getLibraryBaseUrl(librarySlug);
  return tsvParse(tsvText, (row: RawRow) => ({
    category: row.category,
    author: row.author,
    title: row.title,
    pages: parseNumber(row.pages),
    volumes: parseNumber(row.volumes),
    pdfUrls: parseJsonPaths(row.pdf_paths, baseUrl),
    txtUrl: parseJsonPaths(row.txt_paths, baseUrl),
    docxUrls: parseJsonPaths(row.docx_paths, baseUrl),
    library: librarySlug,
  }));
};
