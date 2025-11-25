const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

export async function getCurrentWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  const res = await fetch(url);
  return res.json();
}

export async function getForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

  const res = await fetch(url);
  return res.json();
}
