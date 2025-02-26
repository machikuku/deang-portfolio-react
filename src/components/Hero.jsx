import Squares from "../Squares"; // Adjust path based on Squares.jsx location
import RotatingText from "../js/RotatingText"; // Adjust path based on your structure
import "../styles/Hero.css";

const Hero = () => {
  return (
    <section className="hero-section" id="hero">
      <Squares
        speed={0.5}
        squareSize={40}
        direction="diagonal"
        borderColor="#fff"
        hoverFillColor="white"
        className="squares-bg"
      />
      <div className="hero-content">
        <h1>MARKU JHIROU DEANG</h1>
        <div className="relative w-full flex justify-center items-center">
          <RotatingText
            texts={[
              "Frontend Developer",
              "UI/UX Designer",
              "Web Designer",
              "Photo Editor",
              "Video Editor",
              "Graphics Designer",
              "Layout Designer",
            ]}
            mainClassName="rotating-text px-1 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
            staggerFrom="first"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-85%", opacity: 0 }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
