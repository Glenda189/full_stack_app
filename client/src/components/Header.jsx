// displays the header with links to sign in and sign up and sign out 

import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const Header = () => {
  const { authUser, signOut } = useContext(UserContext);

  const handleSignOut = () => {
    console.log("Sign-out clicked");
    signOut();
  };


  // Displays header links based on user auth stat 
  return (
    <header>
    <div className="wrap header--flex">
      <h1 className="header--logo">
        <Link to="/">Courses</Link>
      </h1>
      <nav>
        {authUser ? (
        <ul className="header--signedin">
           <li>Welcome, {authUser.firstName} {authUser.lastName}!</li>
           <li>
           <button onClick={handleSignOut} className="button button-secondary">
                  Sign Out
                </button>
              </li>
            </ul>
      ) : (
        <ul className="header--signedout">
         <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;