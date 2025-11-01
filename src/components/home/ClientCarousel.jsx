import React from 'react';

// Using placeholder logos as in the original file
const clientLogos = [
  'https://via.placeholder.com/150x60/ffffff/cccccc?text=GREENOL',
  'https://via.placeholder.com/150x60/ffffff/cccccc?text=GREEN',
  'https://via.placeholder.com/150x60/ffffff/cccccc?text=Trafigura',
  'https://via.placeholder.com/150x60/ffffff/cccccc?text=SUNBELT',
  'https://via.placeholder.com/150x60/ffffff/cccccc?text=EMDAD',
  'https://via.placeholder.com/150x60/ffffff/cccccc?text=ADNOC',
  'https://via.placeholder.com/150x60/ffffff/cccccc?text=TechCorp',
  'https://via.placeholder.com/150x60/ffffff/cccccc?text=InfraCo',
];

const ClientCarousel = () => (
  <div className="relative w-full overflow-hidden">
    <div className="flex animate-marquee-infinite space-x-16 rtl:space-x-reverse py-4">
      {[...clientLogos, ...clientLogos].map((logo, index) => (
        <div key={index} className="flex-shrink-0">
          <img
            src={logo}
            alt={`Client Logo ${index + 1}`}
            className="h-10 md:h-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-in-out"
          />
        </div>
      ))}
    </div>
  </div>
);

export default ClientCarousel;