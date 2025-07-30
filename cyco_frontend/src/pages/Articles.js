// src/pages/Articles.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem('access');
        const res = await axios.get('http://localhost:8000/api/articles/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setArticles(res.data);
      } catch (err) {
        setError('Gagal memuat artikel. Pastikan Anda sudah login.');
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Artikel</h1>
      <p className="text-xs text-gray-500 mb-2">Kategori: {articles.category}</p>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {articles.length > 0 ? (
        <ul className="space-y-4">
          {articles.map(article => (
            <li key={article.id} className="border p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{article.title}</h2>
              <p className="text-sm text-gray-700">{article.content}</p>
              <p className="text-xs text-gray-500 mt-2">Diposting oleh {article.author} pada {new Date(article.created_at).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Belum ada artikel yang tersedia.</p>
      )}
    </div>
  );
};

export default Articles;
