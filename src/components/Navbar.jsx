"use client"

import React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Home, User, Briefcase, Mail } from "lucide-react"

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("hero")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll to update active section and navbar style
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const aboutSection = document.getElementById("about")
      const heroSection = document.getElementById("hero")

      if (aboutSection && heroSection) {
        // Create a transition zone that starts earlier
        const heroHeight = heroSection.offsetHeight
        const transitionStartPoint = heroHeight * 0.6 // Start transition at 60% of hero height
        const transitionEndPoint = heroHeight * 0.8 // Complete transition at 80% of hero height

        // Calculate transition progress (0 to 1)
        const transitionProgress = Math.max(
          0,
          Math.min(1, (scrollPosition - transitionStartPoint) / (transitionEndPoint - transitionStartPoint)),
        )

        // Set scrolled state based on progress instead of threshold
        setIsScrolled(transitionProgress > 0)
      }

      const sections = ["hero", "about", "projects", "contact"]

      // Find which section is currently in view
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // If the section is in the viewport (with some buffer)
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Navigation items with icons
  const navItems = [
    { section: "hero", icon: <Home size={20} />, label: "Home" },
    { section: "about", icon: <User size={20} />, label: "About" },
    { section: "projects", icon: <Briefcase size={20} />, label: "Outputs" },
    { section: "contact", icon: <Mail size={20} />, label: "Contact" },
  ]

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Main Navbar - Fixed at the top with increased height */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled ? "bg-black/90 backdrop-blur-md shadow-md shadow-black/10" : "bg-transparent"
        }`}
        style={{
          // Apply smooth transition styles
          backgroundColor: isScrolled ? "rgba(0, 0, 0, 0.9)" : "transparent",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          boxShadow: isScrolled ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        <div className="max-w-[1100px] mx-auto px-2 sm:px-5 lg:px-6">
          <div className="flex items-center justify-between h-15 sm:h-20">
            {/* Logo */}
            <a href="#hero" onClick={() => setActiveSection("hero")} className="flex items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <img src="/images/myLogo.png" alt="Logo" className="h-12 w-auto" />
              </motion.div>
            </a>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center">
              <div className="flex space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.section}
                    href={`#${item.section}`}
                    onClick={() => setActiveSection(item.section)}
                    className="relative group px-2 py-2" /* Adjusted padding */
                  >
                    <div
                      className={`flex items-center justify-center transition-all duration-300 ${
                        activeSection === item.section ? "text-teal-400" : "text-white/80 hover:text-white"
                      }`}
                    >
                      {/* Icon - Increased size */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        {React.cloneElement(item.icon, { size: 26 })} {/* Increased icon size */}
                      </motion.div>

                      {/* Tooltip on hover */}
                      <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none bottom-0 left-1/2 -translate-x-1/2 transform translate-y-full">
                        <div className="px-2 py-1 text-xs font-medium text-white bg-black/80 rounded-md whitespace-nowrap mt-1">
                          {item.label}
                        </div>
                      </div>
                    </div>

                    {/* Active indicator - bottom border instead of background */}
                    {activeSection === item.section && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </a>
                ))}
              </div>
            </nav>
            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden w-12 h-12 flex items-center justify-center text-white rounded-md hover:bg-teal-500/10 transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-7 h-7" /* Increased size */
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-md z-40 transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMobileMenu}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <nav className="flex flex-col items-center space-y-8">
            {navItems.map((item) => (
              <a
                key={item.section}
                href={`#${item.section}`}
                onClick={() => {
                  setActiveSection(item.section)
                  setIsMobileMenuOpen(false)
                }}
                className={`flex items-center space-x-3 text-2xl font-medium transition-colors ${
                  activeSection === item.section ? "text-teal-400" : "text-white/80"
                }`}
              >
                <span>{React.cloneElement(item.icon, { size: 28 })}</span> {/* Increased icon size */}
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}

export default Navbar
