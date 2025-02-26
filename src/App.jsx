// App.jsx
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About"; 
import Projects from "./components/Projects";
import Contact from "./components/Contact"; 
import "./App.css";

const Sections = () => {
  return (
    <>
      
    </>
  );
};

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const secondSectionTop = window.innerHeight * 1;
      setIsScrolled(scrollPosition >= secondSectionTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app-container">
      <Navbar isScrolled={isScrolled} />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Sections />
    </div>
  );
};

export default App;