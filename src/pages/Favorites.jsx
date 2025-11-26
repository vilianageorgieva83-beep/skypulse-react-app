import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Favorite Cities</h1>
      {favorites.length === 0 ? (
        <p>No favorite cities yet.</p>
      ) : (
        <ul className="space-y-2">
          {favorites.map((city) => (
            <li
              key={city}
              className="bg-white p-3 rounded shadow flex justify-between items-center"
            >
              <span>{city}</span>
              <Link
                to={`/city/${city}`}
                className="text-blue-600 underline text-sm"
              >
                View
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
