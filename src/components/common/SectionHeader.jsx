import React from 'react';

const SectionHeader = ({ title, subtitle, centered = true }) => (
  <div className={centered ? 'text-center' : 'text-start'}>
    <h2 className="font-heading text-4xl lg:text-5xl font-bold text-dark mb-4">{title}</h2>
    <p className={`text-lg text-light max-w-3xl ${centered ? 'mx-auto' : ''}`}>{subtitle}</p>
    <div className={`flex ${centered ? 'justify-center' : 'justify-start'} mt-4`}>
      <div className="w-24 h-1 bg-secondary"></div>
    </div>
  </div>
);

export default SectionHeader;