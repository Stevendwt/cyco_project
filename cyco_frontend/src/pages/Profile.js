// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('http://localhost:8000/api/profile/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        setProfile(res.data);
        setNewUsername(res.data.username);
        setNewEmail(res.data.email);
      })
      .catch((err) => {
        if (err.response?.data?.code === "token_not_valid") {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          navigate("/login");
        } else {
          setError('Gagal memuat data profil.');
        }
      });
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access');

    try {
      const res = await axios.put(
        'http://localhost:8000/api/profile/update/',
        {
          username: newUsername,
          email: newEmail
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setProfile(res.data);
      setEditing(false);
      setMessage('Profil berhasil diperbarui.');
      setError('');
    } catch (err) {
      console.error(err);
      setError('Gagal memperbarui profil.');
      setMessage('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Profil Saya</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {message && <p className="text-green-600 mb-2">{message}</p>}

      {profile && !editing && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <FaUserCircle size={48} className="text-gray-600" />
            <div>
              <p className="text-lg font-semibold">{profile.username}</p>
              <p className="text-gray-600">{profile.email}</p>
            </div>
          </div>
          <button
            onClick={() => setEditing(true)}
            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Edit Profil
          </button>
        </div>
      )}

      {editing && (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block font-medium">Username</label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Batal
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
