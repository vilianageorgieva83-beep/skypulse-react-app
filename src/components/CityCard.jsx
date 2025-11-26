import { Link } from "react-router-dom";

export default function CityCard({ city, data }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-1">{city}</h2>
      {data ? (
        <>
          <p className="text-2xl font-semibold">
            {Math.round(data.main.temp)}°C
          </p>
          <p className="capitalize text-slate-600">
            {data.weather[0].description}
          </p>
        </>
      ) : (
        <p className="text-sm text-slate-500">Loading...</p>
      )}
      <Link
        to={`/city/${city}`}
        className="mt-3 inline-block text-blue-600 underline text-sm"
      >
        View details →
      </Link>
    </div>
  );
}
