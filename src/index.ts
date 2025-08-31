import { fetchLibraryBooks } from './lib/aljam3';
import { libraries } from './lib/utils';

const start = performance.now();
const books = (await Promise.all(libraries.map(fetchLibraryBooks))).flat();
const end = performance.now();

console.log(`Parsed files in: ${Math.round(end - start)}ms`);
console.log(`Total books: ${books.length}`);
