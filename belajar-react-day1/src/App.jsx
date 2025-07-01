import React from 'react';
import './style.css';
import Navbar from './components/Navbar';
import Header from './components/Header';
import CardDeskripsi from './components/CardDeskripsi';
import CardPermainan from './components/CardPermainan';
import Button from './components/Button1';
import Footer from './components/Footer';

function App() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="main-content">
        <div className="app-container">
          <Header />
          <div className="deskripsi-section">
            <CardDeskripsi />
          </div>
          <h2 className="judul-permainan">Pilih Permainan:</h2>
          <div className="grid-permainan">
            <CardPermainan title="Belajar Huruf" color="pink" />
            <CardPermainan title="Belajar Angka" color="lightgreen" />
            <CardPermainan title="Tebak Warna" color="khaki" />
            <CardPermainan title="Menyusun Puzzle" color="orange" />
            <CardPermainan title="Mewarnai Gambar" color="#FA8072" />
            <CardPermainan title="Menyusun Origami" color="#9B59B6" />
          </div>
          <div className="tombol-section">
            <Button label="Mulai Semua Permainan" onClick={() => alert("Ayo belajar bersama!")} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default App;
