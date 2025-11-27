const RANDOM_CITIES = [
  "New York",
  "Tokyo",
  "Sydney",
  "Cape Town",
  "Toronto",
  "Madrid",
  "Paris",
  "Berlin",
  "Milan",
  "Rome",
  "Lisbon",
  "Vienna",
  "Oslo",
  "Helsinki",
  "Dubai",
  "Singapore",
  "Seoul",
  "Chicago",
  "Istanbul",
  "Stockholm",
];

export function getRandomCities(count = 3) {
  const shuffled = [...RANDOM_CITIES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
