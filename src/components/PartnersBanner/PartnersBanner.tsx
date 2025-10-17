import React, { useEffect, useRef } from "react";

const PartnersBanner: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Sample partner logos - replace with actual partner logos
  const partners = [
    { name: "UBC AMS", logo: "🏛️" },
    { name: "Mastercard", logo: "💳" },
    { name: "UBC Sauder", logo: "🎓" },
    { name: "Microsoft", logo: "🔷" },
    { name: "Google", logo: "🔍" },
    { name: "Amazon", logo: "📦" },
    { name: "IBM", logo: "🔵" },
    { name: "Oracle", logo: "🔴" },
    { name: "Salesforce", logo: "☁️" },
    { name: "Tableau", logo: "📊" },
    { name: "Power BI", logo: "📈" },
    { name: "Snowflake", logo: "❄️" },
  ];

  // Duplicate partners array for seamless loop
  const duplicatedPartners = [...partners, ...partners];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationId: number;
    let position = 0;
    const speed = 1.5; // pixels per frame
    const partnerWidth = 200; // width of each partner logo
    const gap = 40; // gap between logos
    const totalWidth = partnerWidth + gap;
    let isPaused = false;

    const animate = () => {
      if (!isPaused) {
        position -= speed;

        // Reset position when we've scrolled one full set
        if (Math.abs(position) >= partners.length * totalWidth) {
          position = 0;
        }

        carousel.style.transform = `translateX(${position}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    // Start animation
    animationId = requestAnimationFrame(animate);

    // Pause animation on hover
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
      carousel.removeEventListener('mouseenter', handleMouseEnter);
      carousel.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [partners.length]);

  return (
    <section className="w-full py-16 bg-gradient-to-r from-[#614ea5] to-[#493b7b] flex items-center justify-center" id="Partners">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="font-inter text-sm font-bold text-white mb-12">
          Collaborating with leading organizations and companies to bring real-world data experiences to our community
        </h2>

        <div className="relative overflow-hidden">
          <div className="flex gap-8 animate-scroll" ref={carouselRef}>
            {duplicatedPartners.map((partner, index) => (
              <div key={`${partner.name}-${index}`} className="flex-shrink-0 rounded-xl p-6 min-w-[200px] hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                <div className="text-4xl mb-2">
                  {partner.logo}
                </div>
                <span className="font-inter text-white font-medium">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersBanner;
