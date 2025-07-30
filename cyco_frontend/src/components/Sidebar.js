import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white shadow-lg fixed top-0 left-0">
      <div className="p-6 text-2xl font-bold border-b">CYCO</div>
      <nav className="flex flex-col p-4 space-y-2 text-gray-700 font-medium">
        <Link to="/dashboard" className="hover:bg-gray-100 px-3 py-2 rounded">Dashboard</Link> {/* ← Tambahan */}
        <Link to="/articles" className="hover:bg-gray-100 px-3 py-2 rounded">Artikel</Link>
        <Link to="/videos" className="hover:bg-gray-100 px-3 py-2 rounded">Video</Link>
        <Link to="/profile" className="hover:bg-gray-100 px-3 py-2 rounded">Profil</Link>
        <Link to="/upload-article" className="hover:bg-gray-100 px-3 py-2 rounded">Upload Artikel</Link>
        <Link to="/upload-video" className="hover:bg-gray-100 px-3 py-2 rounded">Upload Video</Link>
      </nav>

    </div>
  );
}
