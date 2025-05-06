"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Calendar, ArrowRight, FileText, Briefcase, Github } from "lucide-react"
// Removed BackgroundEffect import

const Projects = () => {
  const [activeTab, setActiveTab] = useState("projects")
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [projectData, setProjectData] = useState([
    {
      title: "SCIENTIFIC CALCULATOR",
      description:
        "A fully functional scientific calculator built with JavaScript, capable of performing complex mathematical operations.",
      imageUrl: "/images/calcu.png",
      link: "https://scientificcalalculator.netlify.app/",
      githubLink: "https://github.com/machikuku/Scientific_Calculator.git",
      technologies: ["React", "JavaScript", "CSS"],
    },
    {
      title: "POKEMON API BATTLE",
      description:
        "A fun web app that uses the Pokemon API to fetch data about Pokimane's live streams and viewer interactions, allowing users to battle each other using Pokimane's data.",
      imageUrl: "/images/pokemon.jpg",
      githubLink: "https://github.com/machikuku/FinalSE.git",
      technologies: ["React", "Node.js", "CSS", "API Integration"],
    },
    {
      title: "CCS-IT DEPARTMENT PORTAL",
      description:
        "The CCS-IT Department Portal used by faculty, students, alumni, " +
        "and the broader community. It's designed to streamline access to resources, updates, " +
        "and opportunities tailored to the needs of each group.",
      imageUrl: "/images/se.png?key=4ro4f",
      // No live link for this project
      githubLink: "https://github.com/machikuku/pokemon-api-battle.git",
      technologies: ["PHP", "CSS", "HTML", "JAVASCRIPT"],
    },
    {
      title: "BETTER BITES",
      description:
        "Better Bites, a Flutter app, uses AI to scan and analyze packaged food ingredients, offering personalized health insights. Backed by reliable sources, it educates users on ingredient impacts, empowering informed dietary choices.",
      imageUrl: "/images/betterbites.jpg?key=hkx90",
      githubLink: "https://github.com/machikuku/Better_Bites.git",
      technologies: ["APK", "Flutter", "Dart", "Python", "Flask", "AI", "SQLITE"],
    },
    {
      title: "RECYCLICK",
      description:
        "RecyClick is an innovative web application designed to facilitate the buying and selling of recyclable materials.",
      imageUrl: "/images/reclick.png?key=hkx90",
      githubLink: "https://github.com/aoivhean/recyclick.git",
      technologies: ["Django", "PHP", "HTML", "CSS", "Javascript"],
    },
    {
      title: "ECOWATT",
      description:
        "Eco Watt is a web application designed to help users estimate their electricity consumption and manage their energy usage more efficiently.",
      imageUrl: "/images/eco.jpg?key=hkx90",
      githubLink: "https://github.com/aoivhean/ecowatt.git",
      technologies: ["PHP", "Machine Learning", "HTML", "CSS", "Javascript"],
    },
  ])

  const handleDescriptionChange = (index, event) => {
    const updatedData = [...projectData]
    updatedData[index].description = event.target.value
    setProjectData(updatedData)
  }

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

  return (
    <div ref={sectionRef} className="min-h-screen bg-[#121416] py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Removed BackgroundEffect component */}

      {/* Background elements */}
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-teal-500/5 blur-3xl rounded-full" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 section-title text-white font-azonix">My Outputs</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">Check out some of my recent work</p>
        </motion.div>

        {/* Blog Section */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mb-16"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <div className="bg-[#16181c] border border-teal-500/20 rounded-lg p-2">
              <FileText className="text-teal-400" size={20} />
            </div>
            <h3 className="text-xl font-bold text-white">Blog</h3>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 30px -15px rgba(20, 184, 166, 0.3)",
              transition: { duration: 0.3 },
            }}
            className="bg-[#16181c]/50 backdrop-blur-sm border border-teal-500/20 rounded-lg overflow-hidden hover:border-teal-500/60 transition-all duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="h-64 md:h-auto bg-[#1e2024] relative overflow-hidden">
                {/* Directly placed image for blog */}
                <img src="/images/ojt.png" alt="Blog Image" className="object-cover w-full h-full" />
              </div>
              <div className="p-6 md:p-8 md:col-span-2">
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar size={14} className="mr-1" />
                    April 7-14, 2025
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">2025 Industry Visit and Education Tour</h3>
                <p className="text-gray-400 mb-6 line-clamp-3">
                  Western Mindanao State University College of Computing Studies proudly introduces the first batch of
                  Information Technology students to experience the Industry Visit and Education Tour in Manila as part
                  of our OJT requirement.
                </p>
                <motion.a
                  href="https://mjdblog.netlify.app/#hero" // Replace with your actual blog article link
                  className="inline-flex items-center text-teal-400 hover:text-teal-300 transition-colors text-sm font-medium group"
                  whileHover={{ x: 5 }}
                >
                  Read Article
                  <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Projects Section */}
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={containerVariants}>
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <div className="bg-[#16181c] border border-teal-500/20 rounded-lg p-2">
              <Briefcase className="text-teal-400" size={20} />
            </div>
            <h3 className="text-xl font-bold text-white">Projects</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectData.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 30px -15px rgba(20, 184, 166, 0.3)",
                  transition: { duration: 0.3 },
                }}
                className="bg-[#16181c]/50 backdrop-blur-sm border border-teal-500/20 rounded-lg overflow-hidden hover:border-teal-500/60 transition-all duration-300"
              >
                <div className="h-48 bg-[#1e2024] relative overflow-hidden">
                  {/* Project image with hover effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={
                        project.imageUrl ||
                        "/placeholder.svg?height=192&width=384&query=" + encodeURIComponent(project.title) ||
                        "/placeholder.svg" ||
                        "/placeholder.svg" ||
                        "/placeholder.svg" ||
                        "/placeholder.svg" ||
                        "/placeholder.svg"
                      }
                      alt={project.title}
                      className="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
                      onError={(e) => {
                        e.target.src =
                          "/placeholder.svg?height=192&width=384&query=" + encodeURIComponent(project.title)
                      }}
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121416] to-transparent opacity-60"></div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>

                  {/* Technology tags */}
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Fixed height description container with ellipsis for overflow */}
                  <div className="h-24 mb-4 overflow-hidden">
                    <p className="text-gray-400 line-clamp-4">{project.description}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    {project.link ? (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-400 hover:text-teal-300 transition-colors text-sm font-medium group flex items-center"
                        whileHover={{ x: 3 }}
                      >
                        <span>View Project</span>
                        <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
                      </motion.a>
                    ) : (
                      <div></div> // Empty div to maintain spacing when no link is present
                    )}

                    {project.githubLink ? (
                      <motion.a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center"
                        whileHover={{ x: 3 }}
                      >
                        <Github size={14} className="mr-1" />
                        <span>GitHub</span>
                      </motion.a>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Projects
