// Redirects to this component when api returns a 500 

import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className="wrap">
            <h2>Error</h2>
            <p>Sorry, an unexpected error has occurred.</p>
            <Link to='/' className="button"> Return to Home
            </Link>
        </div>
    );
};

export default Error;