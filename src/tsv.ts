import { tsvParse } from 'd3-dsv';
import { getRepoBaseUrl } from './hf';

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

export const parseTsvData = (tsvText: string, librarySlug: string) => {
  const baseUrl = getRepoBaseUrl(librarySlug);
  return tsvParse(tsvText, (row: RawRow) => {
    return {
      category: row.category,
      author: row.author,
      title: row.title,
      pages: parseNumber(row.pages),
      volumes: parseNumber(row.volumes),
      pdfPaths: parseJsonPaths(row.pdf_paths, baseUrl),
      txtPaths: parseJsonPaths(row.txt_paths, baseUrl),
      docxPaths: parseJsonPaths(row.docx_paths, baseUrl),
      library: librarySlug,
    };
  });
};
