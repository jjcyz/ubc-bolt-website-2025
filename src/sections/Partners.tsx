import React, { useEffect, useRef, memo } from "react";

const Partners: React.FC = memo(() => {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Partner logos
  const partners = [
    { name: "UBC", logo: "/partners/ubc.webp" },
    { name: "Mastercard", logo: "/partners/mastercard.webp" },
    { name: "Red Bull", logo: "/partners/redbull.webp" },
    { name: "CGI", logo: "/partners/cgi.webp" },
  ];

  // Duplicate partners array for seamless loop
  const duplicatedPartners = [...partners, ...partners];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Check if device supports hover (desktop) or is touch device (mobile)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    let animationId: number;
    let position = 0;
    const speed = 1.5; // pixels per frame

    // Function to get responsive dimensions
    const getDimensions = () => {
      const width = window.innerWidth;
      const partnerWidth = width < 640 ? 120 : width < 768 ? 160 : 200;
      const gap = width < 640 ? 16 : width < 768 ? 24 : 32;
      return { partnerWidth, gap, totalWidth: partnerWidth + gap };
    };

    let dimensions = getDimensions();
    let isPaused = false;

    const animate = () => {
      if (!isPaused) {
        position -= speed;

        // Reset position when we've scrolled one full set
        if (Math.abs(position) >= partners.length * dimensions.totalWidth) {
          position = 0;
        }

        carousel.style.transform = `translate3d(${position}px, 0, 0)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    // Start animation
    animationId = requestAnimationFrame(animate);

    // Handle window resize
    const handleResize = () => {
      dimensions = getDimensions();
    };

    window.addEventListener('resize', handleResize);

    // Only add hover events for non-touch devices
    if (!isTouchDevice) {
      const handleMouseEnter = () => {
        isPaused = true;
      };

      const handleMouseLeave = () => {
        isPaused = false;
      };

      carousel.addEventListener('mouseenter', handleMouseEnter);
      carousel.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
        window.removeEventListener('resize', handleResize);
        carousel.removeEventListener('mouseenter', handleMouseEnter);
        carousel.removeEventListener('mouseleave', handleMouseLeave);
      };
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [partners.length]);

  return (
    <section className="w-full py-16 md:py-16 bg-gradient-to-r from-[#614ea5] to-[#493b7b] flex items-center justify-center overflow-hidden" id="Partners">
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 md:px-8 text-center">
        <p className="font-inter text-xs sm:text-sm leading-relaxed opacity-90 text-white mb-8 md:mb-12 max-w-2xl mx-auto px-2 break-words">
          Collaborating with leading organizations to bring real-world data experiences to our community
        </p>

        <div className="relative w-full overflow-hidden">
          <div className="flex gap-4 sm:gap-6 md:gap-8 will-change-transform py-2" ref={carouselRef} style={{ transform: 'translate3d(0, 0, 0)' }}>
            {duplicatedPartners.map((partner, index) => (
              <div key={`${partner.name}-${index}`} className="flex-shrink-0 p-2 sm:p-4 md:p-6 min-w-[120px] sm:min-w-[160px] md:min-w-[200px] hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-auto object-contain max-h-16 sm:max-h-20 md:max-h-24"
                  loading="lazy"
                  decoding="async"
                  width="200"
                  height="96"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Partners.displayName = 'Partners';

export default Partners;
