import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null); // Agrega el estado para el token

  const login = (newUsername, newToken) => {
    setUsername(newUsername);
    setToken(newToken); // Guarda el token cuando el usuario inicia sesión
  };

  const logout = () => {
    setUsername(null);
    setToken(null); // Borra el token al cerrar sesión
  };

  return (
    <UserContext.Provider value={{ username, token, login, logout }}> 
      {children}
    </UserContext.Provider>
  );
};
