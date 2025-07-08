import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const origamiParts = ['📐', '🔷', '🔻'];

const Origami = () => {
  const [placed, setPlaced] = useState([null, null, null]);
  const [drag, setDrag] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleStart = (part) => setDrag(part);

  const handlePlace = (index) => {
    const newPlaced = [...placed];
    newPlaced[index] = drag;
    setPlaced(newPlaced);
    setDrag(null);
  };

  const handleKirim = () => {
    setSubmitted(true);
    setTimeout(() => navigate('/'), 1500);
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Menyusun Origami</h1>
      <p className="mb-4">Susun bagian origami menjadi bentuk utuh!</p>

      <div className="flex justify-center gap-4 mb-4">
        {origamiParts.map((part, i) => (
          <div
            key={i}
            draggable
            onDragStart={() => handleStart(part)}
            className="text-2xl p-3 bg-green-100 border rounded cursor-move"
          >
            {part}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mb-4">
        {placed.map((p, i) => (
          <div
            key={i}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handlePlace(i)}
            className="w-16 h-16 border-2 rounded bg-white flex items-center justify-center text-2xl"
          >
            {p}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Button label="Kirim" onClick={handleKirim} />
        {submitted && (
          <p className="mt-2 text-green-600 font-semibold">Origami berhasil dikirim!</p>
        )}
      </div>
    </div>
  );
};

export default Origami;