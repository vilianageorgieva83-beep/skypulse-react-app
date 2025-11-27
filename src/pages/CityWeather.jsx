import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentWeather } from "../services/WeatherService";
import { isFavorite, toggleFavorite } from "../utils/Favorites";
import { normalizeCityName } from "../utils/normalize";

export default function CityWeather() {
  const { name } = useParams();
  const normalizedCity = normalizeCityName(name);

  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [favorite, setFavorite] = useState(isFavorite(name));

  useEffect(() => {
    // IMPORTANT FIX — reset state when city changes
    setWeather(null);
    setError(null);

    getCurrentWeather(normalizedCity)
      .then((data) => setWeather(data))
      .catch((e) => setError(e.message));
  }, [normalizedCity]);

  function handleToggleFavorite() {
    const updated = toggleFavorite(name);
    setFavorite(updated.includes(normalizedCity));
  }

  // Error message
  if (error)
    return (
      <p className="text-red-600 font-semibold text-lg">
        This city could not be found! Please try again!
      </p>
    );

  if (!weather) return <p>Loading {normalizedCity} weather…</p>;

  const iconUrl = weather.weather?.[0]?.icon
    ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    : null;

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {normalizedCity}
        </h1>

        <button
          onClick={handleToggleFavorite}
          className={`px-4 py-2 rounded-lg shadow text-sm font-semibold transition 
            ${favorite ? "bg-red-500 text-white" : "bg-sky-600 text-white"}`}
        >
          {favorite ? "★ Remove Favorite" : "☆ Add Favorite"}
        </button>
      </div>

      {/* WEATHER BOX */}
      <div className="bg-white p-6 rounded-xl shadow max-w-md flex items-center gap-4">
        {iconUrl && (
          <div className="cloud-shape flex items-center justify-center">
            <img
              src={iconUrl}
              alt="Weather icon"
              className="w-12 h-12 relative z-10"
            />
          </div>
        )}

        <div className="space-y-1">
          <p className="text-4xl font-bold tracking-tight">
            {Math.round(weather.main.temp)}°C
          </p>
          <p className="capitalize text-slate-600 font-medium">
            {weather.weather[0].description}
          </p>
          <p className="text-sm text-slate-500">
            Feels like {Math.round(weather.main.feels_like)}°C · Humidity{" "}
            {weather.main.humidity}%
          </p>
        </div>
      </div>

      <Link
        to={`/forecast/${normalizedCity}`}
        className="block mt-6 text-blue-600 underline text-sm"
      >
        View 5-day forecast →
      </Link>
    </section>
  );
}
