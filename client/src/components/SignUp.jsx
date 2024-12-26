// Form for users to create account also sends user det to api and auto signs users 
import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const { signIn } = useContext(UserContext); // Access signIn function from context
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errors, setErrors] = useState([]); // State to manage validation errors
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to the API to create a new user
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          emailAddress: userEmail,
          password: userPassword,
        }),
      });

      if (response.status === 201) {
        // Automatically sign in the user after successful registration
        const user = await signIn(userEmail, userPassword);
        if (user) {
          navigate("/"); // Redirect to the home page
        }
      } else if (response.status === 400) {
        // Handle validation errors from the API
        const data = await response.json();
        setErrors(data.errors); // Update errors state with validation messages
      } else if (response.status === 500) {
        // Redirect to the error page for unexpected issues
        navigate("/error"); 
      }
      else {
        throw new Error("Sign Up failed."); // Unexpected errors
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      navigate("/error"); // Redirect to the error page
    }
  };

  // Navigate to the home page if the user cancels the form
  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };


    // Mockup example as provided 
    return (
        <div className="form--centered">
        <h2>Sign Up</h2>

        {/* Display validation errors if any */}
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
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="emailAddress">Email Address</label>
        <input
          id="emailAddress"
          name="emailAddress"
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <button className="button" type="submit">
          Sign Up
        </button>
        <button
          className="button button-secondary"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
      <p>
        Already have a user account? <a href="/signin">Sign In</a>!
      </p>
    </div>
  );
}

export default SignUp;










    