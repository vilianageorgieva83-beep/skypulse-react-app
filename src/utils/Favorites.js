export function loadFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

export function saveFavorites(list) {
  localStorage.setItem("favorites", JSON.stringify(list));
}

export function toggleFavorite(city) {
  const saved = loadFavorites();

  if (saved.includes(city)) {
    const updated = saved.filter((c) => c !== city);
    saveFavorites(updated);
    return updated;
  }

  const updated = [...saved, city];
  saveFavorites(updated);
  return updated;
}

export function isFavorite(city) {
  return loadFavorites().includes(city);
}
