import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="text-center py-12">
      <h1 className="text-4xl font-bold mb-3">404 — Page not found</h1>
      <p className="mb-4">The page you requested does not exist.</p>
      <Link to="/" className="text-blue-600 underline">
        Go back home
      </Link>
    </section>
  );
}
