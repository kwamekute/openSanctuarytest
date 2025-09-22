import { createContext, useContext, useState, useEffect } from 'react';

// Create context
const AuthContext = createContext();

// Hook so components can easily use it
export const useAuth = () => useContext(AuthContext);

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // On first mount, ask the backend who we are
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/me', {
          credentials: 'include', // include session cookies
        });
        const data = await res.json();
        if (data.success && data.account) {
          setUser({ account: data.account, organization: data.organization });
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Auth check failed', err);
        setUser(null);
      }
    };

    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
