export default function Hero() {
  return (
    <section className="w-full bg-gradient-to-r from-sky-400 to-blue-500 text-white py-10 mb-4">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold drop-shadow-md">
          Real-time weather checker
        </h1>
        <p className="mt-2 text-lg opacity-90">Explore now!</p>
        <p className="text-sm opacity-80">
          Built with React, TailwindCSS and OpenWeather API.
        </p>
      </div>
    </section>
  );
}
