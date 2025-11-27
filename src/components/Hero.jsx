import { useState, useEffect } from "react";

import clouds from "../assets/weather/clouds.jpg";
import comet from "../assets/weather/comet.jpg";
import field from "../assets/weather/field.jpg";
import forest from "../assets/weather/forest.jpg";
import hill from "../assets/weather/hill.jpg";
import sky from "../assets/weather/sky.jpg";
import snow from "../assets/weather/snow.jpg";
import thunder from "../assets/weather/thunder.jpg";

export default function Hero() {
  // Array of weather images
  const weatherImages = [
    clouds,
    comet,
    field,
    forest,
    hill,
    sky,
    snow,
    thunder,
  ];

  // Index of current image
  const [index, setIndex] = useState(0);

  // Change image every 10s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % weatherImages.length);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full text-white py-16 mb-4 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${weatherImages[index]})`,
          opacity: 1,
        }}
      ></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
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
