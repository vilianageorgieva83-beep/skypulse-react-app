import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-blue-50 text-gray-900">
      <Navbar />
      {isHome && <Hero />}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
