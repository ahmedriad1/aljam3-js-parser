# aljam3 js parser

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/index.ts
```

This project fetches and parses the data from [aljam3's](https://aljam3.com) datasets on [Hugging Face](https://huggingface.co/datasets/ieasybooks-org).

To fetch the books of a library, run:

```ts
const library = 'waqfeya-library';
const tsvText = await fetchFileFromHF(library, 'index.tsv');
const books = parseTsvData(tsvText, library);
/**
 * [
 *   {
 *     category: string;
 *     author: string;
 *     title: string;
 *     pages: number | null;
 *     volumes: number | null;
 *     pdfPaths: string[];
 *     txtPaths: string[];
 *     docxPaths: string[];
 *     library: string;
 *   }
 * ]
 */
```

To parse the txt file of a book, run:

```ts
const pages = await fetchPagesFromTxt(book.txtPaths[0]!);
/**
 * [
 *   {
 *     content: string;
 *     number: number;
 *   }
 * ]
 */
```