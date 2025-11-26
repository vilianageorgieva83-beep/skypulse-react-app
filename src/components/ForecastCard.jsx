export default function ForecastCard({ item }) {
  const icon = item.weather?.[0]?.icon
    ? `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
    : null;

  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition text-center">
      <p className="text-xs text-slate-500 mb-1">{item.dt_txt}</p>

      {icon && (
        <img
          src={icon}
          alt="forecast weather icon"
          className="w-16 h-16 mx-auto"
        />
      )}

      <p className="text-xl font-bold mt-2">{Math.round(item.main.temp)}°C</p>

      <p className="capitalize text-slate-600">{item.weather[0].description}</p>
    </div>
  );
}
