export function getValidPageNumber(page: string | undefined): number | null {
  if (page === undefined) return 1;
  if (!/^[1-9]\d*$/.test(page)) return null;
  return Number(page);
}
