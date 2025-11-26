export default function Hero() {
  return (
    <section className="w-full bg-gradient-to-r from-sky-400 to-blue-500 text-white py-12 mb-6">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold drop-shadow-md">SkyPulse Weather</h1>
        <p className="mt-2 text-lg opacity-90">
          Real-time weather for Luxembourg, Varna, and Athens.
        </p>
        <p className="text-sm opacity-75">
          Powered by OpenWeather · React · TailwindCSS
        </p>
      </div>
    </section>
  );
}
