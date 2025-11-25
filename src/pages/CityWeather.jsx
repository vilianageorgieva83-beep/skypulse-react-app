import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentWeather } from "../services/WeatherService";

export default function CityWeather() {
  const { name } = useParams();
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    getCurrentWeather(name).then(setWeather);
  }, [name]);

  return (
    <div>
      <h1 className="text-3xl font-bold">{name}</h1>

      {weather && (
        <div className="mt-4 bg-white p-4 rounded shadow">
          <p className="text-lg">Temperature: {weather.main.temp}°C</p>
          <p className="text-lg">Condition: {weather.weather[0].description}</p>
        </div>
      )}

      <Link
        to={`/forecast/${name}`}
        className="text-blue-600 underline mt-6 block"
      >
        View forecast
      </Link>
    </div>
  );
}
