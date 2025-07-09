import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GameContext } from '../GameContext';

function Navbar() {
  const { username } = useContext(GameContext);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center fixed top-0 w-full z-10 shadow-md">
      <div className="font-bold text-xl">Berseri</div>
      <div className="text-sm md:text-base">
        {username ? `Halo, ${username}` : 'Belajar Seru di sini'}
      </div>
      <Link to="/pengaturan" className="ml-4 underline hover:text-gray-300">
        Pengaturan
      </Link>
    </nav>
  );
}

export default Navbar;
