// Handles 404 not found 

import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="wrap">
            <h2>Not Found</h2>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to='/' className="button"> Return to Home
            </Link>
        </div>
    );
};

export default NotFound