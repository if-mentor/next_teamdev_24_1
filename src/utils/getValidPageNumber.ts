export function getValidPageNumber(page: string | undefined): number | null {
  if (page === undefined) return 1;
  const n = Number(page);
  return Number.isInteger(n) && n >= 1 ? n : null;
}
