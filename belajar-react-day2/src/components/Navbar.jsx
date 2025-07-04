import React, { useContext } from 'react';
import { GameContext } from './GameContext';

function Navbar() {
  const { username } = useContext(GameContext);

  return (
    <nav className="navbar">
      <span className="logo">Berseri</span>
      <span className="slogan">Belajar Seru di Sini {username && `- Halo, ${username}`}</span>
    </nav>
  );
}

export default Navbar;
