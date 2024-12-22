import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate} from 'react-router-dom';

function SignIn(){
    const { signIn} = useContext(UserContext);
    const [ userEmail, setUserEmail] = useState('');
    const [ userPassword, setUserPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await signIn(userEmail, userPassword);
        if(user) {
            navigate('/');
        } else {
            alert('Sign In failed. Check your credentials.');
        }
    };
    return (
    <div className="form--centered">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="emailAddress">Email Address</label>
        <input id="emailAddress" type="email" value={userEmail} onChange={e=>setUserEmail(e.target.value)} required />
       
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={userPassword}onChange={e=>setUserPassword(e.target.value)} required />
       
        <button className="button" type="submit">Sign In</button>
        <button className="button button-secondary" onClick={e=>{e.preventDefault(); navigate('/');}}>Cancel</button>
        </form>

        <p> Need a user account? <a href="/signup">Sign Up</a>!</p>
        </div>
    );
};

export default SignIn