"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Award, ChevronLeft, ChevronRight, ExternalLink, FileText } from "lucide-react"
import BackgroundEffect from "./BackgroundEffect"

const Certificates = () => {
  const sectionRef = useRef(null)
  const carouselRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleItems, setVisibleItems] = useState(3)

  // Update visible items based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1)
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2)
      } else {
        setVisibleItems(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Updated certificate data with the provided information
  const certificates = [
    {
      id: 1,
      title: "Getting Started with ReactJS Components",
      issuer: "Sololearn",
      date: "24th April 2025",
      code: "8248756",
      imageUrl: "/images/GettingStarted.jpg?key=mftzz",
      description:
        "Comprehensive course covering React component architecture, props, state management, and component lifecycle methods.",
    },
    {
      id: 2,
      title: "Web Development for Beginners",
      issuer: "Sololearn",
      date: "26th April 2025",
      code: "8255841",
      imageUrl: "/images/Web.jpg?key=7i03i",
      description:
        "Introduction to web development fundamentals, covering HTML, CSS, JavaScript, and responsive design principles.",
    },
    {
      id: 3,
      title: "Introduction to CSS",
      issuer: "Sololearn",
      date: "23rd April 2025",
      code: "8243726",
      imageUrl: "/images/CSS.jpg?key=ein9m",
      description:
        "Comprehensive course on CSS styling, selectors, layout techniques, animations, and responsive design.",
    },
    {
      id: 4,
      title: "Introduction to HTML",
      issuer: "Sololearn",
      date: "3rd May 2025",
      code: "8292446",
      imageUrl: "/images/HTML.jpg?key=0qiuq",
      description:
        "Fundamentals of HTML markup, document structure, semantic elements, and accessibility best practices.",
    },
    {
      id: 5,
      title: "JavaScript for Beginners",
      issuer: "Sololearn",
      date: "3rd May 2025",
      code: "8293580",
      imageUrl: "/images/JavaScript.jpg?key=cuids",
      description:
        "Introduction to JavaScript programming, covering variables, functions, DOM manipulation, and event handling.",
    },
    // The 6th item is a special "See More" card
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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
        stiffness: 100,
        damping: 12,
      },
    },
  }

  // Navigation functions
  const nextCertificate = () => {
    if (currentIndex < certificates.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1)
    }
  }

  const prevCertificate = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1)
    }
  }

  // Calculate if navigation buttons should be disabled
  const isNextDisabled = currentIndex >= certificates.length - visibleItems + 1
  const isPrevDisabled = currentIndex <= 0

  return (
    <div ref={sectionRef} className="min-h-screen bg-[#121416] py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Enhanced Background */}
      <BackgroundEffect variant="particles" intensity="low" />

      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-teal-500/5 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-teal-500/5 blur-3xl rounded-full" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 section-title text-white font-azonix">Certificates</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Professional certifications and achievements that validate my skills and expertise
          </p>
        </motion.div>

        {/* Certificates Carousel Section */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mb-16"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <div className="bg-[#16181c] border border-teal-500/20 rounded-lg p-2">
              <Award className="text-teal-400" size={20} />
            </div>
            <h3 className="text-xl font-bold text-white">Professional Certifications</h3>
          </motion.div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Carousel Track */}
            <div ref={carouselRef} className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out gap-6"
                style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
              >
                {/* Regular Certificate Cards */}
                {certificates.map((certificate) => (
                  <div
                    key={certificate.id}
                    className={`flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-0`}
                    style={{ flex: `0 0 calc(100% / ${visibleItems})` }}
                  >
                    <motion.div
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.03,
                        boxShadow: "0 10px 30px -15px rgba(20, 184, 166, 0.3)",
                        transition: { duration: 0.3 },
                      }}
                      className="bg-[#16181c]/50 backdrop-blur-sm border border-teal-500/20 rounded-lg overflow-hidden hover:border-teal-500/60 transition-all duration-300 h-full flex flex-col"
                    >
                      <div className="h-48 bg-[#1e2024] relative overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                          <img
                            src={
                              certificate.imageUrl ||
                              `/placeholder.svg?height=192&width=384&query=${encodeURIComponent(certificate.title) || "/placeholder.svg"} Certificate`
                            }
                            alt={certificate.title}
                            className="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
                            onError={(e) => {
                              e.target.src = `/placeholder.svg?height=192&width=384&query=${encodeURIComponent(
                                certificate.title,
                              )} Certificate`
                            }}
                          />
                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#121416] to-transparent opacity-60"></div>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-xl font-semibold text-white">{certificate.title}</h3>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-gray-400 text-sm">Issued by {certificate.issuer || "Sololearn"}</p>
                          <span className="text-sm text-teal-400">{certificate.date}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <FileText size={14} className="text-teal-400" />
                          <span className="text-gray-400 text-xs">Certificate code: {certificate.code}</span>
                        </div>
                        <p className="text-gray-400 mb-4 line-clamp-2 flex-grow">{certificate.description}</p>
                        <motion.a
                          href={certificate.link || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-teal-400 hover:text-teal-300 transition-colors text-sm font-medium group mt-auto"
                          whileHover={{ x: 5 }}
                        >
                          View Certificate
                          <ExternalLink size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
                        </motion.a>
                      </div>
                    </motion.div>
                  </div>
                ))}

                {/* "See More" Card as the 6th item */}
                <div
                  className={`flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-0`}
                  style={{ flex: `0 0 calc(100% / ${visibleItems})` }}
                >
                  <motion.div
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 10px 30px -15px rgba(20, 184, 166, 0.3)",
                      transition: { duration: 0.3 },
                    }}
                    className="bg-[#16181c]/50 backdrop-blur-sm border border-teal-500/20 rounded-lg overflow-hidden hover:border-teal-500/60 transition-all duration-300 h-full flex flex-col"
                  >
                    {/* Make this card the same height as the certificate cards */}
                    <div className="h-48 bg-[#1e2024] relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/30 to-[#1e2024] flex items-center justify-center">
                        <div className="bg-teal-500/10 p-4 rounded-full">
                          <Award className="text-teal-400 w-12 h-12" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold text-white mb-3">See More Certificates</h3>
                      <p className="text-gray-400 mb-6 flex-grow">
                        View my complete collection of professional certifications and achievements
                      </p>
                      <motion.a
                        href="https://drive.google.com/drive/folders/1azT-jqwDLsC_ATF_Z0W5QT0hBS56Qgwq?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 font-medium py-2 px-4 rounded-lg transition-colors mt-auto"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View All Certificates
                        <ExternalLink size={16} className="ml-2" />
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevCertificate}
                disabled={isPrevDisabled}
                className={`p-3 rounded-full bg-[#16181c] border border-teal-500/20 text-teal-400 hover:bg-teal-500/10 transition-colors ${
                  isPrevDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-label="Previous certificate"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Pagination Indicators */}
              <div className="flex items-center gap-2">
                {Array.from({ length: certificates.length + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentIndex ? "bg-teal-400 w-6" : "bg-gray-600 hover:bg-gray-500"
                    }`}
                    aria-label={`Go to certificate ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextCertificate}
                disabled={isNextDisabled}
                className={`p-3 rounded-full bg-[#16181c] border border-teal-500/20 text-teal-400 hover:bg-teal-500/10 transition-colors ${
                  isNextDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-label="Next certificate"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Certificates
