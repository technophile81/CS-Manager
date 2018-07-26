import React from "react"
import { Link } from "react-router-dom";


class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar">
                <Link to="/profile">Profile</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/shopping">Shopping</Link>
            </nav>
        )
    }
}

export default NavBar;
