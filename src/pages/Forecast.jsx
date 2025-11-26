import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getForecast } from "../services/WeatherService";
import ForecastCard from "../components/ForecastCard";
import { normalizeCityName } from "../utils/normalize";

export default function Forecast() {
  const { name } = useParams();
  const normalizedCity = normalizeCityName(name);

  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getForecast(normalizedCity)
      .then((res) => setForecast(res.list || []))
      .catch((err) => setError(err.message));
  }, [normalizedCity]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!forecast.length) return <p>Loading forecast...</p>;

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">
        5-Day Forecast — {normalizedCity}
      </h1>

      {/* Forecast grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {forecast.map((item) => (
          <ForecastCard key={item.dt} item={item} />
        ))}
      </div>

      <Link
        to={`/city/${normalizedCity}`}
        className="block mt-6 text-blue-600 underline text-sm"
      >
        ← Back to City Weather
      </Link>
    </section>
  );
}
