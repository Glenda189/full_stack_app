// client/src/context/UserProvider.jsx
import{ useState } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';   // npm install js-cookie
import { UserContext } from './UserContext';

// The main component export is default:
function UserProvider({ children }) {
  // 1) Attempt to load a stored user from the cookie at initialization.
  const storedUserJSON = Cookies.get('authenticatedUser');
  const [authUser, setAuthUser] = useState(
    storedUserJSON ? JSON.parse(storedUserJSON) : null
  );

  // signIn uses Basic Auth to fetch /api/users
  const signIn = async (userEmail, userPassword) => {
    const encodedCredentials = btoa(`${userEmail}:${userPassword}`);

    const response = await fetch('http://localhost:5000/api/users', {
      method: 'GET',
      headers: { Authorization: `Basic ${encodedCredentials}` },
    });

    if (response.ok) {
      const user = await response.json();
      // 2) Store the user in state and in a cookie for persistence
      setAuthUser(user);
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
      return user;
    } else if (response.status === 401) {
      // Invalid credentials
      return null;
    } else {
      // Some other error (e.g., 500)
      throw new Error('Sign In failed unexpectedly.');
    }
  };

  // signOut clears the user from React state and removes the cookie
  const signOut = () => {
    setAuthUser(null);
    Cookies.remove('authenticatedUser');
  };

  return (
    <UserContext.Provider value={{ authUser, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
}

// Optional: prop-types to satisfy ESLint about children
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
