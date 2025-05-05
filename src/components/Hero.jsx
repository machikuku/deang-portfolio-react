"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import RotatingText from "../js/RotatingText"

const Hero = () => {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  // Simplified background animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions and handle resize
    const setCanvasDimensions = () => {
      const { innerWidth, innerHeight } = window
      const dpr = window.devicePixelRatio || 1

      canvas.width = innerWidth * dpr
      canvas.height = innerHeight * dpr

      canvas.style.width = `${innerWidth}px`
      canvas.style.height = `${innerHeight}px`

      ctx.scale(dpr, dpr)
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Mouse interaction
    let mouseX = canvas.width / 2
    let mouseY = canvas.height / 2
    let targetMouseX = mouseX
    let targetMouseY = mouseY

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX
      targetMouseY = e.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Define colors
    const colors = {
      primary: "rgba(20, 184, 166, 0.7)", // Teal
      secondary: "rgba(6, 182, 212, 0.6)", // Cyan
      accent: "rgba(16, 185, 129, 0.5)", // Green
    }

    // Simple particle class
    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        // Position
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height

        // Size
        this.size = Math.random() * 4 + 1
        this.originalSize = this.size

        // Speed
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5

        // Color
        const colorKeys = Object.keys(colors)
        this.color = colors[colorKeys[Math.floor(Math.random() * colorKeys.length)]]

        // Opacity
        this.opacity = Math.random() * 0.5 + 0.2

        // Pulse
        this.pulseSpeed = Math.random() * 0.01 + 0.005
        this.pulseOffset = Math.random() * Math.PI * 2
      }

      update(time) {
        // Move
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0

        // Pulse size
        this.size = this.originalSize * (1 + 0.3 * Math.sin(time * this.pulseSpeed + this.pulseOffset))

        // Mouse interaction
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150

        if (distance < maxDistance) {
          const force = 0.2 * (1 - distance / maxDistance)
          this.speedX -= (dx * force) / distance
          this.speedY -= (dy * force) / distance

          // Limit speed
          const speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY)
          if (speed > 2) {
            this.speedX = (this.speedX / speed) * 2
            this.speedY = (this.speedY / speed) * 2
          }
        }
      }

      draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color.replace(/[\d.]+\)$/, this.opacity + ")")
        ctx.fill()
      }
    }

    // Create particles - adjust count based on screen size
    const particleCount = window.innerWidth < 768 ? 40 : window.innerWidth < 1024 ? 60 : 100
    const particles = []
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const startTime = Date.now()

    function animate() {
      const currentTime = (Date.now() - startTime) * 0.001 // Convert to seconds

      // Smooth mouse following
      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background gradient
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.8,
      )
      bgGradient.addColorStop(0, "rgba(15, 23, 42, 1)") // Dark blue
      bgGradient.addColorStop(1, "rgba(10, 15, 30, 1)") // Darker blue

      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw connections between particles
      ctx.globalCompositeOperation = "lighter"
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 100

          if (distance < maxDistance) {
            // Calculate opacity based on distance
            const opacity = 0.1 * (1 - distance / maxDistance)

            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(20, 184, 166, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update(currentTime)
        particle.draw(ctx)
      })

      // Reset composite operation
      ctx.globalCompositeOperation = "source-over"

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
        duration: 0.8,
      },
    },
  }

  // Scroll-based animations
  const handleScroll = () => {
    if (!containerRef.current) return

    const scrollPosition = window.scrollY
    const heroHeight = containerRef.current.offsetHeight
    const scrollProgress = Math.min(scrollPosition / (heroHeight * 0.8), 1)

    // Apply scroll effects manually
    if (containerRef.current) {
      const clipValue = 40 * scrollProgress
      const opacityValue = 1 - scrollProgress
      const scaleValue = 1 - 0.2 * scrollProgress

      containerRef.current.style.clipPath = `inset(${clipValue}% 0% ${clipValue}% 0%)`
      containerRef.current.style.opacity = opacityValue
      containerRef.current.style.transform = `scale(${scaleValue})`
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Reduced text shadow style for the hero title
  const nameTextShadowStyle = {
    textShadow: "0 0 8px rgba(20, 184, 166, 0.3), 0 0 15px rgba(20, 184, 166, 0.2)",
  }

  // Define the texts for rotation
  const rotatingTexts = [
    "Frontend Developer",
    "UI/UX Designer",
    "Web Designer",
    "Photo Editor",
    "Video Editor",
    "Graphics Designer",
    "Layout Designer",
  ]

  return (
    <div className="scroll-snap-container">
      <div className="relative w-full h-screen">
        {/* Background Canvas Animation */}
        <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" />

        {/* Hero Content */}
        <div
          ref={containerRef}
          className="sticky top-0 flex items-center justify-center min-h-screen w-full z-10 pt-16 sm:pt-20 md:pt-24"
        >
          <div className="container mx-auto px-4 sm:px-6 z-10 relative">
            <motion.div
              className="flex flex-col items-center justify-center text-center"
              variants={containerVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
            >
              {/* Name - with responsive text sizes */}
              <motion.div variants={itemVariants} className="w-full overflow-hidden">
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight sm:tracking-wide uppercase font-azonix"
                  style={nameTextShadowStyle}
                >
                  <span className="relative inline-block">
                    <span className="text-white">MARKU JHIROU DEANG</span>
                    <motion.span
                      className="absolute bottom-0 left-0 h-[2px] bg-teal-500/70"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 1.2, duration: 2 }}
                    />
                  </span>
                </h1>
              </motion.div>

              {/* Spacer div - responsive height */}
              <div className="h-4 sm:h-6 md:h-[5vh]"></div>

              {/* Rotating Text for Role - With responsive sizing */}
              <motion.div className="mb-4 sm:mb-6 w-full" variants={itemVariants}>
                <div className="flex justify-center items-center">
                  {/* Dynamic width background container */}
                  <div
                    className="bg-gradient-to-r from-teal-900/30 via-teal-800/40 to-teal-900/30 backdrop-blur-sm border border-teal-500/30 rounded-lg px-4 sm:px-6 py-3 sm:py-4 shadow-lg shadow-teal-500/10 inline-block transition-all duration-300"
                    style={{ minWidth: "240px", maxWidth: "90%" }}
                  >
                    <div className="relative">
                      {/* Decorative elements */}
                      <div className="absolute -top-1 -left-1 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-teal-400/40"></div>
                      <div className="absolute -bottom-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-teal-400/40"></div>

                      <RotatingText
                        texts={rotatingTexts}
                        mainClassName="text-teal-400 justify-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium"
                        splitLevelClassName="overflow-hidden pb-0.5"
                        staggerFrom="first"
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.5 }}
                        staggerDuration={0.03}
                        rotationInterval={3000}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Short description - responsive text and width */}
              <motion.div
                variants={itemVariants}
                className="w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl mx-auto px-2"
              >
                <p className="text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                  Creating exceptional digital experiences through clean code and intuitive design. I specialize in
                  responsive web applications and interactive interfaces that engage users and deliver results.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Gradient overlay at the bottom for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-64 sm:h-96 bg-gradient-to-b from-transparent to-[#121416]" />
      </div>
    </div>
  )
}

export default Hero
