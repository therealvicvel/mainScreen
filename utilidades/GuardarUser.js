import { createContext, useContext, useState } from 'react';

const UsernameContext = createContext();

export const useUsername = () => {
  return useContext(UsernameContext);
};

export const UsernameProvider = ({ children }) => {
  const [username, setUsername] = useState('');

  const logout = () => {
    setUsername(''); 
  };

  return (
    <UsernameContext.Provider value={{ username, setUsername, logout }}>
      {children}
    </UsernameContext.Provider>
  );
};
