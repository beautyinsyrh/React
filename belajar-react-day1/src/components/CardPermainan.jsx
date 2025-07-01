import React from 'react';

function CardPermainan({ title, color }) {
  return (
    <div
      style={{
        backgroundColor: color,
        padding: '16px',
        borderRadius: '10px',
        textAlign: 'center',
        boxShadow: '0 0 6px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'transform 0.2s',
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <h3 style={{ margin: 0 }}>{title}</h3>
      <p style={{ fontSize: '14px', color: '#333' }}>Klik untuk mulai</p>
    </div>
  );
}

export default CardPermainan;
