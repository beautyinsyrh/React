import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export function GameProvider({ children }) {
  const [selectedGame, setSelectedGame] = useState('');
  const [username, setUsername] = useState('');

  return (
    <GameContext.Provider value={{ selectedGame, setSelectedGame, username, setUsername }}>
      {children}
    </GameContext.Provider>
  );
}
