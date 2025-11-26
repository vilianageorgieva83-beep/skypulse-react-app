export default function Footer() {
  return (
    <footer className="w-full bg-blue-700 text-white mt-6">
      <div className="max-w-5xl mx-auto px-4 py-3 text-center text-sm">
        © {new Date().getFullYear()} SkyPulse · Data provided by OpenWeather
      </div>
    </footer>
  );
}
