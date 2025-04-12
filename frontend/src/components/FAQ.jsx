import React, {useState} from 'react'
import { motion, AnimatePresence } from 'framer-motion';

function FAQ() {

  // FAQ items
  const faqItems = [
    {
      question: "What is InventoryPro?",
      answer:
        "InventoryPro is a comprehensive inventory management system designed for businesses of all sizes. It helps streamline inventory tracking, employee management, and supplier coordination through an intuitive interface.",
    },
    {
      question: "How does role-based access work?",
      answer:
        "InventoryPro provides different interfaces and capabilities based on user roles. Managers get full access to inventory, employee management, and analytics. Workers can access inventory and their profiles. Suppliers can manage requests and their profiles.",
    },
    {
      question: "Can I use InventoryPro on mobile devices?",
      answer:
        "Yes! InventoryPro is fully responsive and works seamlessly across desktops, tablets, and mobile phones, allowing you to manage your inventory on the go.",
    },
    {
      question: "How secure is my data with InventoryPro?",
      answer:
        "We prioritize security with enterprise-grade encryption, regular security audits, and role-based access control to ensure your business data remains protected at all times.",
    },
    {
      question: "Can InventoryPro integrate with other business systems?",
      answer:
        "Yes, InventoryPro offers API integration capabilities allowing seamless connection with accounting software, e-commerce platforms, and other business management tools.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  // Toggle function for opening/closing FAQ items
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  return (
    <section className="py-20 bg-white animate-on-scroll" id="faq">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-[#1e0e4b] mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-[#7747ff] mx-auto"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-5 px-6 text-left bg-white hover:bg-gray-50 flex justify-between items-center transition-colors duration-300"
              >
                <h3 className="text-xl font-bold text-[#1e0e4b]">
                  {item.question}
                </h3>
                <div className={`w-6 h-6 flex items-center justify-center rounded-full border-2 border-[#7747ff] text-[#7747ff] transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-5 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ