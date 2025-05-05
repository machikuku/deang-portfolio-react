"use client"

import { useEffect, useRef } from "react"

const BackgroundEffect = ({ variant = "default", intensity = "medium", className = "" }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const container = canvas.parentElement
      const { clientWidth, clientHeight } = container
      const dpr = window.devicePixelRatio || 1

      canvas.width = clientWidth * dpr
      canvas.height = clientHeight * dpr

      canvas.style.width = `${clientWidth}px`
      canvas.style.height = `${clientHeight}px`

      ctx.scale(dpr, dpr)
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Determine number of elements based on intensity
    let elementCount
    switch (intensity) {
      case "low":
        elementCount = 20
        break
      case "high":
        elementCount = 80
        break
      case "medium":
      default:
        elementCount = 40
        break
    }

    // Create elements based on variant
    const elements = []

    if (variant === "particles" || variant === "default") {
      // Particle class
      class Particle {
        constructor() {
          this.reset()
        }

        reset() {
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
          this.size = Math.random() * 3 + 1
          this.speedX = (Math.random() - 0.5) * 0.5
          this.speedY = (Math.random() - 0.5) * 0.5
          this.opacity = Math.random() * 0.5 + 0.2

          // Teal color palette with variations
          const hue = 170 + Math.random() * 20 - 10
          const saturation = 70 + Math.random() * 20
          const lightness = 40 + Math.random() * 20
          this.color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${this.opacity})`
        }

        update() {
          this.x += this.speedX
          this.y += this.speedY

          // Wrap around edges
          if (this.x < 0) this.x = canvas.width
          if (this.x > canvas.width) this.x = 0
          if (this.y < 0) this.y = canvas.height
          if (this.y > canvas.height) this.y = 0
        }

        draw() {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fillStyle = this.color
          ctx.fill()
        }
      }

      // Create particles
      for (let i = 0; i < elementCount; i++) {
        elements.push(new Particle())
      }
    } else if (variant === "blobs") {
      // Blob class
      class Blob {
        constructor() {
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
          this.size = Math.random() * 200 + 100
          this.speedX = (Math.random() - 0.5) * 0.2
          this.speedY = (Math.random() - 0.5) * 0.2
          this.opacity = Math.random() * 0.05 + 0.02

          // Teal color palette with variations
          const hue = 170 + Math.random() * 20 - 10
          const saturation = 70 + Math.random() * 20
          const lightness = 40 + Math.random() * 20
          this.color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${this.opacity})`

          this.pulseSpeed = Math.random() * 0.002 + 0.001
          this.pulseOffset = Math.random() * Math.PI * 2
        }

        update(time) {
          this.x += this.speedX
          this.y += this.speedY

          // Bounce off edges
          if (this.x < -this.size / 2) this.speedX = Math.abs(this.speedX)
          if (this.x > canvas.width + this.size / 2) this.speedX = -Math.abs(this.speedX)
          if (this.y < -this.size / 2) this.speedY = Math.abs(this.speedY)
          if (this.y > canvas.height + this.size / 2) this.speedY = -Math.abs(this.speedY)

          // Pulse size
          this.currentSize = this.size * (0.9 + 0.2 * Math.sin(time * this.pulseSpeed + this.pulseOffset))
        }

        draw() {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.currentSize, 0, Math.PI * 2)
          ctx.fillStyle = this.color
          ctx.fill()
        }
      }

      // Create blobs
      for (let i = 0; i < elementCount / 4; i++) {
        elements.push(new Blob())
      }
    } else if (variant === "grid") {
      // Grid point class
      class GridPoint {
        constructor(x, y) {
          this.baseX = x
          this.baseY = y
          this.x = x
          this.y = y
          this.size = Math.random() * 2 + 1
          this.amplitude = Math.random() * 10 + 5
          this.speed = Math.random() * 0.02 + 0.01
          this.offset = Math.random() * Math.PI * 2
          this.opacity = Math.random() * 0.5 + 0.2

          // Teal color palette with variations
          const hue = 170 + Math.random() * 20 - 10
          const saturation = 70 + Math.random() * 20
          const lightness = 40 + Math.random() * 20
          this.color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${this.opacity})`
        }

        update(time) {
          // Wave motion
          this.x = this.baseX + Math.sin(time * this.speed + this.offset) * this.amplitude
          this.y = this.baseY + Math.cos(time * this.speed + this.offset) * this.amplitude
        }

        draw() {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
          ctx.fillStyle = this.color
          ctx.fill()
        }
      }

      // Create grid points
      const gridSize = Math.sqrt(elementCount)
      const cellWidth = canvas.width / gridSize
      const cellHeight = canvas.height / gridSize

      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          const x = i * cellWidth + cellWidth / 2
          const y = j * cellHeight + cellHeight / 2
          elements.push(new GridPoint(x, y))
        }
      }
    }

    // Animation loop
    const startTime = Date.now()

    function animate() {
      const currentTime = (Date.now() - startTime) * 0.001 // Convert to seconds
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw elements
      if (variant === "blobs") {
        ctx.filter = "blur(40px)"
      }

      elements.forEach((element) => {
        if (element.update) {
          if (variant === "blobs" || variant === "grid") {
            element.update(currentTime)
          } else {
            element.update()
          }
        }
        element.draw()
      })

      // Draw connections for particles
      if (variant === "particles" || variant === "default") {
        ctx.filter = "none"
        for (let i = 0; i < elements.length; i++) {
          for (let j = i + 1; j < elements.length; j++) {
            const dx = elements[i].x - elements[j].x
            const dy = elements[i].y - elements[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const maxDistance = 100

            if (distance < maxDistance) {
              ctx.beginPath()
              ctx.strokeStyle = `rgba(20, 184, 166, ${0.1 * (1 - distance / maxDistance)})`
              ctx.lineWidth = 0.5
              ctx.moveTo(elements[i].x, elements[i].y)
              ctx.lineTo(elements[j].x, elements[j].y)
              ctx.stroke()
            }
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [variant, intensity])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: "none" }}
    />
  )
}

export default BackgroundEffect
