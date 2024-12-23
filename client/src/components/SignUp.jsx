// Form for users to create account also sends user det to api and auto signs users 


import { useState, useContext} from 'react';
import UserContext from "../context/UserContext";
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const { signIn} = useContext(UserContext);
    const [firstName, setFirstName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const response = await 
        fetch('http://localhost:5000/api/users',{
            method: 'POST',
            headers: {
            'Content-Type':'application/json'},
            body: JSON.stringify({
                firstName,
                lastName,
                emailAddress: userEmail,
                password: userPassword
            })
        });
        if (response.status === 201) {
            const user = await 
            // auto sign in when account is created 
           signIn(userEmail, userPassword); 
            if(user) {
                navigate('/');
            }
        } else if (response.status === 400) {
            const data = await response.json();
            alert(`Validation Errors: ${data.errors.join(',')}`);
        } else {
            alert('Sign Up failed.');
        }
    };


    // Mockup example as provided 
    return (
        <div className="form--centered">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" value={firstName} onChange={e=>setFirstName(e.target.value)} required />

        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" value={lastName} onChange={e=>setLastName(e.target.value)} required />

        <label htmlFor="emailAddress">Email Address</label>
        <input id="emailAddress" type="email"value={userEmail} onChange={e=>setUserEmail(e.target.value)} required />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={userPassword} onChange={e=>setUserPassword(e.target.value)} required />

        <button className="button" type="submit">Sign Up</button>
        <button className="button button-secondary" onClick={e=>{e.preventDefault(); navigate('/');}}>Cancel</button>
        </form>
        <p>Already have a user account? <a href="/signin">Sign In</a>!</p>
        </div>
    )

}

export default SignUp