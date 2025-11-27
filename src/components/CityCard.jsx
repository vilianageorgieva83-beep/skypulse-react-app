import { Link } from "react-router-dom";
import { useState } from "react";
import { isFavorite, toggleFavorite } from "../utils/Favorites";
import { normalizeCityName } from "../utils/normalize";

export default function CityCard({ city, data }) {
  const normalizedCity = normalizeCityName(city);
  const [favorite, setFavorite] = useState(isFavorite(city));

  function handleToggleFavorite(e) {
    e.preventDefault();
    const updated = toggleFavorite(city);
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
        className={`absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full shadow-md transition text-xl 
          ${
            favorite
              ? "bg-yellow-300 text-white"
              : "bg-slate-100 text-slate-400"
          }`}
      >
        ★
      </button>

      <h2 className="text-3xl font-semibold text-blue-700 tracking-tight">
        {normalizedCity}
      </h2>

      {data ? (
        <div className="flex items-center gap-4 mt-4">
          {icon && (
            <div className="cloud-shape flex items-center justify-center">
              <img
                src={icon}
                alt="Weather icon"
                className="w-10 h-10 relative z-10"
              />
            </div>
          )}

          <div>
            <p className="text-4xl font-bold tracking-tight">
              {Math.round(data.main.temp)}°C
            </p>
            <p className="capitalize text-slate-600 text-sm font-medium">
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
