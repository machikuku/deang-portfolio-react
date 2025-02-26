// Navbar.jsx (in src/components/)
import React from "react";
import "../styles/Navbar.css"; // Adjust path if needed

const Navbar = ({ isScrolled }) => {
  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <ul>
        <li>
          <a href="#hero">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#projects">Projects</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;