"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import RotatingText from "../js/RotatingText"

const Hero = () => {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Delay the loaded state to slow down the animation on reload
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  // Canvas particle animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
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

    // Blurred teal blob class
    class BlurredBlob {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 300 + 200
        this.speedX = (Math.random() - 0.5) * 0.3
        this.speedY = (Math.random() - 0.5) * 0.3
        this.opacity = Math.random() * 0.08 + 0.02
        this.color = "rgba(20, 184, 166, " + this.opacity + ")"
        this.pulseSpeed = Math.random() * 0.002 + 0.001
        this.pulseOffset = Math.random() * Math.PI * 2
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.001
      }

      update(time) {
        // Move the blob
        this.x += this.speedX
        this.y += this.speedY

        // Bounce off edges
        if (this.x < -this.size / 2) this.speedX = Math.abs(this.speedX)
        if (this.x > canvas.width + this.size / 2) this.speedX = -Math.abs(this.speedX)
        if (this.y < -this.size / 2) this.speedY = Math.abs(this.speedY)
        if (this.y > canvas.height + this.size / 2) this.speedY = -Math.abs(this.speedY)

        // Pulse size
        this.currentSize = this.size * (0.9 + 0.2 * Math.sin(time * this.pulseSpeed + this.pulseOffset))

        // Rotate
        this.rotation += this.rotationSpeed
      }

      draw(ctx) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)

        // Create gradient for blob
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.currentSize / 2)
        gradient.addColorStop(0, this.color)
        gradient.addColorStop(1, "rgba(20, 184, 166, 0)")

        // Draw blob
        ctx.beginPath()
        ctx.fillStyle = gradient

        // Draw an ellipse shape
        ctx.ellipse(0, 0, this.currentSize / 2, this.currentSize / 1.5, 0, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      }
    }

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.color = `rgba(20, 184, 166, ${Math.random() * 0.5 + 0.2})`
        this.alpha = Math.random() * 0.5 + 0.2
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x < 0 || this.x > canvas.width) {
          this.speedX = -this.speedX
        }

        if (this.y < 0 || this.y > canvas.height) {
          this.speedY = -this.speedY
        }
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    // Create blurred blobs
    const blobCount = window.innerWidth < 768 ? 3 : 5
    const blobs = []

    for (let i = 0; i < blobCount; i++) {
      blobs.push(new BlurredBlob())
    }

    // Create particles
    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? 30 : 80
    const particles = []

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Draw connections between particles
    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(20, 184, 166, ${0.1 * (1 - distance / 150)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    const startTime = Date.now()

    function animate() {
      const currentTime = Date.now() - startTime
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "rgba(18, 18, 22, 1)")
      gradient.addColorStop(0.5, "rgba(22, 30, 35, 1)")
      gradient.addColorStop(1, "rgba(18, 18, 22, 1)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Apply blur for the blobs
      ctx.filter = "blur(80px)"

      // Draw blurred teal blobs
      blobs.forEach((blob) => {
        blob.update(currentTime)
        blob.draw(ctx)
      })

      // Reset filter for particles
      ctx.filter = "none"

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      drawConnections()

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
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

  // Text shadow styles
  const nameTextShadowStyle = {
    textShadow: "0 0 15px rgba(20, 184, 166, 0.3), 0 0 30px rgba(20, 184, 166, 0.15), 0 0 5px rgba(255, 255, 255, 0.1)",
  }

  const rotatingTextStyle = {
    fontFamily: "Neiko, sans-serif",
    textShadow: "0 0 10px rgba(20, 184, 166, 0.4), 0 0 20px rgba(20, 184, 166, 0.2)",
  }

  return (
    <div className="scroll-snap-container">
      <div className="relative w-full" style={{ height: "100vh" }}>
        {/* Background Canvas Animation */}
        <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" />

        {/* Hero Content - Added top padding for navbar */}
        <div
          ref={containerRef}
          className="sticky top-0 flex items-center justify-center min-h-screen w-full z-10 pt-24" // Increased padding-top to make room for navbar
        >
          <div className="container mx-auto px-4 sm:px-6 z-10 relative">
            <motion.div
              className="flex flex-col items-center justify-center text-center"
              variants={containerVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
            >
              {/* Name - Adjusted to always display on one line */}
              <motion.div variants={itemVariants}>
                <h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight sm:tracking-wide uppercase font-azonix whitespace-nowrap overflow-hidden"
                  style={nameTextShadowStyle}
                >
                  <span className="relative inline-block">
                    <span className="text-white">MARKU JHIROU DEANG</span>
                    <motion.span
                      className="absolute bottom-0 left-0 h-[2px] bg-teal-500/50"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 1.2, duration: 2 }}
                    />
                  </span>
                </h1>
              </motion.div>

              {/* Spacer div */}
              <div className="h-[5vh]"></div>

              {/* Rotating Text for Role - Updated font with text shadow */}
              <motion.div className="mb-10" variants={itemVariants}>
                <div className="relative flex justify-center items-center">
                  <div className="inline-block bg-teal-500/10 backdrop-blur-sm border border-teal-500/20 rounded-lg px-6 py-3 min-w-[200px]">
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
                      mainClassName="rotating-text text-teal-400 overflow-hidden justify-center text-2xl sm:text-3xl md:text-4xl font-medium"
                      staggerFrom="first"
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-85%", opacity: 0 }}
                      staggerDuration={0.025}
                      splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                      transition={{ type: "spring", damping: 30, stiffness: 400 }}
                      rotationInterval={3500}
                      style={rotatingTextStyle}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Gradient overlay at the bottom for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-transparent to-[#121416]" />
      </div>
    </div>
  )
}

export default Hero
