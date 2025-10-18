import React from "react";
import Button from "../components/Button";
import SpaceScene from "../components/SpaceScene";
import Navbar from "../components/Navbar";
import { SITE_URLS } from "../config";

const Hero: React.FC = () => {

  return (
    <div className="flex items-center justify-start bg-gradient-to-br from-[#1a0b2e] via-[#614ea5] to-[#493b7b] w-full min-h-[110vh] px-4 sm:px-6 md:px-16 relative overflow-hidden -mt-0 top-0" id="Home">
      <SpaceScene />
      <Navbar />
      <div className="flex flex-col justify-center items-start max-w-3xl p-4 md:p-8 gap-6 relative z-20">
                <h1 className="font-inter text-6xl md:text-8xl font-bold text-white leading-tight">
                  BOLT
                </h1>
                <h2 className="font-inter text-3xl md:text-5xl font-bold text-white leading-snug">
                  UBC's <span className="text-[#e879f9] uppercase">Largest</span> Data Club
                </h2>
        <p className="font-inter text-sm md:text-base font-normal text-white/90 leading-relaxed max-w-2xl">
          Empowering UBC students to harness the power of data through hands-on workshops, case competitions, and networking events. Join us to develop practical analytics skills and connect with industry professionals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button
            text="BECOME A MEMBER"
            onClick={() => {
              window.open(SITE_URLS.membership, "_blank");
            }}
          />
          <Button
            text="PARTNER WITH US"
            onClick={() => {
              window.location.href = SITE_URLS.sponsorEmail;
            }}
            outline
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
