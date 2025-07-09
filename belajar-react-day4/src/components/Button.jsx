import React from 'react';

function Button({ label, onClick, type = "button", disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-green-600 text-white px-5 py-2 rounded-md font-bold transition ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
        }`}
    >
      {label}
    </button>
  );
}


export default Button;
