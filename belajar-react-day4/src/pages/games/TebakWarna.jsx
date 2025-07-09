import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { GameContext } from '../../components/GameContext';
import api from '../../api/api'; // ganti dari axios ke api

const TebakWarna = () => {
  const navigate = useNavigate();
  const { username } = useContext(GameContext);

  const namaWarna = ['Merah', 'Hijau', 'Biru'];
  const kodeWarna = ['red', 'green', 'blue'];

  const jawabanBenar = {
    Merah: 'red',
    Hijau: 'green',
    Biru: 'blue',
  };

  const [selectedNama, setSelectedNama] = useState(null);
  const [tebakan, setTebakan] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [semuaBenar, setSemuaBenar] = useState(false);

  const handlePilihWarna = (kode) => {
    if (selectedNama) {
      setTebakan((prev) => [...prev, { nama: selectedNama, kode }]);
      setSelectedNama(null);
    }
  };

  const handleKirim = async () => {
    const semuaJawabanBenar =
      tebakan.every((item) => jawabanBenar[item.nama] === item.kode) &&
      tebakan.length === namaWarna.length;

    setSubmitted(true);
    setSemuaBenar(semuaJawabanBenar);

    if (!username) {
      alert('Nama anak tidak ditemukan. Silakan isi nama terlebih dahulu.');
      return;
    }

    if (semuaJawabanBenar) {
      try {
        await api.post('/skor', {
          nama: username,
          permainan: 'Tebak Warna',
          skor: 100,
        });

        console.log('✅ Skor Tebak Warna berhasil dikirim untuk', username);
        setTimeout(() => navigate('/'), 1500);
      } catch (err) {
        console.error('❌ Gagal menyimpan skor:', err.message);
        alert('Gagal menyimpan skor. Pastikan server backend aktif.');
      }
    }
  };

  const handleReset = () => {
    setSelectedNama(null);
    setTebakan([]);
    setSubmitted(false);
    setSemuaBenar(false);
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Tebak Warna</h1>
      <div className="grid grid-cols-2 gap-10 justify-center">
        <div>
          <h2 className="font-semibold mb-2">Nama Warna</h2>
          {namaWarna.map((nama) => (
            <div
              key={nama}
              onClick={() => setSelectedNama(nama)}
              className={`p-2 border mb-2 cursor-pointer text-center bg-white ${
                selectedNama === nama ? 'bg-yellow-100 border-yellow-500' : ''
              }`}
            >
              {nama}
            </div>
          ))}
        </div>
        <div>
          <h2 className="font-semibold mb-2">Kotak Warna</h2>
          {kodeWarna.map((kode) => (
            <div
              key={kode}
              onClick={() => handlePilihWarna(kode)}
              className="w-12 h-12 mx-auto mb-4 border cursor-pointer"
              style={{ backgroundColor: kode }}
            ></div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-700">
        <p className="mb-2 font-semibold">Jawaban:</p>
        <ul>
          {tebakan.map((item, i) => (
            <li key={i}>
              {item.nama} cocok dengan {item.kode}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <Button label="Kirim" onClick={handleKirim} />
        <Button label="Reset" onClick={handleReset} />
      </div>

      {submitted && (
        <div className="mt-6 text-center">
          <p className={`font-semibold ${semuaBenar ? 'text-green-600' : 'text-red-600'}`}>
            {semuaBenar
              ? 'Jawaban kamu benar semua! 🎉 Mengalihkan ke halaman utama...'
              : 'Ada jawaban yang belum tepat, coba lagi ya!'}
          </p>
          <Button
            label="Kembali ke Halaman Utama"
            onClick={() => navigate('/')}
            className="mt-2"
          />
        </div>
      )}
    </div>
  );
};

export default TebakWarna;