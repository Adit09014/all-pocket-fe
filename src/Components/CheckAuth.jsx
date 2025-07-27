import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const verifyAuth = async () => {
    try {
      const res = await fetch('https://all-pocket-be.onrender.com/api/auth/verify', {
        method: 'GET',
        credentials: 'include',
      });
      const result = await res.json();
      setIsAuthenticated(res.ok && result.valid); // <-- fixed here
    } catch (err) {
      setIsAuthenticated(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
