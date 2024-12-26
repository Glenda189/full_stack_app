import { Navigate, useLocation} from "react-router-dom";
import { useContext } from "react";
import PropTypes from "prop-types";
import UserContext from "../context/UserContext";

const PrivateRoute = ({ children }) => {
    const { authUser } = useContext(UserContext);
    const location = useLocation();
  
    // console.log("Current authUser in PrivateRoute:", authUser); // Debugging log
  
    if (!authUser) {
      return (
        <Navigate to="/signin" 
        state={{ from: location}} 
        replace
      />
      );
    }
  
    return children;
  };
  
  PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
  export default PrivateRoute;
  
