// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('access');
      if (!token) {
        setIsLoggedIn(false);
        return;
      }
      try {
        const profileRes = await axios.get('http://localhost:8000/api/profile/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsername(profileRes.data.username);
        setIsLoggedIn(true);

        const [articleRes, videoRes] = await Promise.all([
          axios.get('http://localhost:8000/api/articles/', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:8000/api/videos/', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setArticles(articleRes.data);
        setVideos(videoRes.data);
      } catch (err) {
        console.error(err);
        setError('Gagal memuat data. Pastikan Anda sudah login.');
        setIsLoggedIn(false);
      }
    };

    fetchData();
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleMulaiClick = () => {
    navigate('/articles');
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Selamat datang di CYCO</h1>
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <FaUserCircle size={28} className="text-gray-700" />
            <span className="font-semibold text-gray-700">{username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={handleLoginClick}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        )}
      </div>

      <p className="mb-6 text-gray-700">
        CYCO (Cyber Cognitive Learning) adalah platform pembelajaran yang menyediakan artikel dan video interaktif seputar dunia komputer dan teknologi. Silakan mulai menjelajahi konten kami.
      </p>

      {isLoggedIn && (
        <div className="mb-8">
          <button
            onClick={handleMulaiClick}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition"
          >
            Mulai Belajar
          </button>
        </div>
      )}

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {isLoggedIn && (
        <>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Artikel Terbaru</h2>
            {articles.length > 0 ? (
              <ul className="space-y-2">
                {articles.map((article) => (
                  <li key={article.id} className="p-4 border rounded shadow">
                    <h3 className="text-lg font-bold">{article.title}</h3>
                    <p className="text-sm text-gray-600">{article.content}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Tidak ada artikel.</p>
            )}
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Video Terbaru</h2>
            {videos.length > 0 ? (
              <ul className="space-y-2">
                {videos.map((video) => (
                  <li key={video.id} className="p-4 border rounded shadow">
                    <h3 className="text-lg font-bold">{video.title}</h3>
                    <p className="text-sm text-gray-600">{video.description}</p>
                    <a href={video.video_url} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Lihat Video</a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Tidak ada video.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default Dashboard;
