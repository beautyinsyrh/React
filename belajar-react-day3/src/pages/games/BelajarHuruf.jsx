import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const BelajarHuruf = () => {
  const hurufBesar = ['A', 'B', 'C'];
  const hurufKecil = ['a', 'b', 'c'];

  const [selected, setSelected] = useState(null);
  const [garis, setGaris] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const besarRefs = useRef({});
  const kecilRefs = useRef({});
  const svgRef = useRef(null);

  const handlePilihKecil = (kecil) => {
    if (selected) {
      setGaris((prev) => [...prev, { besar: selected, kecil }]);
      setSelected(null);
    }
  };

  const handleKirim = () => {
    setSubmitted(true);
    setTimeout(() => navigate('/'), 1500);
  };

  useEffect(() => {
    const svg = svgRef.current;
    svg.innerHTML = '';

    garis.forEach(({ besar, kecil }) => {
      const elBesar = besarRefs.current[besar];
      const elKecil = kecilRefs.current[kecil];
      const containerBox = svg.parentElement.getBoundingClientRect();

      if (elBesar && elKecil) {
        const boxBesar = elBesar.getBoundingClientRect();
        const boxKecil = elKecil.getBoundingClientRect();

        const x1 = boxBesar.right - containerBox.left;
        const y1 = boxBesar.top + boxBesar.height / 2 - containerBox.top;

        const x2 = boxKecil.left - containerBox.left;
        const y2 = boxKecil.top + boxKecil.height / 2 - containerBox.top;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', 'blue');
        line.setAttribute('stroke-width', '2');
        svg.appendChild(line);
      }
    });
  }, [garis]);

  return (
    <div className="p-4 relative">
      <h1 className="text-2xl font-bold text-center mb-4">Belajar Huruf</h1>

      <div className="relative">
        <svg ref={svgRef} className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"></svg>

        <div className="grid grid-cols-2 gap-10 justify-center z-10 relative">
          <div>
            <h2 className="font-semibold mb-2 text-center">Huruf Besar</h2>
            {hurufBesar.map((h) => (
              <div
                key={h}
                ref={(el) => (besarRefs.current[h] = el)}
                onClick={() => setSelected(h)}
                className={`p-2 border mb-2 bg-white cursor-pointer text-center ${selected === h ? 'bg-yellow-100 border-yellow-400' : ''}`}
              >
                {h}
              </div>
            ))}
          </div>
          <div>
            <h2 className="font-semibold mb-2 text-center">Huruf Kecil</h2>
            {hurufKecil.map((h) => (
              <div
                key={h}
                ref={(el) => (kecilRefs.current[h] = el)}
                onClick={() => handlePilihKecil(h)}
                className="p-2 border mb-2 bg-white cursor-pointer text-center hover:bg-green-100"
              >
                {h}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-700 text-center">
        <p>Garis terkoneksi:</p>
        <ul className="inline-block text-left">
          {garis.map((g, i) => (
            <li key={i}>{g.besar} - {g.kecil}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4 text-center">
        <Button label="Kirim" onClick={handleKirim} />
        {submitted && (
          <p className="mt-2 text-green-600 font-semibold">Koneksi berhasil dikirim!</p>
        )}
      </div>
    </div>
  );
};

export default BelajarHuruf;
