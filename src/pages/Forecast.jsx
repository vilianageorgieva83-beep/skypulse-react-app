import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getForecast } from "../services/WeatherService";

export default function Forecast() {
  const { name } = useParams();
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    getForecast(name).then((data) => {
      setForecast(data.list);
    });
  }, [name]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Forecast for {name}</h1>

      <div className="grid md:grid-cols-3 gap-4">
        {forecast.slice(0, 9).map((item, i) => (
          <div key={i} className="bg-white p-4 shadow rounded">
            <p>{item.dt_txt}</p>
            <p>{item.main.temp}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
}
