import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentWeather } from "../services/WeatherService";
import { isFavorite, toggleFavorite } from "../utils/Favorites";

export default function CityWeather() {
  const { name } = useParams();
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [favorite, setFavorite] = useState(isFavorite(name));

  useEffect(() => {
    getCurrentWeather(name)
      .then(setWeather)
      .catch((e) => setError(e.message));
  }, [name]);

  function handleToggleFavorite() {
    const updated = toggleFavorite(name);
    setFavorite(updated.includes(name));
  }

  if (error) return <p className="text-red-600">{error}</p>;
  if (!weather) return <p>Loading {name} weather…</p>;

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{weather.name}</h1>

        <button
          onClick={handleToggleFavorite}
          className={`px-4 py-2 rounded-lg shadow text-sm font-semibold transition 
            ${favorite ? "bg-red-500 text-white" : "bg-sky-600 text-white"}`}
        >
          {favorite ? "★ Remove Favorite" : "☆ Add Favorite"}
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow max-w-md space-y-2">
        <p className="text-2xl font-semibold">
          {Math.round(weather.main.temp)}°C
        </p>
        <p className="capitalize text-slate-600">
          {weather.weather[0].description}
        </p>
        <p className="text-sm text-slate-500">
          Feels like {Math.round(weather.main.feels_like)}°C · Humidity{" "}
          {weather.main.humidity}%
        </p>
      </div>

      <Link
        to={`/forecast/${name}`}
        className="block mt-6 text-blue-600 underline text-sm"
      >
        View 5-day forecast →
      </Link>
    </section>
  );
}
