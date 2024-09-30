import React, { createContext, useContext, useState } from 'react';

interface ApiContextProps {
  username?: string;
  password?: string;
  token?: string;
  setCredentials: (username?: string, password?: string) => void;
  setUserToken: (token?: string) => void;
  clearCredentials: () => void;
}

const ApiContext = createContext<ApiContextProps | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);

  const setCredentials = (username?: string, password?: string) => {
    setUsername(username);
    setPassword(password);
  };

  const setUserToken = (token?: string) => {
    setToken(token);
  };

  const clearCredentials = () => {
    setToken(undefined);
  };

  return (
    <ApiContext.Provider value={{ username, password, token, setCredentials, setUserToken, clearCredentials }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApiContext = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApiContext must be used within an ApiProvider');
  }
  return context;
};
