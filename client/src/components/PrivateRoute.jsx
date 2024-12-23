import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../context/UserContext";

const PrivateRoute = () => {
    const { authUser } = useContext(UserContext);

    // IF NOT AUTHENTICATED, REDIRECT TO SIGN IN 
    if (!authUser) {
        return <Navigate to="/signin" replace />;
    }

    // RENDER CHILD ROUTE IF AUTHENTICATED 
    return<Outlet />
};

export default PrivateRoute;