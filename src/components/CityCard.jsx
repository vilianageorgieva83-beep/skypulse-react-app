import { Link } from "react-router-dom";
import { isFavorite, toggleFavorite } from "../utils/Favorites";
import { useState } from "react";

export default function CityCard({ city, data }) {
  const [favorite, setFavorite] = useState(isFavorite(city));

  function handleToggleFavorite(e) {
    e.preventDefault(); // Prevent navigating when clicking the star
    const updated = toggleFavorite(city);
    setFavorite(updated.includes(city));
  }

  return (
    <Link
      to={`/city/${city}`}
      className="block bg-white p-4 rounded-xl shadow hover:shadow-lg transition relative"
    >
      <button
        onClick={handleToggleFavorite}
        className={`absolute top-3 right-3 text-xl ${
          favorite ? "text-yellow-500" : "text-gray-300"
        }`}
      >
        ★
      </button>

      <h2 className="text-xl font-bold">{city}</h2>

      {data ? (
        <>
          <p className="text-2xl font-semibold">
            {Math.round(data.main.temp)}°C
          </p>
          <p className="capitalize text-slate-600">
            {data.weather[0].description}
          </p>
        </>
      ) : (
        <p className="text-sm text-slate-500">Loading…</p>
      )}
    </Link>
  );
}
