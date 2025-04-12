import React, { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import AboutUs from "../components/AboutUs";
import Feature from "../components/Feature";
import FAQ from "../components/FAQ";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";

function Landing() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const sections = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Add in-view class when element enters viewport
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            entry.target.classList.remove("out-view");
          } else {
            // Remove in-view and add out-view when element leaves viewport
            // This is the key change for disappearing animations
            entry.target.classList.remove("in-view");
            entry.target.classList.add("out-view");
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: "-100px 0px" // Slightly reduces the effective viewport for better timing
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    // Show scroll-to-top button when user scrolls down
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section - No animation */}
      <HeroSection />

      {/* Animated Sections with individual delays */}
      <div className="animate-on-scroll opacity-0 transition-all duration-1000 transform translate-y-10" style={{ transitionDelay: "0.2s" }}>
        <AboutUs />
      </div>

      <div className="animate-on-scroll opacity-0 transition-all duration-1000 transform translate-y-10" style={{ transitionDelay: "0.3s" }}>
        <Feature />
      </div>

      <div className="animate-on-scroll opacity-0 transition-all duration-1000 transform translate-y-10" style={{ transitionDelay: "0.4s" }}>
        <FAQ />
      </div>

      <div className="animate-on-scroll opacity-0 transition-all duration-1000 transform translate-y-10" style={{ transitionDelay: "0.5s" }}>
        <ContactUs />
      </div>

      {/* Footer - No animation */}
      <Footer />

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 shadow-lg transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </button>
      )}

      {/* CSS for animation classes */}
      <style jsx>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .in-view {
          opacity: 1;
          transform: translateY(0);
        }
        
        .out-view {
          opacity: 0;
          transform: translateY(40px);
        }
      `}</style>
    </div>
  );
}

export default Landing;