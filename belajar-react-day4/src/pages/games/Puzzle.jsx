import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { GameContext } from '../../components/GameContext';
import api from '../../api/api'; // pakai instance axios

const Puzzle = () => {
  const pieces = ['A', 'B', 'C'];
  const [slots, setSlots] = useState([null, null, null]);
  const [dragItem, setDragItem] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { username } = useContext(GameContext);

  const handleDragStart = (item) => setDragItem(item);

  const handleDrop = (index) => {
    if (dragItem !== null) {
      const newSlots = [...slots];
      newSlots[index] = dragItem;
      setSlots(newSlots);
      setDragItem(null);
    }
  };

  const handleKirim = async () => {
    if (!username) {
      alert('Nama anak tidak ditemukan. Silakan isi nama terlebih dahulu.');
      return;
    }

    try {
      await api.post('/skor', {
        nama: username,
        permainan: 'Puzzle Huruf',
        skor: 100,
      });

      console.log('✅ Skor puzzle berhasil dikirim untuk', username);
      setSubmitted(true);
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      console.error('❌ Gagal menyimpan skor:', error.message);
      alert('Gagal menyimpan skor. Pastikan backend berjalan.');
    }
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Puzzle Huruf</h1>
      <p className="mb-4">Seret huruf ke tempat yang sesuai untuk menyusun kata!</p>

      <div className="flex justify-center gap-4 mb-4">
        {[...pieces].sort(() => 0.5 - Math.random()).map((shape, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => handleDragStart(shape)}
            className="p-4 text-2xl border rounded bg-blue-100 cursor-grab"
          >
            {shape}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mb-4">
        {slots.map((slot, index) => (
          <div
            key={index}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
            className="w-16 h-16 border rounded bg-white flex items-center justify-center text-2xl"
          >
            {slot}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Button label="Kirim" onClick={handleKirim} />
        {submitted && (
          <p className="mt-2 text-green-600 font-semibold">Puzzle berhasil dikirim!</p>
        )}
      </div>
    </div>
  );
};

export default Puzzle;
