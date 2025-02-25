export function toNumberString(num: number) {
  if (num < 1e3) return num;
  if (num < 1e6) return `${(num / 1e3).toFixed(1)}k`;
  if (num < 1e9) return `${(num / 1e6).toFixed(1)}m`;
  return `${(num / 1e9).toFixed(1)}b`;
}
