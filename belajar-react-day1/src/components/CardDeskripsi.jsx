import React from 'react';

function CardDeskripsi() {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      textAlign: 'center'
    }}>
      <h2 style={{ color: '#2563eb' }}>Tentang Website Ini</h2>
      <p>
        Website ini membantu anak-anak belajar huruf, angka, dan warna dengan cara yang menyenangkan.
        Didesain khusus untuk anak di bawah 10 tahun!
      </p>
    </div>
  );
}

export default CardDeskripsi;
