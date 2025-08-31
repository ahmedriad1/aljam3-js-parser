import path from 'path';
import fs from 'fs/promises';
import { getLibraryBaseUrl, type LibrarySlug } from './utils';

const isFileCached = async (file: string) => {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
};

export const fetchFileFromHF = async (library: LibrarySlug, filePath: string) => {
  const cacheDir = path.join(process.cwd(), '.cache', library);
  const cacheFile = path.join(cacheDir, filePath);

  const isCached = await isFileCached(cacheFile);
  if (isCached) {
    const cachedContent = await fs.readFile(cacheFile, 'utf-8');
    return cachedContent;
  }

  // Cache miss - fetch from HF and cache
  const baseUrl = `${getLibraryBaseUrl(library)}/${filePath}`;
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
  }

  const content = await response.text();

  // Ensure cache directory exists
  await fs.mkdir(cacheDir, { recursive: true });

  // Write to cache
  await fs.writeFile(cacheFile, content, 'utf-8');

  return content;
};
