export default function Footer() {
  return (
    <footer className="w-full bg-blue-700 text-white py-4 mt-6">
      <div className="max-w-5xl mx-auto px-4 text-center text-sm">
        © {new Date().getFullYear()} SkyPulse · Data from OpenWeather API
      </div>
    </footer>
  );
}
