// src/pages/UploadArticle.js
import React, { useState } from 'react';
import axios from 'axios';

const UploadArticle = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState("dasar");
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('access');
      const response = await axios.post('http://localhost:8000/api/articles/', {
        title,
        category,
        content,
        author: 1  // opsional jika backend tidak pakai request.user
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setMessage('Artikel berhasil diunggah!');
      setTitle('');
      setContent('');
    } catch (error) {
      setMessage('Gagal mengunggah artikel. Pastikan kamu login.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Upload Artikel</h2>
      {message && <p className="mb-4 text-red-600">{message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
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

        <textarea
          placeholder="Isi konten"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 rounded"
          rows="6"
          required
        ></textarea>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Kirim</button>
      </form>
    </div>
  );
};

export default UploadArticle;