import React from "react";
import { NavLink } from "react-router-dom";
import '../styles/Navbar.css'; // Ensure the correct path to your CSS file

function Navbar() {
    return (
        <nav className="navbar"> {/* Add className="navbar" here */}
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about">About</NavLink>
                </li>
                <li>
                    <NavLink to="/projects">Projects</NavLink>
                </li>
                <li>
                    <NavLink to="/contact">Contact</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
