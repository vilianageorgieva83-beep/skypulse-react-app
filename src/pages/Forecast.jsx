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
      .then((res) => {
        const list = res.list || [];

        // Group by day (YYYY-MM-DD)
        const groups = {};
        list.forEach((item) => {
          const day = item.dt_txt.split(" ")[0];
          if (!groups[day]) groups[day] = [];
          groups[day].push(item);
        });

        // Take the *midday forecast* for each day
        const daily = Object.values(groups).map((dayArr) => {
          const midday = dayArr.find((i) => i.dt_txt.includes("12:00:00"));
          return midday || dayArr[Math.floor(dayArr.length / 2)];
        });

        setForecast(daily);
      })
      .catch((err) => setError(err.message));
  }, [normalizedCity]);

  if (error)
    return (
      <p className="text-red-600 font-semibold text-lg">
        OpenWeather error 404: Not Found
      </p>
    );

  if (!forecast.length) return <p>Loading forecast...</p>;

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">
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
