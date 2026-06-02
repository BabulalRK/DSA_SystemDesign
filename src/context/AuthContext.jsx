import React, { createContext, useContext, useState, useEffect } from 'react';
import { SignJWT, jwtVerify } from 'jose';
import credentials from '../data/credentials.json';

const AuthContext = createContext(null);
const SECRET_KEY = new TextEncoder().encode('my-super-secret-dummy-key-for-client-side-auth');

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('jwt_token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }
      try {
        await jwtVerify(token, SECRET_KEY);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Invalid token', error);
        setIsAuthenticated(false);
        localStorage.removeItem('jwt_token');
        setToken(null);
      }
      setIsLoading(false);
    };

    verifyToken();
  }, [token]);

  const login = async (email, password) => {
    if (email === credentials.email && password === credentials.password) {
      const jwt = await new SignJWT({ email })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(SECRET_KEY);
      
      localStorage.setItem('jwt_token', jwt);
      setToken(jwt);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
