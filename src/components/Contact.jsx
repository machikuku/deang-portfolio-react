"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Github, Linkedin, MessageCircle, Copy, Check, ExternalLink } from "lucide-react"
import BackgroundEffect from "./BackgroundEffect"

const Contact = () => {
  // State for copy functionality
  const [copied, setCopied] = useState({
    email: false,
    messenger: false,
    github: false,
    linkedin: false,
  })

  // Function to copy text to clipboard
  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text)
    setCopied({ ...copied, [type]: true })
    setTimeout(() => {
      setCopied({ ...copied, [type]: false })
    }, 2000)
  }

  // Contact information
  const contactInfo = {
    email: "markujhirou@gmail.com",
    messenger: "m.me/markujhirou",
    github: "github.com/machikuku",
    linkedin: "linkedin.com/in/markujhirou",
  }

  return (
    <div className="min-h-screen bg-[#121416] py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Enhanced Background */}
      <BackgroundEffect variant="blobs" intensity="low" />

      {/* Background elements */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-teal-500/5 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-teal-500/5 blur-3xl rounded-full" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column - Let's Connect */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex justify-center lg:justify-start mb-6">
              <div className="w-24 h-24 rounded-full bg-teal-500/20 border-2 border-teal-500/30 flex items-center justify-center">
                <MessageCircle className="text-teal-500" size={48} />
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white text-center lg:text-left">Let's Connect</h2>

            <p className="text-gray-400 text-lg text-center lg:text-left">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              Feel free to reach out through any of the platforms below.
            </p>
          </motion.div>

          {/* Right Column - Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Email Card */}
            <motion.div
              whileHover={{
                scale: 1.03,
                boxShadow: "0 10px 25px -5px rgba(20, 184, 166, 0.1), 0 8px 10px -6px rgba(20, 184, 166, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-start space-x-4 relative z-10">
                <div className="bg-[#2a2a2a] p-3 rounded-lg group-hover:bg-teal-500/20 transition-colors duration-300">
                  <Mail className="text-teal-500" size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium text-lg mb-2">Email</h4>
                  <div className="flex items-center bg-[#2a2a2a] rounded-md px-3 py-2">
                    <p className="text-gray-400 text-sm flex-1 break-all mr-2">{contactInfo.email}</p>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => copyToClipboard(contactInfo.email, "email")}
                      className="bg-[#1a1a1a] hover:bg-teal-500/20 p-1.5 rounded-md transition-colors flex-shrink-0"
                      title="Copy to clipboard"
                    >
                      {copied.email ? (
                        <Check className="text-teal-500" size={14} />
                      ) : (
                        <Copy className="text-teal-400" size={14} />
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
              <motion.a
                href={`mailto:${contactInfo.email}`}
                className="mt-4 text-teal-400 text-sm flex items-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                whileHover={{ x: 5 }}
              >
                <span>Send Email</span>
                <ExternalLink size={14} className="ml-1" />
              </motion.a>
            </motion.div>

            {/* Messenger Card */}
            <motion.div
              whileHover={{
                scale: 1.03,
                boxShadow: "0 10px 25px -5px rgba(20, 184, 166, 0.1), 0 8px 10px -6px rgba(20, 184, 166, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-start space-x-4 relative z-10">
                <div className="bg-[#2a2a2a] p-3 rounded-lg group-hover:bg-teal-500/20 transition-colors duration-300">
                  <MessageCircle className="text-teal-500" size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium text-lg mb-2">Messenger</h4>
                  <div className="flex items-center bg-[#2a2a2a] rounded-md px-3 py-2">
                    <p className="text-gray-400 text-sm flex-1 break-all mr-2">{contactInfo.messenger}</p>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => copyToClipboard(contactInfo.messenger, "messenger")}
                      className="bg-[#1a1a1a] hover:bg-teal-500/20 p-1.5 rounded-md transition-colors flex-shrink-0"
                      title="Copy to clipboard"
                    >
                      {copied.messenger ? (
                        <Check className="text-teal-500" size={14} />
                      ) : (
                        <Copy className="text-teal-400" size={14} />
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
              <motion.a
                href={contactInfo.messenger}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-teal-400 text-sm flex items-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                whileHover={{ x: 5 }}
              >
                <span>Open Messenger</span>
                <ExternalLink size={14} className="ml-1" />
              </motion.a>
            </motion.div>

            {/* GitHub Card */}
            <motion.div
              whileHover={{
                scale: 1.03,
                boxShadow: "0 10px 25px -5px rgba(20, 184, 166, 0.1), 0 8px 10px -6px rgba(20, 184, 166, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-start space-x-4 relative z-10">
                <div className="bg-[#2a2a2a] p-3 rounded-lg group-hover:bg-teal-500/20 transition-colors duration-300">
                  <Github className="text-teal-500" size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium text-lg mb-2">GitHub</h4>
                  <div className="flex items-center bg-[#2a2a2a] rounded-md px-3 py-2">
                    <p className="text-gray-400 text-sm flex-1 break-all mr-2">{contactInfo.github}</p>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => copyToClipboard(contactInfo.github, "github")}
                      className="bg-[#1a1a1a] hover:bg-teal-500/20 p-1.5 rounded-md transition-colors flex-shrink-0"
                      title="Copy to clipboard"
                    >
                      {copied.github ? (
                        <Check className="text-teal-500" size={14} />
                      ) : (
                        <Copy className="text-teal-400" size={14} />
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
              <motion.a
                href={`https://${contactInfo.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-teal-400 text-sm flex items-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                whileHover={{ x: 5 }}
              >
                <span>View Profile</span>
                <ExternalLink size={14} className="ml-1" />
              </motion.a>
            </motion.div>

            {/* LinkedIn Card */}
            <motion.div
              whileHover={{
                scale: 1.03,
                boxShadow: "0 10px 25px -5px rgba(20, 184, 166, 0.1), 0 8px 10px -6px rgba(20, 184, 166, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-start space-x-4 relative z-10">
                <div className="bg-[#2a2a2a] p-3 rounded-lg group-hover:bg-teal-500/20 transition-colors duration-300">
                  <Linkedin className="text-teal-500" size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium text-lg mb-2">LinkedIn</h4>
                  <div className="flex items-center bg-[#2a2a2a] rounded-md px-3 py-2">
                    <p className="text-gray-400 text-sm flex-1 break-all mr-2">{contactInfo.linkedin}</p>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => copyToClipboard(contactInfo.linkedin, "linkedin")}
                      className="bg-[#1a1a1a] hover:bg-teal-500/20 p-1.5 rounded-md transition-colors flex-shrink-0"
                      title="Copy to clipboard"
                    >
                      {copied.linkedin ? (
                        <Check className="text-teal-500" size={14} />
                      ) : (
                        <Copy className="text-teal-400" size={14} />
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
              <motion.a
                href={`https://${contactInfo.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-teal-400 text-sm flex items-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                whileHover={{ x: 5 }}
              >
                <span>Connect on LinkedIn</span>
                <ExternalLink size={14} className="ml-1" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Thank You Message at the bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center max-w-3xl mx-auto"
        >
          <p className="text-gray-400 text-lg">
            Thank you for taking the time to explore my work. I'm passionate about creating exceptional digital
            experiences and would love the opportunity to collaborate on your next project.
          </p>
          <motion.div className="mt-6">
            <span className="text-white text-lg">
              Let's build something amazing{" "}
              <span className="font-azonix text-teal-400 tracking-wider inline-block">TOGETHER</span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Contact
