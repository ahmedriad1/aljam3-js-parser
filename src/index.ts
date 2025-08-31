import { fetchFileFromHF } from './hf';
import { parseTsvData } from './tsv';

const libraries = [
  'waqfeya-library',
  'prophet-mosque-library',
  'shamela-waqfeya-library',
];

const start = Bun.nanoseconds();
const books = (
  await Promise.all(
    libraries.map(async library => {
      const tsvText = await fetchFileFromHF(library, 'index.tsv');
      return parseTsvData(tsvText, library);
    }),
  )
).flat();
const end = Bun.nanoseconds();

console.log(`Parsed files in: ${Math.round((end - start) / 1_000_000)}ms`);
console.log(`Total books: ${books.length}`);
