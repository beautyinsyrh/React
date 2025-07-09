import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GameContext } from '../components/GameContext';
import api from '../api/api';

const Home = () => {
  const { username, setUsername, setSelectedGame } = useContext(GameContext);
  const [tempName, setTempName] = useState('');
  const [skor, setSkor] = useState(null);

  useEffect(() => {
    if (username) {
      fetchSkor(username);
    }
  }, [username]);

  const fetchSkor = async (nama) => {
    try {
      const res = await api.get(`/skor/${nama}`);
      setSkor(res.data.skor);
      console.log(`Skor untuk ${nama}:`, res.data.skor);
    } catch (err) {
      console.error('Gagal mengambil skor:', err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tempName.trim()) {
      alert('Nama tidak boleh kosong');
      return;
    }

    console.log('Mengirim nama ke backend:', tempName);

    try {
      const res = await api.post('/pengguna', { nama: tempName });
      console.log('Respons dari backend:', res.data);
      setUsername(tempName);
      fetchSkor(tempName);
    } catch (err) {
      console.error('Gagal menyimpan nama:', err.message);
      alert('Gagal menyimpan nama. Pastikan server backend berjalan.');
    }
  };

  const games = [
    { name: 'Belajar Huruf', path: '/game/belajar-huruf', color: 'bg-pink-300' },
    { name: 'Belajar Angka', path: '/game/belajar-angka', color: 'bg-green-300' },
    { name: 'Tebak Warna', path: '/game/tebak-warna', color: 'bg-yellow-300' },
    { name: 'Menyusun Puzzle', path: '/game/puzzle', color: 'bg-orange-300' },
    { name: 'Mewarnai Gambar', path: '/game/mewarnai', color: 'bg-red-300' },
    { name: 'Menyusun Origami', path: '/game/origami', color: 'bg-purple-300' },
  ];

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl font-bold mb-2 text-blue-700">Selamat Datang di Berseri</h1>
        <p className="text-gray-700 text-lg mb-6">
          Belajar Seru di Sini! Ayo pilih permainan edukatif untuk anak usia dini.
        </p>

        {!username && (
          <form onSubmit={handleSubmit} className="mb-8">
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Masukkan nama anak"
              className="px-4 py-2 border border-gray-300 rounded mb-2 w-full"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Kirim
            </button>
          </form>
        )}

        {username && (
          <div className="mb-6">
            <p className="text-lg font-semibold text-gray-700">Halo, {username}!</p>
            {skor !== null && (
              <p className="text-green-600 font-bold">Skor terakhir: {skor}</p>
            )}
          </div>
        )}

        <h2 className="text-xl font-semibold mb-4">Pilih Permainan:</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {games.map((game, i) => (
            <Link
              to={game.path}
              key={i}
              onClick={() => setSelectedGame(game.name)}
              className={`p-4 rounded-lg shadow-lg text-white text-center font-semibold ${game.color} hover:opacity-80 transition`}
            >
              {game.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
