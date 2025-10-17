import React, { useState, useEffect, useRef } from "react";
import { NAVIGATION } from "../../constants/layout";
import { scrollToElement } from "../../utils";

const Navbar: React.FC = () => {
  const sections = ["Home", "About", "Partners", "Events", "Team"];
  const [activeSection, setActiveSection] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sliderStyle, setSliderStyle] = useState({ width: 0, left: 0 });
  const isScrolling = useRef(false);
  const navRef = useRef<HTMLUListElement>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // Function to update slider position
  const updateSliderPosition = (sectionName: string) => {
    const activeButton = buttonRefs.current[sectionName];
    const nav = navRef.current;

    if (activeButton && nav) {
      const navRect = nav.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      setSliderStyle({
        width: buttonRect.width,
        left: buttonRect.left - navRect.left,
      });
    }
  };

  useEffect(() => {
    // Initial slider position
    updateSliderPosition(activeSection);

    // Update slider position on window resize
    const handleResize = () => {
      updateSliderPosition(activeSection);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling.current) return;
      const scrollPosition = window.scrollY;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop - NAVIGATION.SECTION_DETECTION_OFFSET &&
            scrollPosition < offsetTop + offsetHeight - NAVIGATION.SECTION_DETECTION_OFFSET
          ) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const success = scrollToElement(sectionId, NAVIGATION.NAVBAR_HEIGHT);

    if (success) {
      isScrolling.current = true;
      setActiveSection(sectionId);
      setMenuOpen(false);

      setTimeout(() => {
        isScrolling.current = false;
        setActiveSection(sectionId);
      }, NAVIGATION.SCROLL_ANIMATION_DURATION);
    }
  };
  const HamburgerIcon = () => (
    <svg width="23" height="23" viewBox="0 0 23 23">
      <path
        fill="transparent"
        strokeWidth="3"
        strokeLinecap="round"
        stroke="white"
        d="M 2 2.5 L 20 2.5"
      />
      <path
        fill="transparent"
        strokeWidth="3"
        strokeLinecap="round"
        stroke="white"
        d="M 2 9.423 L 20 9.423"
      />
      <path
        fill="transparent"
        strokeWidth="3"
        strokeLinecap="round"
        stroke="white"
        d="M 2 16.346 L 20 16.346"
      />
    </svg>
  );

  const CloseIcon = () => (
    <svg width="23" height="23" viewBox="0 0 23 23">
      <path
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        d="M 2 2 L 21 21"
      />
      <path
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        d="M 21 2 L 2 21"
      />
    </svg>
  );
  return (
    <>
    <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-lg px-4 py-2.5 rounded-full z-[1000] shadow-lg hidden md:block">
      <ul className="flex gap-4 list-none m-0 p-0 relative" ref={navRef}>
        <div
          className="absolute top-1/2 transform -translate-y-1/2 h-10 bg-white/15 rounded-full transition-all duration-300 ease-out z-[1] backdrop-blur-md"
          style={{
            width: sliderStyle.width,
            left: sliderStyle.left,
          }}
        />
        {sections.map((section) => (
          <li key={section}>
            <button
              ref={(el) => (buttonRefs.current[section] = el)}
              onClick={() => scrollToSection(section)}
              className={`bg-none border-none text-white font-roboto-mono text-base cursor-pointer transition-all duration-300 px-4 py-2 rounded-3xl font-normal relative z-[2] ${
                activeSection === section ? "font-bold text-white" : ""
              } hover:text-white/80`}
            >
              {section}
            </button>
          </li>
        ))}
      </ul>
    </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-6 right-6 z-[1100] cursor-pointer bg-white/20 backdrop-blur-lg p-3 rounded-full shadow-lg" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
      </div>

      {menuOpen && (
        <div className="fixed inset-0 w-screen h-screen bg-black/50 backdrop-blur-lg z-[1050] flex items-center justify-center">
          <div className="flex flex-col gap-8 text-center">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`bg-none border-none text-white font-roboto-mono text-base cursor-pointer transition-all duration-300 px-4 py-2 rounded-3xl font-normal ${
                  activeSection === section ? "font-bold text-white" : ""
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
