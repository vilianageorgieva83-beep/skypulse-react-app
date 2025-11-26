export default function ForecastCard({ item }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
      <p className="text-xs text-slate-500">{item.dt_txt}</p>
      <p className="text-xl font-bold">{Math.round(item.main.temp)}°C</p>
      <p className="capitalize text-slate-600">{item.weather[0].description}</p>
    </div>
  );
}
