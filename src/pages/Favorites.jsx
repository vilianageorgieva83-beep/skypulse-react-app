import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadFavorites, toggleFavorite } from "../utils/Favorites";
import { getCurrentWeather } from "../services/WeatherService";
import { normalizeCityName } from "../utils/normalize";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [weatherData, setWeatherData] = useState({});

  // Load favorites on mount
  useEffect(() => {
    const loaded = loadFavorites();
    setFavorites(loaded);

    async function loadWeather() {
      const results = await Promise.all(
        loaded.map((city) => getCurrentWeather(city))
      );

      const map = {};
      loaded.forEach((city, i) => {
        map[city] = results[i];
      });

      setWeatherData(map);
    }

    if (loaded.length > 0) {
      loadWeather();
    }
  }, []);

  function handleRemove(city) {
    const updated = toggleFavorite(city);
    setFavorites(updated);

    // Remove the city's weather from local state
    const newWeather = { ...weatherData };
    delete newWeather[city];
    setWeatherData(newWeather);
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
            const data = weatherData[city];

            // icon & temp
            const icon = data?.weather?.[0]?.icon
              ? `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
              : null;
            const temp = data?.main?.temp;

            return (
              <li
                key={normalized}
                className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
              >
                {/* LEFT SIDE: Icon + Temp + City */}
                <div className="flex items-center gap-4">
                  {/* icon */}
                  {icon && (
                    <img src={icon} alt="weather icon" className="w-8 h-8" />
                  )}

                  {/* temp */}
                  {temp !== undefined && (
                    <span className="text-lg font-semibold">
                      {Math.round(temp)}°C
                    </span>
                  )}

                  {/* city */}
                  <Link
                    to={`/city/${normalized}`}
                    className="text-lg font-semibold text-blue-700"
                  >
                    {normalized}
                  </Link>
                </div>

                {/* REMOVE BUTTON */}
                <button
                  onClick={() => handleRemove(city)}
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
