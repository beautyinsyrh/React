import React from 'react';
import './style.css';
import Navbar from './components/Navbar';
import Header from './components/Header';
import CardDeskripsi from './components/CardDeskripsi';
import CardPermainan from './components/CardPermainan';
import Button from './components/Button1';
import Footer from './components/Footer';
import { GameProvider } from './components/GameContext';
import { useContext, useEffect, useState } from 'react';
import { GameContext } from './components/GameContext';

function AppContent() {
  const { selectedGame, setSelectedGame, username, setUsername } = useContext(GameContext);
  const [clicked, setClicked] = useState(false);
  const [tempName, setTempName] = useState(username);

  useEffect(() => {
    console.log('📦 Halaman dimuat...');
  }, []);

  const handlePilihGame = (game) => {
    setSelectedGame(game);
    setClicked(true);
  };

  const handleSubmitName = () => {
    setUsername(tempName);
  };

  const gameList = [
    { title: 'Belajar Huruf', color: '#FFCDD2' },
    { title: 'Belajar Angka', color: '#C8E6C9' },
    { title: 'Tebak Warna', color: '#FFF9C4' },
    { title: 'Menyusun Puzzle', color: '#D1C4E9' },
    { title: 'Mewarnai Gambar', color: '#B3E5FC' },
    { title: 'Menyusun Origami', color: '#FFE0B2' }
  ];

  return (
    <div className="main-content">
      <div className="app-container">
        <Header />
        <div className="deskripsi-section">
          <CardDeskripsi />
        </div>
        <div className="nama-anak-form">
          <input
            type="text"
            placeholder="Nama anak"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
          />
          <Button label="Kirim" onClick={handleSubmitName} />
        </div>
        <h2 className="judul-permainan">Pilih Permainan:</h2>
        <div className="grid-permainan">
          {gameList.map((game, index) => (
            <CardPermainan
              key={index}
              title={game.title}
              color={game.color}
              onClick={() => handlePilihGame(game.title)}
            />
          ))}
        </div>
        <div className="tombol-section">
          <Button
            label="Mulai Permainan"
            onClick={() =>
              alert(`Halo ${username || 'Anak Hebat'}, kamu memilih: ${selectedGame || 'belum memilih permainan.'}`)
            }
          />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <div className="page-wrapper">
        <Navbar />
        <AppContent />
        <Footer />
      </div>
    </GameProvider>
  );
}

export default App;
