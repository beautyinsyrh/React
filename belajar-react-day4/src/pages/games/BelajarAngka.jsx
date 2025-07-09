import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import api from '../../api/api'; // Ganti axios langsung
import { GameContext } from '../../components/GameContext';

const BelajarAngka = () => {
  const angka = ['1', '2', '3'];
  const nama = ['satu', 'dua', 'tiga'];

  const [selectedAngka, setSelectedAngka] = useState(null);
  const [selectedNama, setSelectedNama] = useState(null);
  const [koneksi, setKoneksi] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [hasil, setHasil] = useState({ benar: 0, salah: 0, skor: 0 });

  const angkaRefs = useRef({});
  const namaRefs = useRef({});
  const svgRef = useRef(null);
  const navigate = useNavigate();
  const { username } = useContext(GameContext);

  const handleSelectAngka = (a) => {
    setSelectedAngka(a);
    if (selectedNama) {
      setKoneksi((prev) => [...prev, { a, n: selectedNama }]);
      setSelectedAngka(null);
      setSelectedNama(null);
    }
  };

  const handleSelectNama = (n) => {
    setSelectedNama(n);
    if (selectedAngka) {
      setKoneksi((prev) => [...prev, { a: selectedAngka, n }]);
      setSelectedAngka(null);
      setSelectedNama(null);
    }
  };

  const handleKirim = async () => {
    const jawabanBenar = { '1': 'satu', '2': 'dua', '3': 'tiga' };

    let benar = 0;
    koneksi.forEach(({ a, n }) => {
      if (jawabanBenar[a] === n) benar++;
    });

    const salah = koneksi.length - benar;
    const skor = benar * 50;

    setHasil({ benar, salah, skor });
    setSubmitted(true);

    // Simpan skor hanya jika username tersedia
    if (!username) {
      alert('Nama pengguna tidak ditemukan. Silakan kembali ke halaman utama dan masukkan nama.');
      return;
    }

    try {
      await api.post('/skor', {
        nama: username,
        permainan: 'Belajar Angka',
        skor,
      });
      console.log('✅ Skor berhasil disimpan');
    } catch (error) {
      console.error('❌ Gagal menyimpan skor:', error.message);
      alert('Gagal menyimpan skor. Pastikan backend berjalan.');
    }
  };

  useEffect(() => {
    const svg = svgRef.current;
    svg.innerHTML = '';

    koneksi.forEach(({ a, n }) => {
      const angkaEl = angkaRefs.current[a];
      const namaEl = namaRefs.current[n];
      const containerBox = svg.parentElement.getBoundingClientRect();

      if (angkaEl && namaEl) {
        const angkaBox = angkaEl.getBoundingClientRect();
        const namaBox = namaEl.getBoundingClientRect();

        const startX = angkaBox.right - containerBox.left;
        const startY = angkaBox.top + angkaBox.height / 2 - containerBox.top;

        const endX = namaBox.left - containerBox.left;
        const endY = namaBox.top + namaBox.height / 2 - containerBox.top;

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
      <h1 className="text-2xl font-bold text-center mb-4">Belajar Angka</h1>
      <div className="relative">
        <svg ref={svgRef} className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"></svg>
        <div className="grid grid-cols-2 gap-10 justify-center z-10 relative">
          <div>
            <h2 className="font-semibold mb-2 text-center">Angka</h2>
            {angka.map((a) => (
              <div
                key={a}
                ref={(el) => (angkaRefs.current[a] = el)}
                onClick={() => handleSelectAngka(a)}
                className={`p-2 border mb-2 bg-white cursor-pointer text-center ${
                  selectedAngka === a ? 'bg-blue-100 border-blue-400' : ''
                }`}
              >
                {a}
              </div>
            ))}
          </div>
          <div>
            <h2 className="font-semibold mb-2 text-center">Nama</h2>
            {nama.map((n) => (
              <div
                key={n}
                ref={(el) => (namaRefs.current[n] = el)}
                onClick={() => handleSelectNama(n)}
                className={`p-2 border mb-2 bg-white cursor-pointer text-center ${
                  selectedNama === n ? 'bg-green-100 border-green-400' : ''
                }`}
              >
                {n}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-700 text-center">
        <p>Garis terkoneksi:</p>
        <ul className="inline-block text-left">
          {koneksi.map((k, i) => (
            <li key={i}>{k.a} - {k.n}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4 text-center">
        <Button label="Kirim" onClick={handleKirim} />
        {submitted && (
          <div className="mt-4 text-sm text-gray-700 text-center">
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

export default BelajarAngka;
