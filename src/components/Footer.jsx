export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-sky-500 text-white py-4 mt-10">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm tracking-wide text-white/90">
          © {new Date().getFullYear()} SkyPulse — Powered by OpenWeather API
        </p>
      </div>
    </footer>
  );
}
