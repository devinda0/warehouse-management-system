import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

function HeroSection() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section id="hero" className="relative bg-gradient-to-br from-[#1e0e4b] to-[#7747ff] text-white min-h-screen flex items-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white opacity-5 rounded-full"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 bg-white opacity-5 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-white opacity-5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-purple-400 opacity-10 rounded-full blur-xl"></div>
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-purple-300 opacity-5 rounded-full blur-xl"></div>
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20 px-6 py-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="text-2xl font-bold">
              <Link to="/">InventoPro</Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <a href="#hero" className="font-medium hover:text-purple-300 transition-colors">Home</a>
              <a href="#about" className="font-medium hover:text-purple-300 transition-colors">About Us</a>
              <a href="#features" className="font-medium hover:text-purple-300 transition-colors">Features</a>
              <a href="#faq" className="font-medium hover:text-purple-300 transition-colors">FAQ</a>
              <a href="#contact" className="font-medium hover:text-purple-300 transition-colors">Contact Us</a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMenu}
                className="text-white focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={toggleMenu}
          ></div>
          <div className="absolute right-0 top-0 h-full w-64 bg-[#1e0e4b] p-6 shadow-lg transform transition-transform duration-300">
            <button 
              onClick={toggleMenu} 
              className="absolute top-4 right-4 text-white"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            <div className="mt-12 flex flex-col space-y-6">
              <a href="#hero" className="font-medium hover:text-purple-300 transition-colors" onClick={toggleMenu}>Home</a>
              <a href="#about" className="font-medium hover:text-purple-300 transition-colors" onClick={toggleMenu}>About Us</a>
              <a href="#features" className="font-medium hover:text-purple-300 transition-colors" onClick={toggleMenu}>Features</a>
              <a href="#faq" className="font-medium hover:text-purple-300 transition-colors" onClick={toggleMenu}>FAQ</a>
              <a href="#contact" className="font-medium hover:text-purple-300 transition-colors" onClick={toggleMenu}>Contact Us</a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Content */}
      <div className="container mx-auto px-6 relative z-10 py-20">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300"
            variants={fadeIn}
          >
            Smart Inventory Management Simplified
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl mb-10 text-purple-100 max-w-2xl mx-auto"
            variants={fadeIn}
          >
            Streamline your inventory processes, empower your team, and
            boost productivity with our comprehensive solution.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12" 
            variants={fadeIn}
          >
            <Link
              to="/login"
              className="px-8 py-4 bg-white text-[#1e0e4b] rounded-lg font-medium hover:bg-purple-100 transition-colors duration-300 shadow-lg"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors duration-300"
            >
              Sign Up
            </Link>
          </motion.div>
          
          <motion.div
            variants={fadeIn}
            className="flex justify-center gap-8 mt-12"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-300 bg-opacity-20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="ml-3 text-lg">Real-time tracking</span>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-300 bg-opacity-20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="ml-3 text-lg">Secure data</span>
            </div>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        </div>
      </div>
    </section>
  )
}

export default HeroSection