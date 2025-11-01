import React from 'react';

// Reusable Page Header Component
const PageHeader = ({ title, subtitle, imgSeed }) => (
  <section 
    className="py-24 bg-dark text-white relative" 
    style={{ 
      backgroundImage: `url('https://picsum.photos/seed/${imgSeed}/1920/400')`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundBlendMode: 'overlay', 
      backgroundColor: 'rgba(0,0,0,0.6)' 
    }}
  >
    <div className="container mx-auto px-4 text-center relative z-10">
      <h1 className="font-heading text-5xl lg:text-6xl font-bold">{title}</h1>
      <p className="text-xl mt-4">{subtitle}</p>
    </div>
  </section>
);

export default PageHeader;