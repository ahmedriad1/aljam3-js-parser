import path from 'path';
import fs from 'fs/promises';

export const getRepoBaseUrl = (repo: string) =>
  `https://huggingface.co/datasets/ieasybooks-org/${repo}/resolve/main`;

export const fetchFileFromHF = async (repo: string, filePath: string) => {
  const cacheDir = path.join(process.cwd(), '.cache', repo);
  const cacheFile = path.join(cacheDir, filePath);

  try {
    // Try to read from cache first
    await fs.access(cacheFile);
    const cachedContent = await Bun.file(cacheFile).text();
    return cachedContent;
  } catch {
    // Cache miss - fetch from HF and cache
    const baseUrl = `${getRepoBaseUrl(repo)}/${filePath}`;
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
    }

    const content = await response.text();

    // Ensure cache directory exists
    await fs.mkdir(cacheDir, { recursive: true });

    // Write to cache
    await Bun.write(cacheFile, content);

    return content;
  }
};
