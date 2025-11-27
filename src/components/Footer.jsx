import Footer from "./components/Footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Footer /> {/* 👈 ADD THIS */}
    </div>
  );
}
