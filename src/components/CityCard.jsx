import { Link } from "react-router-dom";

export default function CityCard({ city, data }) {
  return (
    <div className="bg-white shadow p-4 rounded-xl">
      <h2 className="text-xl font-bold mb-2">{city}</h2>
      <p className="text-lg">{data?.main?.temp}°C</p>
      <Link to={`/city/${city}`} className="text-blue-600 underline">
        View details
      </Link>
    </div>
  );
}
