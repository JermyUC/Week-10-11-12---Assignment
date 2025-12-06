export function calculateEtaMinutes(itemCount: number): number {
  if (!Number.isFinite(itemCount) || itemCount <= 0) {
    return 10; // minimal delivery time
  }
  return itemCount * 10 + 10;
}
