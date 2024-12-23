// Forbidden 403 error/ user does not have access 

import { Link } from "react-router-dom";

const Forbidden = () => {
    return (
        <div className="wrap">
            <h2>Forbidden</h2>
            <p>Sorry, you do not have permission to access this page.</p>
            <Link to="/" className="button">
            Return to Home
            </Link>
        </div>
    );
};

export default Forbidden;