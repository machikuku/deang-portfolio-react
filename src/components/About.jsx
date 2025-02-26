import React from "react";
import '../styles/About.css';

const techStack = [
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/npm/devicons@1.8.0/!SVG/javascript.svg" },
  { name: "HTML", logo: "https://cdn.jsdelivr.net/npm/devicons@1.8.0/!SVG/html5.svg" },
  { name: "CSS", logo: "https://cdn.jsdelivr.net/npm/devicons@1.8.0/!SVG/css3.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/npm/devicons@1.8.0/!SVG/react.svg" },
  { name: "PHP", logo: "https://cdn.jsdelivr.net/npm/devicons@1.8.0/!SVG/php.svg" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/npm/devicons@1.8.0/!SVG/python.svg" },
  { name: "Tailwind", logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Bootstrap", logo: "https://cdn.jsdelivr.net/npm/devicons@1.8.0/!SVG/bootstrap.svg" },
];

import markuPhoto from '../images/me.jpg'; 

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-content">
        <p className="introduction">
          <div className="intro-container">
            <div className="intro-image">
              <img src={markuPhoto} alt="Marku Jhirou B. Deang" />
            </div>
            <div className="intro-text">
              I’m <span className="highlight-name">Marku Jhirou B. Deang</span>, a graduating BSIT student passionate about crafting vibrant, intuitive web solutions. With a strong foundation in UI/UX design and front-end development, I specialize in creating interfaces that are not only visually stunning but also deliver seamless user experiences. Beyond front-end, I have a growing curiosity for backend development and continuously explore new tools and techniques to refine my skills. My expertise extends to web design, video editing, photo editing, graphics, and layout design—allowing me to blend creativity with functionality in every project I work on. Driven by innovation and a keen eye for detail, I thrive on bringing ideas to life through clean, responsive, and engaging digital experiences.
            </div>
          </div>
        </p>
        <div className="skills-box">
          <h2>Skills & Expertise</h2>
          <p>
            I bring a versatile toolkit to the table: <strong>Frontend Development</strong>, <strong>UI/UX Design</strong>, <strong>Web Design</strong>, <strong>Photo Editing</strong>, <strong>Video Editing</strong>, <strong>Graphics Design</strong>, and <strong>Layout Design</strong>. 
          </p>
          <div className="tech-stack">
            {techStack.map((tech) => (
              <div key={tech.name} className="tech-item">
                <img src={tech.logo} alt={`${tech.name} logo`} />
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="work-highlight">
          <h2>What I’m Currently Working On</h2>
          <p>
            Right now, I’m pouring my energy into this sleek portfolio to showcase my journey, alongside developing the <em>CCS - IT Portal</em> for software engineering class. I’m also collaborating on our capstone project, <em>Better Bites</em>, and tinkering with various programming side projects to push my limits.
          </p>
        </div>
        <div className="goals-card">
          <h2>Career Goals</h2>
          <p>
            I’m set on graduating with my BSIT degree and leveling up my frontend expertise while diving deeper into backend development. In the next 2-3 years, I’m aiming to earn a commercial pilot license—blending my love for tech with a sky-high ambition!
          </p>
        </div>
        <div className="personal-bubble">
          <h2>A Little Personal Touch</h2>
          <p>
          I’m adaptable, easy to work with, and thrive in any environment—connecting effortlessly with diverse people while managing my time like a pro. I’m drawn to nature, especially hiking and adventure, often seeking the thrill of new trails and breathtaking landscapes. Fun fact: I once trekked through rugged terrain to capture a stunning sunrise for a memorable photo. Beyond coding, I’m skilled in electrical wiring, craftsmanship, plumbing, and fixing electronics or machines—tackling hands-on challenges with the same passion I bring to programming.
          </p>
        </div>
        <div className="cta-button">
          <p>
            Got a project in mind or just want to connect? <a href="#contact">Let’s make something awesome together!</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;