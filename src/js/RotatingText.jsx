"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const RotatingText = ({
  texts = [], // Array of texts to rotate
  mainClassName = "", // Optional custom class for the wrapper
  splitLevelClassName = "", // Optional class for each letter
  staggerFrom = "first", // Whether the letters should stagger from the first or last
  initial = { y: "100%" }, // Initial animation position for each letter
  animate = { y: "0%" }, // Final position for the letter animation
  exit = { y: "-100%" }, // Exit position when the text changes
  transition = { duration: 0.5 }, // Transition speed for each letter
  staggerDuration = 0.05, // Delay between letters
  rotationInterval = 1500, // Faster interval between text rotations (was 3000)
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  useEffect(() => {
    // Interval is the part that controls the speed of text rotation
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
    }, rotationInterval) // Here you can decrease the interval to make it faster

    return () => clearInterval(interval) // Cleanup on component unmount
  }, [texts.length, rotationInterval]) // Dependencies are texts.length and rotationInterval

  const currentText = texts[currentTextIndex] // Get the current text
  const letters = currentText.split("") // Split the text into individual letters

  return (
    <div className={`flex ${mainClassName}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTextIndex}
          className="flex"
          initial={{ opacity: 0 }} // Fade in effect
          animate={{ opacity: 1 }} // Fade in effect
          exit={{ opacity: 0 }} // Fade out effect
          transition={{ duration: 0.5 }}
        >
          {letters.map((letter, index) => {
            // Delay between letters to stagger the animation
            const delay =
              staggerFrom === "first" ? index * staggerDuration : (letters.length - index - 1) * staggerDuration

            return (
              <div key={`${index}-${letter}`} className={splitLevelClassName}>
                <motion.div
                  initial={initial} // Initial position for each letter
                  animate={animate} // Final position for each letter
                  exit={exit} // Exit position when letter disappears
                  transition={{
                    ...transition, // Use transition settings from props
                    delay, // Apply delay for staggered effect
                  }}
                >
                  {letter === " " ? "\u00A0" : letter} {/* Handle space as a non-breaking space */}
                </motion.div>
              </div>
            )
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default RotatingText
