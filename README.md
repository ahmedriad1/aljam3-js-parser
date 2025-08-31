# aljam3 js parser

This project fetches and parses the data from [aljam3's](https://aljam3.com) datasets on [Hugging Face](https://huggingface.co/datasets/ieasybooks-org).

Note: this project uses Bun, but you can use your preferred package manager and runtime.

- [Setup](#setup)
- [Usage](#usage)
  - [Fetching all books from a library](#fetching-all-books-from-a-library)
  - [Parsing the txt file of a book](#parsing-the-txt-file-of-a-book)
- [Benchmarks](#benchmarks)

## Setup

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/index.ts
```

## Usage

### Fetching all books from a library

```ts
import { fetchLibraryBooks } from './lib/aljam3';

const books = await fetchLibraryBooks('waqfeya-library');
/**
 * [
 *   {
 *     category: string;
 *     author: string;
 *     title: string;
 *     pages: number | null;
 *     volumes: number | null;
 *     pdfUrls: string[];
 *     txtUrls: string[];
 *     docxUrls: string[];
 *     library: string;
 *   }
 * ]
 */
```

### Parsing the txt file of a book

```ts
import { fetchPagesFromTxt } from './lib/aljam3';

const pages = await fetchPagesFromTxt(book.txtUrls[0]!);
/**
 * [
 *   {
 *     content: string;
 *     number: number;
 *   }
 * ]
 */
```

## Benchmarks

- Fetching all books from all libraries (cached):
```bash
$ bun run src/index.ts
Parsed files in: 205ms
Total books: 63535
```

- Fetching all books from all libraries (not cached):
```bash
$ bun run src/index.ts
Parsed files in: 4239ms
Total books: 63535
```