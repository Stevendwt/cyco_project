// src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/register/', {
        username,
        email,
        password
      });
      setMessage(res.data.message);
      setUsername('');
      setEmail('');
      setPassword('');

      // ✅ Arahkan ke halaman login setelah berhasil register
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      if (error.response?.data?.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage('Gagal register. Server tidak merespon atau error tidak diketahui.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {message && <p className="mb-4 text-red-600">{message}</p>}
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2 rounded" required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 rounded" required />
        <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700">Register</button>
      </form>

      {/* ✅ Tombol ke login */}
      <div className="mt-4 text-center">
        <p className="text-sm">Sudah punya akun?</p>
        <Link to="/login">
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
