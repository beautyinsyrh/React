import React from 'react';

function Button({ label, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        backgroundColor: '#16a34a',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = '#15803d'}
      onMouseOut={(e) => e.target.style.backgroundColor = '#16a34a'}
    >
      {label}
    </button>
  );
}


export default Button;
