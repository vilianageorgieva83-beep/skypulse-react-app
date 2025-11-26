import { Link } from "react-router-dom";
import { isFavorite, toggleFavorite } from "../utils/Favorites";
import { useState } from "react";

export default function CityCard({ city, data }) {
  const [favorite, setFavorite] = useState(isFavorite(city));

  function handleToggleFavorite(e) {
    e.preventDefault();
    const updated = toggleFavorite(city);
    setFavorite(updated.includes(city));
  }

  const icon = data?.weather?.[0]?.icon
    ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    : null;

  return (
    <Link
      to={`/city/${city}`}
      className="block bg-white/90 backdrop-blur-lg p-6 rounded-2xl border border-blue-100 shadow-md hover:shadow-xl transition relative"
    >
      <button
        onClick={handleToggleFavorite}
        className={`absolute top-4 right-4 text-2xl ${
          favorite ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </button>

      <h2 className="text-2xl font-bold text-blue-700">{city}</h2>

      {data ? (
        <div className="flex items-center gap-3 mt-3">
          {icon && <img src={icon} alt="weather icon" className="w-14 h-14" />}

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
