import React from 'react';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center fixed top-0 w-full z-10 shadow-md">
      <div className="font-bold text-xl">Berseri</div>
      <div className="text-sm md:text-base">Belajar Seru di sini</div>
    </nav>
  );
}

export default Navbar;
