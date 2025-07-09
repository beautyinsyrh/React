import React, { useContext, useState } from 'react';
import { GameContext } from '../components/GameContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import Button from '../components/Button';

const Pengaturan = () => {
  const { username, setUsername } = useContext(GameContext);
  const [newName, setNewName] = useState('');
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  const handleUbahNama = async () => {
    if (!newName.trim()) {
      setFeedback('Nama baru tidak boleh kosong');
      return;
    }

    try {
      await api.put(`/pengguna/${username}`, { baru: newName });
      setUsername(newName);
      setFeedback('Nama berhasil diubah');
    } catch (err) {
      console.error('Gagal ubah nama', err);
      setFeedback('Gagal ubah nama');
    }
  };

  const handleHapusSkor = async () => {
    try {
      await api.delete(`/skor/${username}`);
      setFeedback('Skor terakhir berhasil dihapus');
    } catch (err) {
      console.error('Gagal menghapus skor', err);
      setFeedback('Gagal menghapus skor');
    }
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Pengaturan</h1>
      <p className="mb-4">Halo, <span className="font-semibold">{username}</span></p>

      <div className="max-w-sm mx-auto mb-6">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nama baru"
          className="w-full px-4 py-2 border rounded mb-3"
        />
        <Button label="Ubah Nama Anak" onClick={handleUbahNama} className="mb-3 w-full" />
        <Button label="Hapus Skor Terakhir" onClick={handleHapusSkor} className="bg-red-500 w-full" />
      </div>

      {feedback && <p className="text-green-600 font-semibold">{feedback}</p>}

      <button
        onClick={() => navigate('/')}
        className="mt-6 text-blue-600 hover:underline"
      >
        Kembali ke Beranda
      </button>
    </div>
  );
};

export default Pengaturan;
