import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const BelajarAngka = () => {
  const angka = ['1', '2', '3'];
  const ejaan = ['satu', 'dua', 'tiga'];

  const [selectedAngka, setSelectedAngka] = useState(null);
  const [koneksi, setKoneksi] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const angkaRefs = useRef({});
  const ejaanRefs = useRef({});
  const svgRef = useRef(null);

  const handlePilihEjaan = (e) => {
    if (selectedAngka) {
      setKoneksi((prev) => [...prev, { a: selectedAngka, e }]);
      setSelectedAngka(null);
    }
  };

  const handleKirim = () => {
    setSubmitted(true);
    setTimeout(() => navigate('/'), 1500);
  };

  useEffect(() => {
    const svg = svgRef.current;
    svg.innerHTML = '';

    koneksi.forEach(({ a, e }) => {
      const angkaEl = angkaRefs.current[a];
      const ejaanEl = ejaanRefs.current[e];
      const containerBox = svg.parentElement.getBoundingClientRect();

      if (angkaEl && ejaanEl) {
        const angkaBox = angkaEl.getBoundingClientRect();
        const ejaanBox = ejaanEl.getBoundingClientRect();

        const startX = angkaBox.right - containerBox.left;
        const startY = angkaBox.top + angkaBox.height / 2 - containerBox.top;

        const endX = ejaanBox.left - containerBox.left;
        const endY = ejaanBox.top + ejaanBox.height / 2 - containerBox.top;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', startX);
        line.setAttribute('y1', startY);
        line.setAttribute('x2', endX);
        line.setAttribute('y2', endY);
        line.setAttribute('stroke', 'red');
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
                onClick={() => setSelectedAngka(a)}
                className={`p-2 border mb-2 bg-white cursor-pointer text-center ${selectedAngka === a ? 'bg-blue-100 border-blue-400' : ''}`}
              >
                {a}
              </div>
            ))}
          </div>
          <div>
            <h2 className="font-semibold mb-2 text-center">Ejaan</h2>
            {ejaan.map((e) => (
              <div
                key={e}
                ref={(el) => (ejaanRefs.current[e] = el)}
                onClick={() => handlePilihEjaan(e)}
                className="p-2 border mb-2 bg-white cursor-pointer text-center hover:bg-green-100"
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
            <li key={i}>{k.a} - {k.e}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4 text-center">
        <Button label="Kirim" onClick={handleKirim} />
        {submitted && (
          <p className="mt-2 text-green-600 font-semibold mt-2">Koneksi berhasil dikirim!</p>
        )}
      </div>
    </div>
  );
};

export default BelajarAngka;