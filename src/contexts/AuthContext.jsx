import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../hooks/useAuth';
import { authFetch } from '../utilities/authFetch';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authFetch('http://localhost:3000/auth/verify', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Valid token') {
          setUser(data.user);
          localStorage.setItem('jwtToken', data.token);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error verifying user:', error);
        setIsLoading(false);
        localStorage.removeItem('jwtToken');
      });
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jwtToken');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
