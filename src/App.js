import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';


// Import Icons
import { 
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaBars, FaTimes, FaChevronRight, 
  FaBuilding, FaTools, FaShip, FaWarehouse, FaHammer, 
  FaCogs, FaUserCheck, FaProjectDiagram, FaLightbulb, FaArrowRight
} from 'react-icons/fa';

// --- DATA CONSTANTS (Rebranded) ---

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Expertise', href: '/expertise' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact Us', href: '/contact' },
];

// Data for Hero Slider (Updated Imagery)
const heroSlides = [
  {
    img: 'https://images.unsplash.com/photo-1542308962-eac374872c67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80', // Modern Arab Architecture
    title: 'Knights Engineering',
    subtitle: 'Forging the Future of Engineering & Construction.',
  },
  {
    img: 'https://images.unsplash.com/photo-1519630485217-39b1b65b3c3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80', // Dubai Skyline / Engineering
    title: 'Engineering Excellence',
    subtitle: 'Delivering complex projects with precision and quality.',
  },
  {
    img: 'https://images.unsplash.com/photo-1602013894762-1b94d1b8f152?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80', // Industrial / Energy
    title: 'Turnkey EPC Solutions',
    subtitle: 'Your trusted partner from concept to commission.',
  },
];

const expertiseData = [
  { title: 'EPC Works', description: 'Full-range EPC services from conceptual design to commissioning.', icon: <FaBuilding size={24} />, img: 'https://picsum.photos/seed/epc/600/400' },
  { title: 'Design Engineering', description: 'In-house design engineering team delivers innovative, cost-effective solutions.', icon: <FaTools size={24} />, img: 'https://picsum.photos/seed/design/600/400' },
  { title: 'Offshore Works', description: 'Extensive experience in offshore fabrication and installation projects.', icon: <FaShip size={24} />, img: 'https://picsum.photos/seed/offshore/600/400' },
  { title: 'Steel Fabrication', description: 'State-of-the-art steel fabrication division for all structural needs.', icon: <FaWarehouse size={24} />, img: 'https://picsum.photos/seed/steel/600/400' },
  { title: 'Civil Construction', description: 'Civil construction services designed to meet diverse project needs.', icon: <FaHammer size={24} />, img: 'https://picsum.photos/seed/civil/600/400' },
  { title: 'MEP Works', description: 'A wide range of mechanical, electrical, and plumbing (MEP) services.', icon: <FaCogs size={24} />, img: 'https://picsum.photos/seed/mep/600/400' },
];

const projectsData = [
  { img: 'https://picsum.photos/seed/project1/400/300', title: 'Storage Terminals' },
  { img: 'https://picsum.photos/seed/project2/400/300', title: 'Pressure Vessels' },
  { img: 'https://picsum.photos/seed/project3/400/300', title: 'Jetty Pipeline' },
  { img: 'https://picsum.photos/seed/project4/400/300', title: 'Topside Modules' },
  { img: 'https://picsum.photos/seed/project5/400/300', title: 'Port Terminals' },
  { img: 'https://picsum.photos/seed/project6/400/300', title: 'Marine Loading Arms' },
  { img: 'https://picsum.photos/seed/project7/400/300', title: 'Offshore Platform' },
  { img: 'https://picsum.photos/seed/project8/400/300', title: 'Modular Packages' },
];

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

// --- ANIMATION VARIANTS ---

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: [0.6, 0.05, 0.01, 0.9] // <-- Corrected -0.01 to 0.01
    } 
  },
};

const pageTransitionVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};


// --- REUSABLE COMPONENTS ---

/**
 * Upgraded Button Component
 */
const Button = ({ children, variant = 'primary', className = '', as = 'button', ...props }) => {
  const styles = {
    primary: `bg-primary text-white hover:bg-red-700`,
    secondary: `bg-off-white text-primary border border-primary hover:bg-gray-100`,
  };
  const Tag = as;
  
  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
      <Tag
        className={`py-3 px-7 rounded font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 group inline-flex items-center gap-2 ${styles[variant]} ${className}`}
        {...props}
      >
        {children}
        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={12} />
      </Tag>
    </motion.div>
  );
};

/**
 * Upgraded Section Header Component
 */
const SectionHeader = ({ title, subtitle, centered = true }) => (
  <div className={centered ? 'text-center' : ''}>
    <h2 className="font-heading text-4xl lg:text-5xl font-bold text-dark mb-4">{title}</h2>
    <p className={`text-lg text-light max-w-3xl ${centered ? 'mx-auto' : ''}`}>{subtitle}</p>
    <div className={`flex ${centered ? 'justify-center' : ''} mt-4`}>
      <div className="w-24 h-1 bg-secondary"></div>
    </div>
  </div>
);

/**
 * Upgraded Expertise Card
 */
const ExpertiseCard = ({ item }) => (
  <motion.div 
    className="bg-white rounded-lg shadow-lg overflow-hidden group"
    whileHover={{ y: -8, scale: 1.02 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    <div className="relative">
      <img src={item.img} alt={item.title} className="w-full h-56 object-cover" />
      <div className="absolute top-4 left-4 bg-primary text-white p-3 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110">
        {item.icon}
      </div>
    </div>
    <div className="p-6">
      <h3 className="font-heading text-2xl font-semibold text-dark mb-3">{item.title}</h3>
      <p className="font-body text-light mb-5">{item.description}</p>
      <a
        href="#"
        className="font-semibold text-primary hover:text-red-700 transition-colors duration-300 group inline-flex items-center"
      >
        READ MORE 
        <FaChevronRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={12} />
      </a>
    </div>
  </motion.div>
);

/**
 * Upgraded Project Card
 */
const ProjectCard = ({ project }) => (
  <motion.div 
    className="relative rounded-lg overflow-hidden shadow-lg group aspect-w-4 aspect-h-3"
    whileHover={{ scale: 1.05 }}
    transition={{ type: 'spring', stiffness: 400 }}
  >
    <img
      src={project.img}
      alt={project.title}
      className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ease-in-out flex items-end p-6">
      <h3 className="font-heading text-white text-2xl font-semibold transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        {project.title}
      </h3>
    </div>
  </motion.div>
);

/**
 * Client Logo Carousel (Unchanged, but benefits from new config)
 */
const ClientCarousel = () => (
  <div className="relative w-full overflow-hidden">
    <div className="flex animate-marquee-infinite space-x-16 py-4">
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

// --- LAYOUT COMPONENTS ---

/**
 * 1. Upgraded Top Navigation Bar Component
 */
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `relative py-2 font-body font-medium transition-colors duration-300 ${
      isActive ? 'text-primary' : 'text-dark hover:text-primary'
    } after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:transition-all after:duration-300 ${
      isActive ? 'after:w-full after:bg-primary' : 'after:w-0 after:bg-secondary'
    } hover:after:w-full`;
    
  const mobileNavLinkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-base font-medium ${
      isActive ? 'bg-red-50 text-primary' : 'text-dark hover:bg-gray-100 hover:text-primary'
    }`;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out font-body ${
      isSticky ? 'shadow-lg bg-white/95 backdrop-blur-sm' : 'bg-white'
    }`}>
      {/* Top Bar */}
      <div className="bg-primary text-white py-1 px-4 md:px-8 lg:px-12 hidden md:flex justify-end items-center text-xs space-x-6">
        <a href="tel:+97165343100" className="flex items-center hover:text-gray-200">
          <FaPhone className="mr-2" /> +971 6 5343100
        </a>
        <a href="mailto:info@knights.com" className="flex items-center hover:text-gray-200">
          <FaEnvelope className="mr-2" /> info@knights.com
        </a>
        <span className="flex items-center">
          <FaMapMarkerAlt className="mr-2" /> Sharjah - United Arab Emirates
        </span>
      </div>

      {/* Main Navigation */}
      <nav className="relative py-4 px-4 md:px-8 lg:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          {/* Using text logo for flexibility, can be replaced with <img> */}
          <span className="font-heading text-3xl font-bold text-dark">Knights <span className="text-primary">Engineering</span></span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink key={link.name} to={link.href} className={navLinkClass}>
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Hamburger Icon */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-dark focus:outline-none p-2" aria-label="Open menu">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden overflow-hidden bg-white absolute top-full left-0 right-0 shadow-lg`}
          >
            <div className="flex flex-col px-4 pt-2 pb-4 space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={mobileNavLinkClass}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

/**
 * 7. Upgraded Footer Component
 */
const Footer = () => {
  return (
    <footer className="bg-dark font-body">
      {/* Top Banner Image */}
      <div
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: "url('https://picsum.photos/seed/footerbg/1920/300')" }}
      >
        <div className="w-full h-full bg-black/60"></div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16 text-gray-400">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: About */}
          <div className="space-y-4">
            <span className="font-heading text-3xl font-bold text-white">Knights <span className="text-primary">Engineering</span></span>
            <p className="text-sm">
              Knights Engineering is a dynamic and fast-growing company providing end-to-end solutions in engineering, procurement, and construction.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4 font-heading">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm hover:text-white transition-colors duration-300 flex items-center group">
                    <FaChevronRight size={10} className="mr-2 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4 font-heading">Contact Company</h4>
            <a href="#" className="flex items-start space-x-3 group">
              <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" size={16} />
              <p className="text-sm group-hover:text-white transition-colors duration-300">P.O. Box: 23416, Sharjah, United Arab Emirates</p>
            </a>
            <a href="tel:+97165343100" className="flex items-start space-x-3 group">
              <FaPhone className="text-primary mt-1 flex-shrink-0" size={16} />
              <p className="text-sm group-hover:text-white transition-colors duration-300">+971 6 5343100</p>
            </a>
            <a href="mailto:info@knights.com" className="flex items-start space-x-3 group">
              <FaEnvelope className="text-primary mt-1 flex-shrink-0" size={16} />
              <p className="text-sm group-hover:text-white transition-colors duration-300">info@knights.com</p>
            </a>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4 font-heading">Newsletter</h4>
            <p className="text-sm">Get updates about our latest projects and innovations.</p>
            <form className="flex mt-4">
              <input
                type="email"
                placeholder="Your Email Address"
                className="w-full px-4 py-2 rounded-l-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Subscribe"
              >
                <FaChevronRight />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright Strip */}
      <div className="bg-black text-gray-500 text-center text-sm py-4">
        <div className="container mx-auto px-4">
          © {new Date().getFullYear()} Knights Engineering. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

/**
 * Main Layout Component (with Page Transitions)
 */
const PageLayout = () => {
  const location = useLocation(); // <-- Add this line
  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={pageTransitionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  );
};

// --- PAGE COMPONENTS ---

/**
 * 2. Hero Section (Upgraded Slider with Framer Motion)
 */
const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden pt-[100px] md:pt-[76px]">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <img
            src={heroSlides[currentSlide].img}
            alt={heroSlides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 z-10"></div>
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white p-4">
        <motion.h1 
          key={`title-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="font-heading text-5xl md:text-7xl font-bold mb-4"
        >
          {heroSlides[currentSlide].title}
        </motion.h1>
        <motion.p 
          key={`subtitle-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          className="font-body text-xl md:text-2xl mb-8 max-w-2xl"
        >
          {heroSlides[currentSlide].subtitle}
        </motion.p>
        <motion.div
          key={`button-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
        >
          <Button variant="primary" as={Link} to="/about" className="py-3 px-8 text-lg rounded-full">
            Explore More
          </Button>
        </motion.div>
      </div>
      
      {/* Slider Dots */}
      <div className="absolute z-30 bottom-10 left-1/2 -translate-x-1/2 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};


/**
 * Home Page Component
 */
const HomePage = () => {
  return (
    <div className="font-body">
      <HeroSlider />

      {/* About Summary Section */}
      <motion.section 
        className="py-16 lg:py-24 bg-off-white"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                title="About Knights Engineering"
                subtitle="With a modest beginning in the UAE, Knights Engineering has transformed into a dynamic and fast-growing company, providing complete end-to-end solutions from conceptual design to commissioning."
                centered={false}
              />
              <p className="text-light my-6">
                Our commitment to delivering projects on time, within budget, and to the highest quality standards is demonstrated by our track record and motivated team.
              </p>
              <Button as={Link} to="/about" variant="primary" className="mt-4">
                Learn More About Us
              </Button>
            </div>
            <motion.div 
              className="w-full h-80 lg:h-full min-h-[300px]"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src="https://picsum.photos/seed/about/600/500"
                alt="Industrial Site"
                className="w-full h-full object-cover rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Expertise Summary Section */}
      <motion.section 
        className="py-16 lg:py-24 bg-white bg-geometric-pattern"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Our Expertise"
            subtitle="We offer comprehensive solutions across a wide range of industries, driving innovation, infrastructure development, and engineering excellence."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {expertiseData.slice(0, 3).map((item) => (
              <ExpertiseCard key={item.title} item={item} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button as={Link} to="/expertise" variant="secondary">
              View All Expertise
            </Button>
          </div>
        </div>
      </motion.section>
      
      {/* Projects Summary Section */}
      <motion.section 
        className="py-16 lg:py-24 bg-off-white"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Featured Projects"
            subtitle="Take a look at some of our successfully completed projects across the Middle East and Africa."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {projectsData.slice(0, 4).map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button as={Link} to="/projects" variant="primary">
              See All Projects
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Clients Section */}
      <motion.section 
        className="py-16 lg:py-24 bg-white"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Respected Clients"
            subtitle="We are proud to have worked with leading organizations across the globe."
          />
          <div className="mt-12">
            <ClientCarousel />
          </div>
        </div>
      </motion.section>
    </div>
  );
};

/**
 * About Us Page Component
 */
const AboutPage = () => {
  return (
    <div className="font-body pt-24 md:pt-20">
      {/* Page Header */}
      <section className="py-24 bg-dark text-white relative" style={{ backgroundImage: "url('https://picsum.photos/seed/aboutheader/1920/400')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay', backgroundColor: 'rgba(0,0,0,0.6)' }}>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-5xl lg:text-6xl font-bold">About Us</h1>
          <p className="text-xl mt-4">Pioneering Engineering Solutions</p>
        </div>
      </section>

      {/* Main About Section */}
      <motion.section 
        className="py-16 lg:py-24 bg-white"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader
                title="Who We Are"
                subtitle="With a modest beginning in the UAE, Knights Engineering has transformed into a dynamic and fast-growing company, providing complete end-to-end solutions from conceptual design to commissioning."
                centered={false}
              />
              <p className="text-light my-6">
                Our commitment to delivering projects on time, within budget, and to the highest quality standards is demonstrated by our track record and motivated team. We foster a culture of safety, quality, and innovation in all our operations.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center font-semibold text-dark text-lg">
                  <FaChevronRight className="mr-3 text-primary" size={14} />
                  Dedicated Team Of Experts
                </li>
                <li className="flex items-center font-semibold text-dark text-lg">
                  <FaChevronRight className="mr-3 text-primary" size={14} />
                  Ahead of Time Delivery
                </li>
                <li className="flex items-center font-semibold text-dark text-lg">
                  <FaChevronRight className="mr-3 text-primary" size={14} />
                  Multi-industry Services Under One Group
                </li>
              </ul>
            </div>
            <motion.div 
              className="w-full h-80 lg:h-full min-h-[400px]"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src="https://picsum.photos/seed/aboutpage/600/500"
                alt="Our Team"
                className="w-full h-full object-cover rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Mission & Vision Section */}
      <motion.section 
        className="py-16 lg:py-24 bg-off-white bg-geometric-pattern"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -5 }} className="p-8 bg-white rounded-lg shadow-lg text-center">
              <FaLightbulb size={48} className="mx-auto text-primary mb-4" />
              <h3 className="font-heading text-2xl font-semibold mb-3">Our Mission</h3>
              <p className="text-light">To deliver high-quality, cost-effective projects safely and on schedule, while fostering long-term relationships with our clients.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="p-8 bg-white rounded-lg shadow-lg text-center">
              <FaProjectDiagram size={48} className="mx-auto text-primary mb-4" />
              <h3 className="font-heading text-2xl font-semibold mb-3">Our Vision</h3>
              <p className="text-light">To be the partner of choice for comprehensive engineering and construction solutions in the region and beyond.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="p-8 bg-white rounded-lg shadow-lg text-center">
              <FaUserCheck size={48} className="mx-auto text-primary mb-4" />
              <h3 className="font-heading text-2xl font-semibold mb-3">Our Values</h3>
              <p className="text-light">Integrity, Safety, Quality, and Innovation. These principles guide every decision we make and every action we take.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

/**
 * Expertise Page Component
 */
const ExpertisePage = () => {
  return (
    <div className="font-body pt-24 md:pt-20">
      {/* Page Header */}
      <section className="py-24 bg-dark text-white relative" style={{ backgroundImage: "url('https://picsum.photos/seed/expertiseheader/1920/400')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay', backgroundColor: 'rgba(0,0,0,0.6)' }}>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-5xl lg:text-6xl font-bold">Our Expertise</h1>
          <p className="text-xl mt-4">Delivering Comprehensive Engineering Solutions</p>
        </div>
      </section>
      
      {/* Expertise Grid Section */}
      <motion.section 
        className="py-16 lg:py-24 bg-off-white bg-geometric-pattern"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <SectionHeader
            title="What We Do"
            subtitle="Knights Engineering offers comprehensive solutions across a wide range of industries, playing a pivotal role in driving innovation, infrastructure development, and engineering excellence across the Middle East and beyond."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {expertiseData.map((item) => (
              <ExpertiseCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

/**
 * Projects Page Component
 */
const ProjectsPage = () => {
  return (
    <div className="font-body pt-24 md:pt-20">
      {/* Page Header */}
      <section className="py-24 bg-dark text-white relative" style={{ backgroundImage: "url('https://picsum.photos/seed/projectheader/1920/400')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay', backgroundColor: 'rgba(0,0,0,0.6)' }}>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-5xl lg:text-6xl font-bold">Our Projects</h1>
          <p className="text-xl mt-4">A Showcase of Our Successfully Completed Work</p>
        </div>
      </section>
      
      {/* Projects Grid Section */}
      <motion.section 
        className="py-16 lg:py-24 bg-white"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Project Portfolio"
            subtitle="Take a look at our successfully completed projects in the Middle East and Africa, showcasing our diverse capabilities and commitment to quality."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {projectsData.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
            {projectsData.slice(0, 4).map((project, index) => ( 
              <ProjectCard key={`dup-${index}`} project={{...project, img: `${project.img}?dup=${index}`}} />
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

/**
 * Contact Us Page Component
 */
const ContactPage = () => {
  return (
    <div className="font-body pt-24 md:pt-20">
      {/* Page Header */}
      <section className="py-24 bg-dark text-white relative" style={{ backgroundImage: "url('https://picsum.photos/seed/contactheader/1920/400')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay', backgroundColor: 'rgba(0,0,0,0.6)' }}>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-5xl lg:text-6xl font-bold">Contact Us</h1>
          <p className="text-xl mt-4">Get in Touch with Our Team</p>
        </div>
      </section>
      
      {/* Contact Form & Info Section */}
      <motion.section 
        className="py-16 lg:py-24 bg-white"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h3 className="font-heading text-3xl font-semibold mb-6">Send Us a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-dark mb-1">Name</label>
                    <input type="text" id="name" className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-dark mb-1">Email</label>
                    <input type="email" id="email" className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-dark mb-1">Subject</label>
                  <input type="text" id="subject" className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-dark mb-1">Message</label>
                  <textarea id="message" rows="6" className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"></textarea>
                </div>
                <div>
                  <Button type="submit" variant="primary" className="w-full py-4 text-lg">Send Message</Button>
                </div>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="font-heading text-3xl font-semibold mb-6">Contact Information</h3>
              <p className="text-light">We're open for any suggestion or just to have a chat. Feel free to reach out to us during our office hours.</p>
              
              <a href="#" className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300 group">
                <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-lg text-dark">Our Address</h4>
                  <p className="text-light group-hover:text-dark">P.O. Box: 23416, Sharjah, United Arab Emirates</p>
                </div>
              </a>
              <a href="tel:+97165343100" className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300 group">
                <FaPhone className="text-primary mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-lg text-dark">Call Us</h4>
                  <p className="text-light group-hover:text-dark">+971 6 5343100</p>
                </div>
              </a>
              <a href="mailto:info@knights.com" className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300 group">
                <FaEnvelope className="text-primary mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-lg text-dark">Email Us</h4>
                  <p className="text-light group-hover:text-dark">info@knights.com</p>
                </div>
              </a>
              
              {/* Embedded Map */}
              <div className="w-full h-64 bg-gray-200 rounded-lg shadow-inner overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230810.0232103595!2d55.20593444708703!3d25.321051910207086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5f5f24f76c0f%3A0x35663b0e7c36b447!2sSharjah!5e0!3m2!1sen!2sae!4v1698800000000!5m2!1sen!2sae"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

/**
 * Main App Component
 */
const App = () => {
  return (
    // Fragment used to avoid extra div
    <> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="expertise" element={<ExpertisePage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="contact" element={<ContactPage />} />
            {/* You can add a 404 Not Found page here */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;