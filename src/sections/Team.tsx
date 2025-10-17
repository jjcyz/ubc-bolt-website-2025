import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Member, TeamData } from "../types";
import { getProfileUrl } from "../lib/assets";

// Import with type assertion for JSON data
import teamDataJson from "../data/team.json";
const teamData = teamDataJson as TeamData;

const Team: React.FC = () => {
  const [allMembers, setAllMembers] = useState<Member[]>([]);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const carouselRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const members = teamData.teams.flatMap((team) =>
      team.executives.map((exec) => ({
        name: exec.name,
        title: exec.title,
        profilepic: exec.profilepic,
      }))
    );
    setAllMembers(members);
  }, []);

  // Split members into two halves for two carousels
  const firstHalf = allMembers.slice(0, Math.ceil(allMembers.length / 2));
  const secondHalf = allMembers.slice(Math.ceil(allMembers.length / 2));

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  return (
                <div className="w-full py-24 bg-gradient-to-br from-[#f8f7f3] to-[#f0ede7] flex flex-col items-center overflow-hidden relative" id="Team">
      <div className="w-full max-w-6xl mx-auto px-8 mb-12">
        <h2 className="font-inter text-sm font-normal text-gray-600 mb-2 lowercase italic">Team</h2>
        <h1 className="font-inter text-3xl font-bold text-black mb-6 leading-tight">Meet Our Team</h1>
      </div>

      <div className="w-full">
        <div className="w-full flex flex-col items-center gap-4">
          {/* First Carousel - Scrolling Right */}
          <div className="relative w-full">
            <div className="w-full overflow-x-auto" style={{ cursor: 'grab' }}>
              <div className="flex gap-8 py-4"
                   style={{
                     animation: 'scroll-right 30s linear infinite'
                   }}>
                {[...firstHalf, ...firstHalf].map((member, index) => (
                  <div key={`first-${index}`} className="flex-shrink-0 flex flex-col items-center hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                    <div className="relative">
                      <div className={`w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 transition-opacity duration-300 ${
                        loadedImages.has(index) ? "opacity-100" : "opacity-70"
                      }`}>
                        <img
                          src={getProfileUrl(member.profilepic)}
                          alt={member.name}
                          loading="lazy"
                          onLoad={() => handleImageLoad(index)}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="text-center mt-3 bg-white/20 backdrop-blur-md rounded-lg px-3 py-2 border border-white/30 shadow-lg">
                      <div className="font-inter text-black font-medium text-sm">{member.name}</div>
                      <div className="font-inter text-gray-700 text-xs">{member.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Second Carousel - Scrolling Left */}
          <div className="relative w-full">
            <div className="w-full overflow-x-auto" ref={carouselRef} style={{ cursor: 'grab' }}>
              <div className="flex gap-8 py-4"
                   style={{
                     animation: 'scroll-left 30s linear infinite'
                   }}>
                {[...secondHalf, ...secondHalf].map((member, index) => (
                  <div key={`second-${index}`} className="flex-shrink-0 flex flex-col items-center hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                    <div className="relative">
                      <div className={`w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 transition-opacity duration-300 ${
                        loadedImages.has(index + firstHalf.length) ? "opacity-100" : "opacity-70"
                      }`}>
                        <img
                          src={getProfileUrl(member.profilepic)}
                          alt={member.name}
                          loading="lazy"
                          onLoad={() => handleImageLoad(index + firstHalf.length)}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="text-center mt-3 bg-white/20 backdrop-blur-md rounded-lg px-3 py-2 border border-white/30 shadow-lg">
                      <div className="font-inter text-black font-medium text-sm">{member.name}</div>
                      <div className="font-inter text-gray-700 text-xs">{member.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* View More Button */}
          <div className="mt-8">
            <button
              onClick={() => navigate('/team')}
              className="bg-black/10 hover:bg-black/20 text-white font-inter font-semibold px-8 py-3 rounded-full transition-all duration-200"
            >
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
