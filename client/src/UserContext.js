import { createContext, useState } from 'react';
import Cookies from 'js-cookie';


export const UserContext = createContext(null);
export const UserProvider = ({ children }) => {
    const storedUser = Cookies.get('authenticatedUser');
    const [authUser, setAuthUser] = useState(storedUser ? JSON.parse(storedUser) : null);
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);

    const signIn = async (userEmail, userPassword) => {
        const encodedCredentials = btoa(`${userEmail}:${userPassword}`);

        const response = await fetch('http://localhost:5000/api/users', {
            headers: { 'Authorization': `Basic ${encodedCredentials}`}
        });
        if (response.ok) {
            const user = await response.json();
            setAuthUser(user);
            setEmail(userEmail);
            setPassword(userPassword);

            Cookies.set('AuthenticatedUser',JSON.stringify(user), { expires: 1});
            return user;
         } else if (response.status === 401) {
            return null;
        } else {
            throw new Error('Sign in failed unexpectedly.');
        }

    }; 
        const signOut = () => {
            setAuthUser(null);
            setEmail(null);
            setPassword(null);
            Cookies.remove('authenticatedUser');
        };
        return(
            <UserContext.Provider value={{
                authUser,
                email,
                password,
                actions: {signIn, signOut}
            }}> 
            {children}
            </UserContext.Provider>
        )
}