export const getRelativeTime = (date: string | Date): string => {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const diffSec = (new Date(date).getTime() - Date.now()) / 1000;
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [unit, sec] of units) {
    if (Math.abs(diffSec) >= sec) return rtf.format(Math.round(diffSec / sec), unit);
  }
  return rtf.format(0, "second");
};
