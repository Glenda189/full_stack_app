import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  const navigate = useNavigate();

  // Initialize authUser from cookies
  const cookie = Cookies.get("authenticatedUser");
  const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);

  // Sign-in function
  const signIn = async (email, password) => {
    const encodedCredentials = btoa(`${email}:${password}`);
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "GET",
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
      });

      if (response.ok) {
        const user = await response.json();
        user.password = password; // Save password for Authorization header
        setAuthUser(user);
        Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
        return user;
      } else if (response.status === 401) {
        return null;
      } else {
        throw new Error("Sign-in failed.");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      throw error;
    }
  };

  // Sign-out function
  const signOut = () => {
    setAuthUser(null);
    Cookies.remove("authenticatedUser");
    navigate("/");
  };

  useEffect(() => {
    console.log("Current authUser in UserProvider:", authUser);
  }, [authUser]);

  return (
    <UserContext.Provider value={{ authUser, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


// prop-types to satisfy ESLint about children
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
 export default UserProvider;
