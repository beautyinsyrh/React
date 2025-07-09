import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [selectedGame, setSelectedGame] = useState('');

  return (
    <GameContext.Provider value={{ username, setUsername, selectedGame, setSelectedGame }}>
      {children}
    </GameContext.Provider>
  );
};
