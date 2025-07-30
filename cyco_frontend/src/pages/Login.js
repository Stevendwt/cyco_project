// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // ← INI AKTIFKAN NAVIGASI

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:8000/api/token/', {
      username,
      password
    });

    // Hapus token lama dan simpan yang baru
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);

    setMessage('Login berhasil');

    // Redirect ke dashboard setelah login sukses
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    setMessage('Login gagal. Periksa kembali username dan password.');
  }
};


  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {message && <p className="mb-4 text-red-600">{message}</p>}
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
      <p className="mt-4 text-sm">
        Belum punya akun?{' '}
        <Link to="/register" className="text-blue-600 underline">
          Daftar di sini
        </Link>
      </p>
    </div>
  );
};

export default Login;
