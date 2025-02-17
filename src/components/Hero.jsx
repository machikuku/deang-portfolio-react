import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for proper routing
import '../styles/Hero.css'; // Ensure the correct path to your CSS file

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Our Hero Page!</h1>
        <p className="hero-description">
          This is a simple, responsive Hero page layout built with React.
        </p>
        <NavLink to="/About" className="cta-button">
          Learn More
        </NavLink>
      </div>
      <div className="hero-footer">
        <h3>Explore More About Us</h3>
        <p>Learn more about our mission, vision, and team below.</p>
      </div>
    </div>
  );
};

export default Hero;
