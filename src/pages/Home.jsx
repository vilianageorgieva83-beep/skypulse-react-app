import { useEffect, useState } from "react";
import { getCurrentWeather } from "../services/WeatherService";
import CityCard from "../components/CityCard";
import { loadFavorites } from "../utils/Favorites";
import { getRandomCities } from "../utils/randomCities";

export default function Home() {
  const [citiesToShow, setCitiesToShow] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState(null);

  // Decide what cities to show
  useEffect(() => {
    const favs = loadFavorites();

    if (favs.length >= 3) {
      // Show first 3 favorites
      setCitiesToShow(favs.slice(0, 3));
    } else {
      // Show random cities
      setCitiesToShow(getRandomCities(3));
    }
  }, []);

  // Fetch weather for those cities
  useEffect(() => {
    if (citiesToShow.length === 0) return;

    async function loadWeather() {
      try {
        const results = await Promise.all(
          citiesToShow.map((c) => getCurrentWeather(c))
        );

        const map = {};
        citiesToShow.forEach((city, i) => {
          map[city] = results[i];
        });

        setWeatherData(map);
      } catch (e) {
        setError(e.message);
      }
    }

    loadWeather();
  }, [citiesToShow]);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">
        {citiesToShow.length >= 3 && loadFavorites().length >= 3
          ? "Your Favorite Cities"
          : "Explore These Cities"}
      </h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid gap-4 md:grid-cols-3">
        {citiesToShow.map((city) => (
          <CityCard key={city} city={city} data={weatherData[city]} />
        ))}
      </div>
    </section>
  );
}
