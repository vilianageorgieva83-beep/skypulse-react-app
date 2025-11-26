import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentWeather } from "../services/WeatherService";

export default function CityWeather() {
  const { name } = useParams();
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCurrentWeather(name)
      .then(setWeather)
      .catch((err) => setError(err.message));
  }, [name]);

  if (error) return <p className="text-red-600">{error}</p>;

  if (!weather) return <p>Loading {name} weather…</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{weather.name}</h1>

      <div className="bg-white p-6 rounded-xl shadow max-w-md space-y-2">
        <p className="text-2xl font-semibold">
          {Math.round(weather.main.temp)}°C
        </p>
        <p className="capitalize text-slate-600">
          {weather.weather[0].description}
        </p>
        <p className="text-sm text-slate-500">
          Humidity {weather.main.humidity}%
        </p>
      </div>

      <Link
        to={`/forecast/${name}`}
        className="block mt-6 text-blue-600 underline"
      >
        View 5-day forecast →
      </Link>
    </div>
  );
}
