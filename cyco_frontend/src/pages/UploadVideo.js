// UploadVideo.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadVideo = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState("dasar");
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('access');

  try {
    await axios.post('http://localhost:8000/api/videos/', {
      title,
      description,
      category,
      video_url: videoUrl // ✅ FIX INI
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    alert("Video berhasil diunggah!");
    setTitle('');
    setDescription('');
    setVideoUrl('');
    setError('');
    setSuccess("Video berhasil diunggah!");
  } catch (err) {
    console.error(err);

    if (err.response?.data?.code === "token_not_valid") {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      navigate("/login");
    } else {
      setError("Gagal mengunggah video. Periksa data dan token Anda.");
      setSuccess('');
    }
  
};

  };

  // ✅ RETURN HARUS BERADA DI DALAM SINI
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Upload Video</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Judul</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded"
          required
        >
          <option value="dasar">Dasar Jaringan</option>
          <option value="keamanan">Keamanan Jaringan</option>
          <option value="tools">Tools & Aplikasi</option>
          <option value="konfigurasi">Konfigurasi Jaringan</option>
        </select>


        <div>
          <label className="block font-medium">Deskripsi</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">URL Video (YouTube, Vimeo, dll)</label>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadVideo;
