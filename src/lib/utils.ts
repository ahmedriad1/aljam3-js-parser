export const libraries = [
  'waqfeya-library',
  'prophet-mosque-library',
  'shamela-waqfeya-library',
] as const;

export type LibrarySlug = (typeof libraries)[number];

export const getLibraryBaseUrl = (library: LibrarySlug) =>
  `https://huggingface.co/datasets/ieasybooks-org/${library}/resolve/main`;
