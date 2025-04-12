import React from 'react'

function AboutUs() {
  return (
    <section className="py-20 bg-white animate-on-scroll" id="about">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-[#1e0e4b] mb-4">
              About InventoryPro
            </h2>
            <div className="w-24 h-1 bg-[#7747ff] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-[#7747ff] transform transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-full bg-[#7747ff] bg-opacity-10 flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-[#7747ff]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#1e0e4b] mb-3">
                Smart Inventory Tracking
              </h3>
              <p className="text-gray-600">
                Real-time monitoring of inventory levels, movements, and alerts
                for low stock items to ensure you never run out of essential
                products.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-[#7747ff] transform transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-full bg-[#7747ff] bg-opacity-10 flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-[#7747ff]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#1e0e4b] mb-3">
                Team Management
              </h3>
              <p className="text-gray-600">
                Role-based access control ensures everyone has the right tools
                and information they need while maintaining security and
                accountability.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-[#7747ff] transform transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 rounded-full bg-[#7747ff] bg-opacity-10 flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-[#7747ff]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#1e0e4b] mb-3">
                Advanced Analytics
              </h3>
              <p className="text-gray-600">
                Comprehensive reporting and analytics tools to help you make
                data-driven decisions and optimize your inventory management
                processes.
              </p>
            </div>
          </div>

          <div className="mt-20 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <img
                src="/about.jpg"
                alt="Inventory Management"
                className="rounded-lg shadow-xl"
              />
            </div>

            <div className="md:w-1/2 md:pl-10">
              <h3 className="text-2xl font-bold text-[#1e0e4b] mb-4">
                Why Choose InventoryPro?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-6 h-6 rounded-full bg-[#7747ff] flex items-center justify-center text-white font-bold">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#1e0e4b]">
                      Intuitive Interface
                    </h4>
                    <p className="text-gray-600">
                      Clean, modern design that's easy to use for team members
                      at all technical levels.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-6 h-6 rounded-full bg-[#7747ff] flex items-center justify-center text-white font-bold">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#1e0e4b]">
                      Customizable Workflows
                    </h4>
                    <p className="text-gray-600">
                      Tailor the system to match your specific business
                      processes and requirements.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-6 h-6 rounded-full bg-[#7747ff] flex items-center justify-center text-white font-bold">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#1e0e4b]">
                      Seamless Integration
                    </h4>
                    <p className="text-gray-600">
                      Connect with your existing business tools through our
                      comprehensive API.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-6 h-6 rounded-full bg-[#7747ff] flex items-center justify-center text-white font-bold">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#1e0e4b]">
                      Enterprise-Grade Security
                    </h4>
                    <p className="text-gray-600">
                      Your data is protected with state-of-the-art encryption
                      and security protocols.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default AboutUs