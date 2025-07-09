import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import api from '../../api/api'; // Ganti axios dengan instance api
import { GameContext } from '../../components/GameContext';

const BelajarHuruf = () => {
  const huruf_besar = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const huruf_kecil = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  const huruf = huruf_besar;
  const ejaan = huruf_kecil;

  const [selectedHuruf, setSelectedHuruf] = useState(null);
  const [selectedEjaan, setSelectedEjaan] = useState(null);
  const [koneksi, setKoneksi] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [hasil, setHasil] = useState({ benar: 0, salah: 0, skor: 0 });

  const hurufRefs = useRef({});
  const ejaanRefs = useRef({});
  const svgRef = useRef(null);
  const navigate = useNavigate();
  const { username } = useContext(GameContext);

  const handleSelectHuruf = (h) => {
    setSelectedHuruf(h);
    if (selectedEjaan) {
      setKoneksi((prev) => [...prev, { h, e: selectedEjaan }]);
      setSelectedHuruf(null);
      setSelectedEjaan(null);
    }
  };

  const handleSelectEjaan = (e) => {
    setSelectedEjaan(e);
    if (selectedHuruf) {
      setKoneksi((prev) => [...prev, { h: selectedHuruf, e }]);
      setSelectedHuruf(null);
      setSelectedEjaan(null);
    }
  };

  const handleKirim = async () => {
    const jawabanBenar = {};
    huruf_besar.forEach((hb, i) => {
      jawabanBenar[hb] = huruf_kecil[i];
    });

    let benar = 0;
    koneksi.forEach(({ h, e }) => {
      if (jawabanBenar[h] === e) benar++;
    });

    const salah = koneksi.length - benar;
    const skor = benar * 50;

    setHasil({ benar, salah, skor });
    setSubmitted(true);

    if (!username) {
      alert('Nama anak tidak ditemukan. Silakan kembali ke halaman utama dan isi nama.');
      return;
    }

    try {
      await api.post('/skor', {
        nama: username,
        permainan: 'Belajar Huruf',
        skor,
      });
      console.log('✅ Skor berhasil disimpan untuk', username);
    } catch (error) {
      console.error('❌ Gagal menyimpan skor:', error.message);
      alert('Gagal menyimpan skor. Pastikan backend aktif.');
    }
  };

  useEffect(() => {
    const svg = svgRef.current;
    svg.innerHTML = '';

    koneksi.forEach(({ h, e }) => {
      const hurufEl = hurufRefs.current[h];
      const ejaanEl = ejaanRefs.current[e];
      const containerBox = svg.parentElement.getBoundingClientRect();

      if (hurufEl && ejaanEl) {
        const hurufBox = hurufEl.getBoundingClientRect();
        const ejaanBox = ejaanEl.getBoundingClientRect();

        const startX = hurufBox.right - containerBox.left;
        const startY = hurufBox.top + hurufBox.height / 2 - containerBox.top;

        const endX = ejaanBox.left - containerBox.left;
        const endY = ejaanBox.top + ejaanBox.height / 2 - containerBox.top;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', startX);
        line.setAttribute('y1', startY);
        line.setAttribute('x2', endX);
        line.setAttribute('y2', endY);
        line.setAttribute('stroke', 'blue');
        line.setAttribute('stroke-width', '2');
        svg.appendChild(line);
      }
    });
  }, [koneksi]);

  return (
    <div className="p-4 relative">
      <h1 className="text-2xl font-bold text-center mb-4">Belajar Huruf</h1>
      <div className="relative">
        <svg ref={svgRef} className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"></svg>
        <div className="grid grid-cols-2 gap-10 justify-center z-10 relative">
          <div>
            <h2 className="font-semibold mb-2 text-center">Huruf Besar</h2>
            {huruf.map((h) => (
              <div
                key={h}
                ref={(el) => (hurufRefs.current[h] = el)}
                onClick={() => handleSelectHuruf(h)}
                className={`p-2 border mb-2 bg-white cursor-pointer text-center ${selectedHuruf === h ? 'bg-blue-100 border-blue-400' : ''}`}
              >
                {h}
              </div>
            ))}
          </div>
          <div>
            <h2 className="font-semibold mb-2 text-center">Huruf Kecil</h2>
            {ejaan.map((e) => (
              <div
                key={e}
                ref={(el) => (ejaanRefs.current[e] = el)}
                onClick={() => handleSelectEjaan(e)}
                className={`p-2 border mb-2 bg-white cursor-pointer text-center ${selectedEjaan === e ? 'bg-green-100 border-green-400' : ''}`}
              >
                {e}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-700 text-center">
        <p>Garis terkoneksi:</p>
        <ul className="inline-block text-left">
          {koneksi.map((k, i) => (
            <li key={i}>{k.h} - {k.e}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4 text-center">
        <Button label="Kirim" onClick={handleKirim} />
        {submitted && (
          <div className="mt-4 text-center text-sm text-gray-700">
            <p className="text-green-600 font-semibold">Jawaban dikirim!</p>
            <p>Benar: {hasil.benar}, Salah: {hasil.salah}, Skor: {hasil.skor}</p>
            <Button
              label="Kembali ke Halaman Utama"
              onClick={() => navigate('/')}
              className="mt-2"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BelajarHuruf;
