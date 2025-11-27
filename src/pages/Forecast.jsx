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
    // Important fix — reset state when city changes
    setForecast([]);
    setError(null);

    getForecast(normalizedCity)
      .then((res) => {
        const list = res.list || [];

        const groups = {};
        list.forEach((item) => {
          const day = item.dt_txt.split(" ")[0];
          if (!groups[day]) groups[day] = [];
          groups[day].push(item);
        });

        const daily = Object.values(groups).map((dayArr) => {
          const midday = dayArr.find((i) => i.dt_txt.includes("12:00:00"));
          return midday || dayArr[Math.floor(dayArr.length / 2)];
        });

        setForecast(daily);
      })
      .catch((err) => setError(err.message));
  }, [normalizedCity]);

  // Error display
  if (error)
    return (
      <p className="text-red-600 font-semibold text-lg">
        This city could not be found! Please try again!
      </p>
    );

  if (!forecast.length) return <p>Loading forecast...</p>;

  return (
    <section>
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        5-Day Forecast — {normalizedCity}
      </h1>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
