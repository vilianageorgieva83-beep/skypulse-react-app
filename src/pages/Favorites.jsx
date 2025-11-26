import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadFavorites, toggleFavorite } from "../utils/Favorites";
import { normalizeCityName } from "../utils/normalize";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  // Load & normalize favorites on mount
  useEffect(() => {
    const loaded = loadFavorites().map((c) => normalizeCityName(c));
    setFavorites(loaded);
  }, []);

  function handleRemove(city) {
    const normalized = normalizeCityName(city);
    const updated = toggleFavorite(normalized);
    setFavorites(updated);
  }

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Favorite Cities</h1>

      {favorites.length === 0 ? (
        <p className="text-slate-600">No favorite cities yet.</p>
      ) : (
        <ul className="space-y-3">
          {favorites.map((city) => {
            const normalized = normalizeCityName(city);

            return (
              <li
                key={normalized}
                className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
              >
                <Link
                  to={`/city/${normalized}`}
                  className="text-lg font-semibold text-blue-700"
                >
                  {normalized}
                </Link>

                <button
                  onClick={() => handleRemove(normalized)}
                  className="px-3 py-1 text-white bg-red-500 rounded text-sm shadow"
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
