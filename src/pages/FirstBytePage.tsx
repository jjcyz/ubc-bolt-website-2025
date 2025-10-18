import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../sections/Footer";

const FirstBytePage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="pt-24 md:pt-32 pb-12 md:pb-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="font-inter text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
              First Byte
            </h1>
            <p className="font-inter text-base sm:text-lg text-gray-600">
              An introductory workshop series for beginners covering fundamental data analysis tools, Excel, SQL, and data visualization basics.
            </p>
          </div>

          {/* Content Coming Soon */}
          <div className="text-center py-20">
            <p className="font-inter text-xl text-gray-500">
              Event details coming soon...
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FirstBytePage;

