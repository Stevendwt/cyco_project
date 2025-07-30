// src/pages/Videos.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Fungsi helper untuk konversi URL video ke format embed
import { convertToEmbedUrl } from '../utils';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      const token = localStorage.getItem('access');
      if (!token) {
        setError('Anda belum login.');
        return;
      }
      try {
        const response = await axios.get('http://localhost:8000/api/videos/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setVideos(response.data);
      } catch (err) {
        console.error(err);
        setError('Gagal memuat video.');
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Video</h1>
      <p className="text-xs text-gray-500 mb-2">Kategori: {video.category}</p>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {videos.length > 0 ? (
        <ul className="space-y-4">
          {videos.map((video) => (
            <li key={video.id} className="border p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{video.title}</h2>
              <p className="text-gray-600 text-sm mb-2">{video.description}</p>
              <div className="aspect-video w-full mb-4">
                <iframe
                  className="w-full h-64 rounded"
                  src={convertToEmbedUrl(video.video_url)}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

            </li>
          ))}
        </ul>
      ) : (
        <p>Tidak ada video ditemukan.</p>
      )}
    </div>
  );
};

export default Videos;
