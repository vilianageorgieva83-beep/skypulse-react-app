import { Link } from "react-router-dom";
import { useState } from "react";
import { isFavorite, toggleFavorite } from "../utils/Favorites";
import { normalizeCityName } from "../utils/normalize";

export default function CityCard({ city, data }) {
  // Normalize name immediately for consistency
  const normalizedCity = normalizeCityName(city);

  const [favorite, setFavorite] = useState(isFavorite(normalizedCity));

  function handleToggleFavorite(e) {
    e.preventDefault(); // prevent navigating when clicking the star
    const updated = toggleFavorite(normalizedCity);
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
      {/* FAVORITE STAR BUTTON */}
      <button
        onClick={handleToggleFavorite}
        className={`absolute top-4 right-4 text-2xl ${
          favorite ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </button>

      {/* CITY NAME */}
      <h2 className="text-2xl font-bold text-blue-700">{normalizedCity}</h2>

      {/* WEATHER INFO */}
      {data ? (
        <div className="flex items-center gap-3 mt-3">
          {/* Weather icon */}
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
