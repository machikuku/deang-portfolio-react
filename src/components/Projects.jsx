// Projects.jsx (place in src/components/)
import React from "react";
import '../styles/projects.css';
import { FaCode } from 'react-icons/fa'; // Single icon for "On Going Development"

const Projects = () => {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-content">
        <h1 className="projects-title">
          <FaCode />Project Section Is On Going Development
        </h1>
      </div>
    </section>
  );
};

export default Projects;