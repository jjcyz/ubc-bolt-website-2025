import React from "react";
import { useNavigate } from "react-router-dom";
import { Event, EventsData } from "../types";
import { getEventImageUrl } from "../lib/assets";

// Import with type assertion for JSON data
import eventsDataJson from "../data/events.json";
const eventsData = eventsDataJson as EventsData;

const Events: React.FC = () => {
  const EVENTS: Event[] = eventsData.events;
  const navigate = useNavigate();

  const eventLinks = [
    "/events/first-byte",
    "/events/bolt-connect",
    "/events/bolt-circuit",
    "/events/bolt-bootcamp"
  ];

  return (
    <div className="w-full py-16 md:py-24 bg-gradient-to-br from-[#f8f7f3] to-[#f0ede7]" id="Events">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="mb-8 md:mb-12">
          <h2 className="font-inter text-sm font-normal text-gray-600 mb-2 lowercase italic">Events</h2>
          <h1 className="font-inter text-2xl sm:text-3xl font-bold text-black mb-4 md:mb-6 leading-tight">Our Events</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-9">
          {EVENTS.slice(0, 4).map((event, index) => {
            const eventDescriptions = [
              "Our flagship bootcamp introducing students to data analytics through hands-on projects and mentorship from industry professionals.",
              "Connect with like-minded data enthusiasts, industry professionals, and alumni. Network and discover career opportunities in analytics.",
              "An intensive case competition where teams tackle real-world business problems using data analytics and present solutions to industry judges.",
              "An introductory workshop series for beginners covering fundamental data analysis tools, Excel, SQL, and data visualization basics."
            ];

            return (
            <div key={index} className="bg-white/20 backdrop-blur-lg rounded-xl p-4 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group">
              <div className="w-full aspect-video overflow-hidden rounded-lg mb-3">
                <img
                  src={getEventImageUrl(event.image)}
                  alt={event.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="338"
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-inter text-gray-800 font-bold text-base">{event.name}</h3>
                <p className="font-inter text-gray-700 text-xs leading-relaxed">
                  {eventDescriptions[index]}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                    {index === 0 ? "January" : index === 1 ? "February" : index === 2 ? "March" : "April"}
                  </span>
                </div>
                <div className="flex justify-center pt-1">
                  <button
                    onClick={() => navigate(eventLinks[index])}
                    className="bg-white/20 hover:bg-white/30 text-gray-800 font-inter font-semibold px-3 py-1.5 text-xs rounded-full transition-all duration-200 border border-gray-300/50"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          )})}
        </div>
      </div>
    </div>
  );
};

export default Events;
