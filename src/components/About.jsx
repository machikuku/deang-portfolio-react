"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import {
  User,
  ClipboardCheck,
  Search,
  Palette,
  Monitor,
  ImageIcon,
  Video,
  Layout,
  Database,
  Briefcase,
  Target,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import TechStackItem from "./TechStackItem"
// Removed BackgroundEffect import

// Import tech logos
import ReactLogo from "./tech-logos/ReactLogo"
import HTML5Logo from "./tech-logos/HTML5Logo"
import JavaScriptLogo from "./tech-logos/JavaScriptLogo"
import CSSLogo from "./tech-logos/CSSLogo"
import TailwindLogo from "./tech-logos/TailwindLogo"
import BootstrapLogo from "./tech-logos/BootstrapLogo"
import FigmaLogo from "./tech-logos/FigmaLogo"
import FlutterLogo from "./tech-logos/FlutterLogo"
import PythonLogo from "./tech-logos/PythonLogo"
import PHPLogo from "./tech-logos/PHPLogo"

const About = () => {
  // Rest of the component code remains the same...
  // Refs for scroll animations
  const introRef = useRef(null)
  const skillsRef = useRef(null)
  const experienceRef = useRef(null)
  const sectionRef = useRef(null)
  const experienceScrollRef = useRef(null)

  // State for experience scrolling
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if sections are in view
  const introInView = useInView(introRef, { once: true, amount: 0.3 })
  const skillsInView = useInView(skillsRef, { once: true, amount: 0.3 })
  const experienceInView = useInView(experienceRef, { once: true, amount: 0.3 })

  // Animation controls
  const introControls = useAnimation()
  const skillsControls = useAnimation()
  const experienceControls = useAnimation()

  // Experience data
  const experiences = [
    {
      title: "Frontend Developer & System Analyst",
      company: "AEONFLUX: CCS-IT Department Portal (Software Engineering Project)",
      period: "2022 - Present",
      type: "Full-time",
      description:
        "Develop CCS-IT Department Portal used by faculty, students, alumni, " +
        "and the broader community. It's designed to streamline access to resources, updates, " +
        "and opportunities tailored to the needs of each group. By serving these stakeholders, " +
        "the portal enhances communication, fosters collaboration, and supports the growth of " + 
        "everyone involved in the Department of Information Technology at Western Mindanao State University.",
    },
    {
      title: "Backend Developer",
      company: "AEONFLUX: Better Bites (Capstone Project)",
      period: "2024 - Present",
      type: "Full-time",
      description:
        "Integrated an AI to scan and analyze packaged food ingredients, offering personalized health insights. Backed by reliable sources, it educates users on ingredient impacts, empowering informed dietary choices. ",
    },
  ]

  // Check scroll capability
  const checkScrollability = () => {
    if (experienceScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = experienceScrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10) // 10px buffer
    }
  }

  // Scroll functions
  const scrollLeft = () => {
    if (experienceScrollRef.current) {
      experienceScrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (experienceScrollRef.current) {
      experienceScrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  // Check screen size for mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Trigger animations when sections come into view
  useEffect(() => {
    if (introInView) {
      introControls.start("visible")
    }
    if (skillsInView) {
      skillsControls.start("visible")
    }
    if (experienceInView) {
      experienceControls.start("visible")
    }
  }, [introInView, skillsInView, experienceInView, introControls, skillsControls, experienceControls])

  // Set up scroll event listeners for experience section
  useEffect(() => {
    const scrollContainer = experienceScrollRef.current
    if (scrollContainer) {
      checkScrollability()
      scrollContainer.addEventListener("scroll", checkScrollability)
      window.addEventListener("resize", checkScrollability)

      return () => {
        scrollContainer.removeEventListener("scroll", checkScrollability)
        window.removeEventListener("resize", checkScrollability)
      }
    }
  }, [])

  // Tech stack with actual logos
  const techStack = [
    { name: "React", icon: <ReactLogo className="w-10 h-10 text-[#61DAFB]" /> },
    { name: "HTML5", icon: <HTML5Logo className="w-10 h-10" /> },
    { name: "JavaScript", icon: <JavaScriptLogo className="w-10 h-10" /> },
    { name: "CSS", icon: <CSSLogo className="w-10 h-10" /> },
    { name: "Tailwind", icon: <TailwindLogo className="w-10 h-10" /> },
    { name: "Bootstrap", icon: <BootstrapLogo className="w-10 h-10" /> },
    { name: "Figma", icon: <FigmaLogo className="w-10 h-10" /> },
    { name: "Flutter", icon: <FlutterLogo className="w-10 h-10" /> },
    { name: "Python", icon: <PythonLogo className="w-10 h-10" /> },
    { name: "PHP", icon: <PHPLogo className="w-10 h-10" /> },
  ]

  // Skills categories
  const skillsCategories = [
    {
      category: "Development Tools",
      skills: ["VS Code", "Git", "GitHub", "Postman", "Android Studio"],
      icon: <ClipboardCheck size={16} className="text-teal-400" />,
    },
    {
      category: "Development Design",
      skills: ["Canva", "Figma", "Yed graph"],
      icon: <Palette size={16} className="text-teal-400" />,
    },
    {
      category: "Media & Design",
      skills: [
        "Adobe Photoshop",
        "Adobe Illustrator",
        "Adobe After Effects",
        "Canva",
        "Adobe Premiere Pro",
        "Cupcut Pro",
      ],
      icon: <ImageIcon size={16} className="text-teal-400" />,
    },
    {
      category: "Professional",
      skills: ["System Analysis", "Quality Assurance", "Project Management", "Team Leadership"],
      icon: <ClipboardCheck size={16} className="text-teal-400" />,
    },
  ]

  // What I Do items
  const whatIDo = [
    {
      icon: <Layout size={24} />,
      title: "Web Development",
      description:
        "Building responsive, performant websites and web applications using modern frameworks and best practices.",
    },
    {
      icon: <Search size={24} />,
      title: "System Analysis",
      description:
        "Analyzing system requirements, designing solutions, and ensuring they meet business needs and technical specifications.",
    },
    {
      icon: <ClipboardCheck size={24} />,
      title: "Quality Assurance",
      description:
        "Implementing rigorous testing methodologies to ensure software meets the highest standards of quality and reliability.",
    },
    {
      icon: <Palette size={24} />,
      title: "UI/UX Design",
      description:
        "Creating intuitive, user-centered designs that balance aesthetics with functionality for optimal user experience.",
    },
    {
      icon: <ImageIcon size={24} />,
      title: "Photo Editing",
      description: "Professional photo editing and retouching to enhance visual appeal and create compelling imagery.",
    },
    {
      icon: <Video size={24} />,
      title: "Video Editing",
      description: "Creating engaging video content with professional editing, effects, and motion graphics.",
    },
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

  const fadeInUpVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  }

  return (
    <div ref={sectionRef} className="min-h-screen bg-[#121416] pt-28 pb-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Removed BackgroundEffect component */}

      {/* Background elements */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-teal-500/5 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-teal-500/5 blur-3xl rounded-full" />

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Rest of the component JSX remains the same... */}
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 section-title text-white font-azonix">About Me</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Passionate about creating beautiful, functional digital experiences
          </p>
        </motion.div>

        {/* Introduction Section */}
        <motion.div
          ref={introRef}
          initial="hidden"
          animate={introControls}
          variants={containerVariants}
          className="mb-20"
        >
          {/* Introduction Text - Now full width */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#16181c] border border-teal-500/20 rounded-full px-4 py-1.5">
              <User size={16} className="text-teal-400" />
              <span className="text-sm font-medium text-teal-400">Who I Am</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white">
              I'm <span className="font-azonix text-shadow-sm highlight-text">Marku Jhirou Deang</span>
            </h3>

            <p className="text-gray-300 leading-relaxed">
              I specialize in creating engaging, responsive web experiences with a focus on user-centered design. With a
              passion for clean code and intuitive interfaces, I transform ideas into digital realities that not only
              look great but perform exceptionally.
            </p>

            <p className="text-gray-300 leading-relaxed">
              My approach combines technical expertise with creative problem-solving to deliver solutions that exceed
              expectations. I'm constantly learning and adapting to new technologies to stay at the forefront of web
              development.
            </p>

            <div className="pt-4 flex flex-wrap gap-3">
              {[
                "Frontend Developer",
                "System Analyst",
                "Quality Assurance",
                "UI/UX Design",
                "Graphic Design",
                "Editor",
              ].map((specialty, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-full text-sm"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* What I Do Section */}
        <motion.div
          ref={skillsRef}
          initial="hidden"
          animate={skillsControls}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-2 bg-[#16181c] border border-teal-500/20 rounded-full px-4 py-1.5">
              <Monitor size={16} className="text-teal-400" />
              <span className="text-sm font-medium text-teal-400">What I Do</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatIDo.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-[#16181c]/50 backdrop-blur-sm border border-teal-500/20 rounded-lg p-6 hover:border-teal-500/40 transition-colors"
              >
                <div className="bg-teal-500/10 p-3 rounded-lg w-fit mb-4 text-teal-400">{service.icon}</div>
                <h4 className="text-xl font-semibold text-white mb-3">{service.title}</h4>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience Section - Now Scrollable */}
        <motion.div
          ref={experienceRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="mb-8 flex justify-between items-center">
            <div className="inline-flex items-center gap-2 bg-[#16181c] border border-teal-500/20 rounded-full px-4 py-1.5">
              <Briefcase size={16} className="text-teal-400" />
              <span className="text-sm font-medium text-teal-400">Experience</span>
            </div>

            {/* Scroll Controls - Only show on desktop and if there are more than 2 experiences */}
            {!isMobile && experiences.length > 2 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={scrollLeft}
                  disabled={!canScrollLeft}
                  className={`p-2 rounded-full bg-[#16181c] border border-teal-500/20 text-teal-400 hover:bg-teal-500/10 transition-colors ${
                    !canScrollLeft ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={scrollRight}
                  disabled={!canScrollRight}
                  className={`p-2 rounded-full bg-[#16181c] border border-teal-500/20 text-teal-400 hover:bg-teal-500/10 transition-colors ${
                    !canScrollRight ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  aria-label="Scroll right"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </motion.div>

          {/* Scrollable Experience Container */}
          <div
            ref={experienceScrollRef}
            className={`
              ${experiences.length > 2 ? "overflow-x-auto" : ""}
              scrollbar-thin scrollbar-thumb-teal-500/20 scrollbar-track-transparent
              pb-4 -mx-2 px-2
            `}
            style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(20, 184, 166, 0.2) transparent" }}
          >
            <div
              className={`
              ${experiences.length > 2 ? "flex flex-nowrap gap-6" : "space-y-8"}
              ${isMobile ? "flex-col" : ""}
            `}
            >
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`
                    bg-[#16181c]/50 backdrop-blur-sm border border-teal-500/20 rounded-lg p-6 
                    hover:border-teal-500/40 transition-colors
                    ${experiences.length > 2 && !isMobile ? "flex-shrink-0 w-[calc(100%-1.5rem)]" : ""}
                    ${experiences.length > 2 && !isMobile ? "sm:w-[calc(50%-1rem)]" : ""}
                    ${experiences.length > 2 && !isMobile ? "lg:w-[calc(33.333%-1rem)]" : ""}
                    ${isMobile ? "mb-6" : ""}
                  `}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h4 className="text-xl font-semibold text-white">{exp.title}</h4>
                    <div className="flex items-center gap-2 mt-2 md:mt-0">
                      <span className="text-teal-400 text-sm">{exp.period}</span>
                      <span className="px-2 py-1 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-full text-xs">
                        {exp.type}
                      </span>
                    </div>
                  </div>
                  <h5 className="text-gray-300 mb-3">{exp.company}</h5>
                  <p className="text-gray-400">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scroll Indicators - Mobile Only */}
          {isMobile && experiences.length > 2 && (
            <div className="flex justify-center mt-4 gap-2">
              {experiences.map((_, index) => (
                <div key={index} className={`w-2 h-2 rounded-full ${index === 0 ? "bg-teal-400" : "bg-gray-600"}`} />
              ))}
            </div>
          )}
        </motion.div>

        {/* Tech Stack Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-2 bg-[#16181c] border border-teal-500/20 rounded-full px-4 py-1.5">
              <Database size={16} className="text-teal-400" />
              <span className="text-sm font-medium text-teal-400">Tech Stack</span>
            </div>
          </motion.div>

          <div className="tech-stack-container">
            <div className="tech-stack-scroll">
              {techStack.map((tech, index) => (
                <TechStackItem key={index} icon={tech.icon} name={tech.name} />
              ))}
              {/* Duplicate items for seamless scrolling */}
              {techStack.map((tech, index) => (
                <TechStackItem key={`duplicate-${index}`} icon={tech.icon} name={tech.name} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-2 bg-[#16181c] border border-teal-500/20 rounded-full px-4 py-1.5">
              <Layout size={16} className="text-teal-400" />
              <span className="text-sm font-medium text-teal-400">Skills & Expertise</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillsCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-[#16181c]/50 backdrop-blur-sm border border-teal-500/20 rounded-lg p-6 hover:border-teal-500/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-teal-500/10 p-2 rounded-lg">{category.icon}</div>
                  <h4 className="text-lg font-medium text-white">{category.category}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Career Goals Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="mb-10"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-2 bg-[#16181c] border border-teal-500/20 rounded-full px-4 py-1.5">
              <Target size={16} className="text-teal-400" />
              <span className="text-sm font-medium text-teal-400">Career Goals</span>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-[#16181c]/50 backdrop-blur-sm border border-teal-500/20 rounded-lg p-6 hover:border-teal-500/40 transition-colors"
          >
            <h4 className="text-xl font-semibold text-white mb-4">My Professional Aspirations</h4>
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                My goal is to enhance my ability in web design and development, continuously improving my programming
                skills while sharpening my creative and design capabilities. I aspire to become a full-stack developer
                capable of creating innovative and useful systems and technologies that can make a real impact. Along
                the way, I want to motivate and inspire the younger generation, helping them see the potential of
                technology in transforming ideas into reality.
              </p>
              <p className="text-gray-300 leading-relaxed">
                In the coming years, I envision myself not only as a skilled developer but also as a mentor, guiding
                others to reach their full potential. I am passionate about using my expertise to develop systems that
                can solve real-world problems while pushing the boundaries of design and technology. My mission is to
                leave a lasting, positive influence on those I work with and inspire future innovators.
              </p>
              <div className="pt-4 flex flex-wrap gap-3">
                {[
                  "Team Leadership",
                  "Full-Stack Mastery",
                  "AI Integration",
                  "Open Source Contribution",
                  "Technical Writing",
                  "Mentorship",
                ].map((goal, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-full text-sm"
                  >
                    {goal}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default About
