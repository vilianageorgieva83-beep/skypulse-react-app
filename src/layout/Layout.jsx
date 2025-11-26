import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-blue-50 text-gray-900">
      <Navbar />

      {isHome && <Hero />}

      <main className="p-4 max-w-5xl mx-auto flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
