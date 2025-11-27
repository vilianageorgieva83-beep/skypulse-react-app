import { normalizeCityName } from "./normalize";

export function loadFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

export function saveFavorites(list) {
  localStorage.setItem("favorites", JSON.stringify(list));
}

export function toggleFavorite(city) {
  const normalized = normalizeCityName(city);
  const saved = loadFavorites();

  if (saved.includes(normalized)) {
    const updated = saved.filter((c) => c !== normalized);
    saveFavorites(updated);
    return updated;
  }

  const updated = [...saved, normalized];
  saveFavorites(updated);
  return updated;
}

export function isFavorite(city) {
  const normalized = normalizeCityName(city);
  return loadFavorites().includes(normalized);
}
