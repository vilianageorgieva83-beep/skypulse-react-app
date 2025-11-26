import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/city/${query.trim()}`);
    setQuery("");
  }

  return (
    <nav className="bg-blue-700 text-white p-4 shadow-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          🔵 SkyPulse
        </Link>

        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Search city..."
            className="px-3 py-1 rounded text-black"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="bg-white text-blue-700 font-semibold px-3 py-1 rounded">
            Search
          </button>
        </form>

        <div className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
        </div>
      </div>
    </nav>
  );
}
