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
      .then((data) => {
        setForecast(data.list || []);
      })
      .catch((err) => setError(err.message));
  }, [name]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">5-Day Forecast for {name}</h1>

      {error && <p className="text-red-600">{error}</p>}

      <div className="grid md:grid-cols-3 gap-4">
        {forecast.slice(0, 12).map((item) => (
          <ForecastCard key={item.dt} item={item} />
        ))}
      </div>
    </div>
  );
}
