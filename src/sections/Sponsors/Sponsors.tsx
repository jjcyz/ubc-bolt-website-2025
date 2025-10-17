import React from "react";
import sponsorsImage from "../../assets/images/sponsors.webp";
import leftBuilding from "../../assets/images/left_ams.webp";
import middleBuilding from "../../assets/images/uoft.webp";
import frBuilding from "../../assets/images/mastercard.webp";

const Sponsors: React.FC = () => {
  return (
    <div className="w-full h-screen relative overflow-hidden" id="Sponsors">
      <img
        src={sponsorsImage}
        alt="Sponsors Background"
        className="w-full h-full object-cover absolute top-0 left-0"
        loading="lazy"
      />
      <img
        src={leftBuilding}
        alt="AMS Building"
        className="absolute bottom-0 left-0 h-1/2 object-contain"
        loading="lazy"
      />
      <img
        src={middleBuilding}
        alt="UofT Building"
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1/2 object-contain"
        loading="lazy"
      />
      <img
        src={frBuilding}
        alt="Mastercard Building"
        className="absolute bottom-0 right-0 h-1/2 object-contain"
        loading="lazy"
      />
    </div>
  );
};

export default Sponsors;
