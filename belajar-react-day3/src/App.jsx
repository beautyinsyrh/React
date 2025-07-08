import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import { GameProvider } from './components/GameContext';
import Home from './pages/Home';
import Tentang from './pages/Tentang';
import BelajarHuruf from './pages/games/BelajarHuruf';
import BelajarAngka from './pages/games/BelajarAngka';
import TebakWarna from './pages/games/TebakWarna';
import Puzzle from './pages/games/Puzzle';
import Mewarnai from './pages/games/Mewarnai';
import Origami from './pages/games/Origami';

function App() {
  return (
    <GameProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow max-w-5xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tentang" element={<Tentang />} />
            <Route path="/game/belajar-huruf" element={<BelajarHuruf />} />
            <Route path="/game/belajar-angka" element={<BelajarAngka />} />
            <Route path="/game/tebak-warna" element={<TebakWarna />} />
            <Route path="/game/puzzle" element={<Puzzle />} />
            <Route path="/game/mewarnai" element={<Mewarnai />} />
            <Route path="/game/origami" element={<Origami />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </GameProvider>
  );
}

export default App;
