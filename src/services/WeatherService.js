const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

async function safeFetch(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `OpenWeather error ${res.status}: ${res.statusText} ${text}`
    );
  }
  return res.json();
}

export async function getCurrentWeather(city) {
  if (!API_KEY) throw new Error("VITE_OPENWEATHER_KEY is not set");
  const url = `${BASE_URL}/weather?q=${encodeURIComponent(
    city
  )}&units=metric&appid=${API_KEY}`;
  return safeFetch(url);
}

export async function getForecast(city) {
  if (!API_KEY) throw new Error("VITE_OPENWEATHER_KEY is not set");
  const url = `${BASE_URL}/forecast?q=${encodeURIComponent(
    city
  )}&units=metric&appid=${API_KEY}`;
  return safeFetch(url);
}
