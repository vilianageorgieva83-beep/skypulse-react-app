import { Link } from "react-router-dom";
import { useState } from "react";
import { isFavorite, toggleFavorite } from "../utils/Favorites";
import { normalizeCityName } from "../utils/normalize";

export default function CityCard({ city, data }) {
  // Normalize only for display — NOT for toggleFavorite()
  const normalizedCity = normalizeCityName(city);

  const [favorite, setFavorite] = useState(isFavorite(city)); // pass raw city!

  function handleToggleFavorite(e) {
    e.preventDefault(); // prevent link navigation

    const updated = toggleFavorite(city); // 🔥 RAW city, no normalization here
    setFavorite(updated.includes(normalizedCity));
  }

  const icon = data?.weather?.[0]?.icon
    ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    : null;

  return (
    <Link
      to={`/city/${normalizedCity}`}
      className="block bg-white/90 backdrop-blur-lg p-6 rounded-2xl border border-blue-100 shadow-md hover:shadow-xl transition relative"
    >
      {/* FAVORITE STAR */}
      <button
        onClick={handleToggleFavorite}
        className={`absolute top-4 right-4 text-2xl ${
          favorite ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </button>

      <h2 className="text-2xl font-bold text-blue-700">{normalizedCity}</h2>

      {data ? (
        <div className="flex items-center gap-3 mt-3">
          {icon && <img src={icon} alt="Weather icon" className="w-14 h-14" />}

          <div>
            <p className="text-3xl font-semibold">
              {Math.round(data.main.temp)}°C
            </p>
            <p className="capitalize text-slate-600 text-sm">
              {data.weather[0].description}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500 mt-2">Loading…</p>
      )}
    </Link>
  );
}
