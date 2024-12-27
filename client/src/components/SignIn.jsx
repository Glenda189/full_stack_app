// sign in form for users to sign in 
import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const SignIn = () => {
    const { signIn } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const user = await signIn(emailAddress, password);
          if (user) {
          console.log("Sign-in successful:", user);
          navigate( location.state?.from|| "/")// Redirect to homepage or page user clicked 

        } else {
          setErrors(["Sign-in was unsuccessful. Please check your credentials."]);
        }
        } catch (error) {
          console.error("Error during sign-in:", error);
          navigate("/error"); // Redirect to error page
    }
  };

  // Mock up example as provided 
    return (
      <div className="form--centered">
      <h2>Sign In</h2>
      {errors.length > 0 && (
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
      <label htmlFor="emailAddress">Email Address</label>
      <input
          id="emailAddress"
          name="emailAddress"
          type="email"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />

       <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

       <button className="button" type="submit">
          Sign In
        </button>

        <button
          className="button button-secondary"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </form>
      <p>
     Need a user account? <a href="/signup">Sign up here</a>!
      </p>
    </div>
  );
};

export default SignIn;
