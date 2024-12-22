import {useContext} from 'react';
import { UserContext } from "../context/UserContext";

function Header() {
  const { authUser, signOut } = useContext(UserContext);

  const handleSignOut = (e) => {
    e.preventDefault();
    signOut();
  };
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo"><a href="/">Courses</a></h1>
        <nav>
        {authUser ? (
        <ul className="header--signedin">
           <li>Welcome, {authUser.firstName} {authUser.lastName}!</li>
           <li><a href="/signout" onClick={handleSignOut}>Sign Out</a></li>
           </ul>
      ) : (
        <ul className="header--signedout">
          <li><a href="/signup">Sign Up</a></li>
          <li><a href="/signin">Sign In</a></li>
          </ul>
             )}
        </nav>
        </div>
    </header>
  );
};

export default Header;