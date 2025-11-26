import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="mb-4">The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-600 underline">
        Return Home
      </Link>
    </div>
  );
}
