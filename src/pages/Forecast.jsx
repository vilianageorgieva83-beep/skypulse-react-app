import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getForecast } from "../services/WeatherService";
import ForecastCard from "../components/ForecastCard";

export default function Forecast() {
  const { name } = useParams();
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getForecast(name)
      .then((data) => setForecast(data.list || []))
      .catch((e) => setError(e.message));
  }, [name]);

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">5-Day Forecast for {name}</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="grid gap-4 md:grid-cols-3">
        {forecast.slice(0, 12).map((item) => (
          <ForecastCard key={item.dt} item={item} />
        ))}
      </div>
    </section>
  );
}
