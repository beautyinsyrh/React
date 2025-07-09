import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/UI/Navbar';
import Footer from './components/UI/Footer';
import Header from './components/UI/Header';
import Tentang from './pages/Tentang';
import Home from './pages/Home';
import BelajarHuruf from './pages/games/BelajarHuruf';
import BelajarAngka from './pages/games/BelajarAngka';
import TebakWarna from './pages/games/TebakWarna';
import Puzzle from './pages/games/Puzzle';
import Mewarnai from './pages/games/Mewarnai';
import Origami from './pages/games/Origami';
import { GameProvider } from './components/GameContext';
import Pengaturan from './pages/Pengaturan';

function App() {
  return (
    <GameProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="pt-20 px-4 flex-1">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/game/belajar-huruf" element={<BelajarHuruf />} />
              <Route path="/game/belajar-angka" element={<BelajarAngka />} />
              <Route path="/game/tebak-warna" element={<TebakWarna />} />
              <Route path="/game/puzzle" element={<Puzzle />} />
              <Route path="/game/mewarnai" element={<Mewarnai />} />
              <Route path="/game/origami" element={<Origami />} />
              <Route path="/pengaturan" element={<Pengaturan />} /> 
            </Routes>

          </div>
          <Footer />
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;