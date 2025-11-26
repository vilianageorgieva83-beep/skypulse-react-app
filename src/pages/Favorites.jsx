import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadFavorites, toggleFavorite } from "../utils/Favorites";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  function handleRemove(city) {
    const updated = toggleFavorite(city);
    setFavorites(updated);
  }

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Favorite Cities</h1>

      {favorites.length === 0 ? (
        <p className="text-slate-600">No favorite cities yet.</p>
      ) : (
        <ul className="space-y-3">
          {favorites.map((city) => (
            <li
              key={city}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >
              <Link
                to={`/city/${city}`}
                className="text-lg font-semibold text-blue-700"
              >
                {city}
              </Link>

              <button
                onClick={() => handleRemove(city)}
                className="px-3 py-1 text-white bg-red-500 rounded text-sm shadow"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
