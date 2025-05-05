"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const RotatingText = ({
  texts = [],
  mainClassName = "",
  splitLevelClassName = "",
  staggerFrom = "first",
  initial = { y: "100%" },
  animate = { y: "0%" },
  exit = { y: "-100%" },
  transition = { duration: 0.5 },
  staggerDuration = 0.05,
  rotationInterval = 3000,
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  useEffect(() => {
    // Simple interval to rotate through texts
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
    }, rotationInterval)

    return () => clearInterval(interval)
  }, [texts.length, rotationInterval])

  const currentText = texts[currentTextIndex]
  const letters = currentText.split("")

  return (
    <div className={`flex justify-center ${mainClassName}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTextIndex}
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {letters.map((letter, index) => {
            const delay =
              staggerFrom === "first" ? index * staggerDuration : (letters.length - index - 1) * staggerDuration

            return (
              <div key={`${index}-${letter}`} className={splitLevelClassName}>
                <motion.div
                  initial={initial}
                  animate={animate}
                  exit={exit}
                  transition={{
                    ...transition,
                    delay,
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
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
