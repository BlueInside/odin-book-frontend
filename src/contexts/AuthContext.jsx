import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../hooks/useAuth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/auth/verify', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Valid token') {
          setUser(data.user);
          console.log('User AUTH', data.user);
        } else {
          setUser(null);
        }
      })
      .catch((error) => {
        console.error('Error verifying user:', error);
      });
  }, []);

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
