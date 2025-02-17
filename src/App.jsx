import React from 'react';
import './styles/Hero.css'; // Ensure your styles are linked
import './styles/Navbar.css'; // Ensure your styles are linked


// Hero Section (Home)
const Hero = () => {
  return (
    <div className="hero-container" id="home">
      <div className="hero-content">
        <h1 className="hero-title">Hi, I'm Marku Jhirou Deang</h1>
        <p className="hero-description">
          <span className="typing-effect">
            Frontend Developer/UI/UX/Web Design/Layout Design
          </span>
        </p>
        
      </div>
    </div>
  );
};

// About Section
const About = () => {
  return (
    <div id="about" className="about-section">
      <h2 className="animate__fadeInLeft">About Me</h2>
      <p className="animate__fadeIn animate__delay-1s">
        I'm a passionate frontend developer with experience building websites
        and web applications. I specialize in HTML, CSS, JavaScript, and React
        to create engaging and interactive user interfaces.
      </p>
      <ul className="animate__fadeIn animate__delay-2s">
        <li><strong>Skills:</strong> HTML, CSS, JavaScript, React, Node.js</li>
        <li><strong>Hobbies:</strong> Web Design, UI/UX, Photography</li>
      </ul>
    </div>
  );
};

// Projects Section
const Projects = () => {
  return (
    <div id="projects" className="projects-section">
      <h2 className="animate__fadeIn">My Projects</h2>
      <div className="project-cards">
        <div className="project-card animate__zoomIn">
          <h3>Project One</h3>
          <p>A responsive personal website built using React.</p>
          <a href="#">View Project</a>
        </div>
        <div className="project-card animate__zoomIn animate__delay-1s">
          <h3>Project Two</h3>
          <p>An e-commerce website built with React and Node.js.</p>
          <a href="#">View Project</a>
        </div>
        <div className="project-card animate__zoomIn animate__delay-2s">
          <h3>Project Three</h3>
          <p>A portfolio website built with HTML, CSS, and JavaScript.</p>
          <a href="#">View Project</a>
        </div>
      </div>
    </div>
  );
};

// Contact Section
const Contact = () => {
  return (
    <div id="contact" className="contact-section">
      <h2 className="animate__fadeIn">Contact Me</h2>
      <p className="animate__fadeIn animate__delay-1s">Feel free to reach out for collaborations or inquiries.</p>
      <ul className="animate__fadeIn animate__delay-2s">
        <li>Email: frontend.dev@example.com</li>
        <li>LinkedIn: linkedin.com/in/frontenddev</li>
        <li>GitHub: github.com/frontenddev</li>
      </ul>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <ul>
          <li>
            <a href="#home">Home</a>
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

      {/* Hero Component (Home) */}
      <Hero />

      {/* About, Projects, and Contact Sections */}
      <About />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
