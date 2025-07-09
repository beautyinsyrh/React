import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/UI/Card';
import Button from '../../components/Button';
import api from '../../api/api'; // Ganti dari axios ke api instance
import { GameContext } from '../../components/GameContext';

const warnaPalet = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];

function Mewarnai() {
  const [selectedColor, setSelectedColor] = useState('red');
  const [colors, setColors] = useState({
    area1: '#ffffff',
    area2: '#ffffff',
    area3: '#ffffff',
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { username } = useContext(GameContext);

  const handleColorArea = (area) => {
    setColors((prev) => ({
      ...prev,
      [area]: selectedColor,
    }));
  };

  const handleKirim = async () => {
    if (!username) {
      alert('Nama anak tidak ditemukan. Silakan kembali ke halaman utama dan isi nama.');
      return;
    }

    try {
      await api.post('/skor', {
        nama: username,
        permainan: 'Mewarnai Gambar',
        skor: 100,
      });

      console.log('✅ Skor mewarnai berhasil dikirim untuk', username);
      setSubmitted(true);
    } catch (err) {
      console.error('❌ Gagal menyimpan skor:', err.message);
      alert('Gagal menyimpan skor. Pastikan backend aktif.');
    }
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-4">Mewarnai Gambar</h2>
      <p className="text-gray-700 mb-4">Pilih warna dan klik pada bagian gambar untuk mewarnai.</p>

      <div className="flex gap-2 mb-6">
        {warnaPalet.map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-black' : 'border-transparent'}`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <svg viewBox="0 0 300 200" width="300" height="200">
          <rect
            x="10"
            y="10"
            width="80"
            height="180"
            fill={colors.area1}
            stroke="black"
            strokeWidth="2"
            onClick={() => handleColorArea('area1')}
          />
          <rect
            x="110"
            y="10"
            width="80"
            height="180"
            fill={colors.area2}
            stroke="black"
            strokeWidth="2"
            onClick={() => handleColorArea('area2')}
          />
          <rect
            x="210"
            y="10"
            width="80"
            height="180"
            fill={colors.area3}
            stroke="black"
            strokeWidth="2"
            onClick={() => handleColorArea('area3')}
          />
        </svg>
      </div>

      <div className="mt-4 text-center">
        <Button label="Kirim" onClick={handleKirim} />
        {submitted && (
          <div className="mt-4 text-sm text-center text-gray-700">
            <p className="text-green-600 font-semibold">Warna berhasil dikirim!</p>
            <Button
              label="Kembali ke Halaman Utama"
              onClick={() => navigate('/')}
              className="mt-2"
            />
          </div>
        )}
      </div>
    </Card>
  );
}

export default Mewarnai;