import { useEffect, useState } from "react";
import CityCard from "../components/CityCard";
import { getCurrentWeather } from "../services/WeatherService";

const CITIES = ["Luxembourg", "Varna", "Athens"];

export default function Home() {
  const [data, setData] = useState({});

  useEffect(() => {
    CITIES.forEach(async (city) => {
      const result = await getCurrentWeather(city);
      setData((prev) => ({ ...prev, [city]: result }));
    });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Weather Overview</h1>

      <div className="grid md:grid-cols-3 gap-4">
        {CITIES.map((city) => (
          <CityCard key={city} city={city} data={data[city]} />
        ))}
      </div>
    </div>
  );
}
