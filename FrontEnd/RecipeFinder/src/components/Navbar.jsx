import { Link } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";

function Navbar() {

    return (
        <nav className="navbar">

            <div className="logo">
                <FaUtensils /> Recipe Finder
            </div>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/favorites">Favorites</Link>
            </div>

        </nav>
    );
}

export default Navbar;
