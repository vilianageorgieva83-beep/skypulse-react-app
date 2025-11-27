import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { normalizeCityName } from "../utils/normalize";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;

    const normalized = normalizeCityName(query);
    navigate(`/city/${normalized}`);
    setQuery("");
  }

  return (
    <nav className="bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between gap-4">
        {/* LOGO + BRAND */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md">
            <img
              src="/logo.png"
              alt="SkyPulse logo"
              className="w-7 h-7 object-contain"
            />
          </div>

          <span className="text-3xl font-semibold tracking-tight">
            SkyPulse
          </span>
        </Link>

        {/* SEARCH BAR */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Search city..."
            className="px-4 py-2 rounded-lg text-black text-sm w-44 sm:w-56 
                       focus:outline-none focus:ring-2 focus:ring-sky-300"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg shadow 
                       transition hover:bg-slate-200"
          >
            Search
          </button>
        </form>

        {/* NAV LINKS */}
        <div className="flex items-center gap-5 text-sm font-medium">
          <Link to="/" className="hover:text-yellow-200 transition">
            Home
          </Link>
          <Link to="/favorites" className="hover:text-yellow-200 transition">
            Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
}
