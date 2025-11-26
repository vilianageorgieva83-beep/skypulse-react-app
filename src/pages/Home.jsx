import { useEffect, useState } from "react";
import { getCurrentWeather } from "../services/WeatherService";
import CityCard from "../components/CityCard";

const TRACKED_CITIES = ["Luxembourg", "Varna", "Athens"];

export default function Home() {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const results = await Promise.all(
          TRACKED_CITIES.map((c) => getCurrentWeather(c))
        );
        const map = {};
        TRACKED_CITIES.forEach((c, i) => {
          map[c] = results[i];
        });
        setData(map);
      } catch (e) {
        setError(e.message);
      }
    }
    load();
  }, []);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Tracked Cities</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <div className="grid gap-4 md:grid-cols-3">
        {TRACKED_CITIES.map((city) => (
          <CityCard key={city} city={city} data={data[city]} />
        ))}
      </div>
    </section>
  );
}
