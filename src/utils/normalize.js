export function normalizeCityName(name) {
  if (!name) return "";
  return name
    .toLowerCase()
    .trim()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
