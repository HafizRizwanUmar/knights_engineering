import React, { useState, useEffect, Fragment, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet, useLocation, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';

// --- ICONS ---
import { 
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaBars, FaTimes, FaChevronRight, 
  FaWarehouse, FaProjectDiagram, FaHammer, FaCogs, FaHardHat, FaTools, // Expertise Icons
  FaUserCheck, FaLightbulb, FaArrowRight,
  FaChevronLeft, FaArrowLeft, FaCommentDots, FaShieldAlt, FaStar, FaUsers,
  FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, // Social
  FaCalendarAlt, FaAward, FaGlobe, // Stats
  FaCheckCircle, FaExclamationTriangle, FaSpinner // Form Status
} from 'react-icons/fa';

// --- COMPANY CONFIGURATION ---
// !! IMPORTANT: Update these values !!
const COMPANY_PHONE_NUMBER = '+971555508499'; // International format
const COMPANY_EMAIL = 'info@knights.com';
const COMPANY_ADDRESS = 'P.O. Box: 23416, Sharjah, United Arab Emirates';
const COMPANY_LOGO_URL = 'https://i.ibb.co/3s6y0mD/knights-logo.png';
const COMPANY_WHATSAPP_NUMBER = '971555508499'; // No '+' or '00'. Just country code + number.
const SOCIAL_LINKS = {
  facebook: 'https://facebook.com',
  twitter: 'https://twitter.com',
  linkedin: 'https://linkedin.com',
  instagram: 'https://instagram.com',
};
// !! END CONFIGURATION !!


// --- I18N (INTERNATIONALIZATION) SETUP ---

const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      expertise: 'Services',
      projects: 'Projects',
      contact: 'Contact Us',
    },
    topBar: {
      phone: COMPANY_PHONE_NUMBER,
      email: COMPANY_EMAIL,
      address: 'Sharjah - United Arab Emirates',
      langToggle: 'العربية',
    },
    hero: {
      slide1Title: 'Knights Engineering',
      slide1Subtitle: 'Leading in Oil & Gas Tank Fabrication & Services.',
      slide2Title: 'Storage Solutions',
      slide2Subtitle: 'Delivering complex tank projects with precision and quality.',
      slide3Title: 'Turnkey Tank Services',
      slide3Subtitle: 'Your trusted partner from tank design to commissioning.',
      explore: 'Explore More',
    },
    home: {
      aboutTitle: 'About Knights Engineering',
      aboutSubtitle: 'With a modest beginning in the UAE, Knights Engineering has become a leader in oil and gas storage solutions, offering complete services from tank design and fabrication to maintenance and repair.',
      aboutBody: 'Our commitment to delivering projects on time, within budget, and to the highest API & ASME standards is demonstrated by our track record and motivated team.',
      aboutButton: 'Learn More About Us',
      whyChooseUsTitle: 'Why Choose Us',
      whyChooseUsSubtitle: 'Our unshakeable commitment to excellence, safety, and client satisfaction sets us apart.',
      whyChooseUsSafety: 'Safety First (HSE)',
      whyChooseUsSafetyDesc: 'An uncompromising culture of safety that protects our people, clients, and assets.',
      whyChooseUsQuality: 'API & ASME Certified',
      whyChooseUsQualityDesc: 'We adhere to the highest international standards, ensuring durable and reliable results.',
      whyChooseUsExpertise: 'Proven Expertise',
      whyChooseUsExpertiseDesc: 'A dedicated team of seasoned professionals driving innovation in every tank project.',
      statsTitle: 'Our Achievements',
      statsSubtitle: 'Numbers That Speak for Themselves',
      statsProjects: 'Tanks Fabricated',
      statsExperience: 'Years of Experience',
      statsClients: 'Satisfied Clients',
      statsGlobal: 'Countries Served',
      expertiseTitle: 'Our Services',
      expertiseSubtitle: 'We offer comprehensive solutions for the oil and gas storage industry, from fabrication to full-scale maintenance.',
      expertiseButton: 'View All Services',
      projectsTitle: 'Featured Projects',
      projectsSubtitle: 'Take a look at some of our successfully completed tank and terminal projects.',
      projectsButton: 'See All Projects',
      ctaTitle: "Let's Build Your Next Storage Solution",
      ctaSubtitle: 'Ready to start your next tank project with a trusted partner? Contact our team today to discuss your requirements.',
      ctaButton: 'Contact Us on WhatsApp',
      clientsTitle: 'Respected Clients',
      clientsSubtitle: 'We are proud to have worked with leading organizations in the oil and gas sector.',
    },
    about: {
      pageTitle: 'About Us',
      pageSubtitle: 'Pioneering Tank Storage Solutions',
      sectionTitle: 'Who We Are',
      sectionSubtitle: 'Knights Engineering has transformed into a dynamic and fast-growing company, specializing in end-to-end solutions for the oil and gas storage industry.',
      sectionBody: 'Our commitment to delivering projects on time, within budget, and to the highest quality standards (API 650, ASME) is demonstrated by our track record. We foster a culture of safety, quality, and innovation in all our operations.',
      listItem1: 'Dedicated Team Of Experts',
      listItem2: 'Ahead of Time Delivery',
      listItem3: 'Specialized Storage Solutions',
      missionTitle: 'Our Mission',
      missionDesc: 'To deliver high-quality, cost-effective tank projects safely and on schedule, while fostering long-term relationships with our clients.',
      visionTitle: 'Our Vision',
      visionDesc: 'To be the partner of choice for comprehensive tank fabrication and repair solutions in the region and beyond.',
      valuesTitle: 'Our Values',
      valuesDesc: 'Integrity, Safety, Quality, and Innovation. These principles guide every decision we make and every action we take.',
    },
    expertise: {
      pageTitle: 'Our Services',
      pageSubtitle: 'Delivering Comprehensive Storage Tank Solutions',
      sectionTitle: 'What We Do',
      sectionSubtitle: 'Knights Engineering offers specialized solutions for the oil and gas storage industry, from new fabrication to maintenance and repair.',
      readMore: 'READ MORE',
    },
    // New Tank Service Names
    expertiseServices: {
      tankFabricationTitle: 'Tank Fabrication (API 650)',
      tankFabricationDesc: 'Full-range fabrication of storage tanks, adhering strictly to API 650 standards.',
      tankDesignTitle: 'Tank Design & Engineering',
      tankDesignDesc: 'In-house design & engineering for tanks, foundations, and terminals.',
      tankRepairTitle: 'Tank Repair & Maintenance',
      tankRepairDesc: 'Comprehensive repair, maintenance, and modification services for existing tanks.',
      customFabricationTitle: 'Custom Steel Fabrication',
      customFabricationDesc: 'State-of-the-art fabrication of custom steel components, structures, and skids.',
      civilWorksTitle: 'Foundation & Civil Works',
      civilWorksDesc: 'Construction of tank foundations, bund walls, and related civil infrastructure.',
      mepWorksTitle: 'Tank Terminal (MEP)',
      mepWorksDesc: 'Piping, instrumentation, and electrical works for complete tank terminals.',
    },
    expertiseDetail: {
      backButton: 'Back to All Services',
      notFound: 'Service not found.',
      notFoundSubtitle: 'The service you are looking for does not exist.',
      // New Detail Descriptions
      tankFabrication: "Our core expertise lies in the complete fabrication of Aboveground Storage Tanks (ASTs) adhering to API 650 and API 620 standards. We manage the entire process, from material procurement and plate cutting to welding, assembly, and testing. Our state-of-the-art facilities and certified welders ensure the highest quality for fixed roof, floating roof, and custom-designed tanks.",
      tankDesign: "Our in-house design and engineering team utilizes the latest software, including E-TANK and COMPRESS, to deliver robust and cost-effective solutions. We provide detailed calculations, fabrication drawings, and finite element analysis (FEA) for tanks, pressure vessels, and their foundations, ensuring full compliance with international codes.",
      tankRepair: "We are specialists in the inspection, repair, and maintenance of existing storage tanks. Our services include tank jacking, bottom plate replacement, shell repairs, roof modifications (e.g., converting fixed to floating), and nozzle additions. We work to minimize downtime and extend the operational life of your assets safely and efficiently.",
      customFabrication: "Beyond tanks, our steel fabrication division handles a wide range of custom projects. This includes pressure vessels (ASME U Stamp), process skids, pipe racks, and structural steel for industrial plants. Our CWB/AWS certified team delivers precision-engineered products tailored to your exact specifications.",
      civilWorks: "A stable tank requires a solid foundation. We provide complete civil and foundation works, including soil analysis, ring beam foundations, raft foundations, and pile foundations. We also construct bund walls, containment areas, and related terminal infrastructure to meet all environmental and safety standards.",
      mepWorks: "We deliver complete Mechanical, Electrical, and Piping (MEP) solutions for tank terminals. This includes interconnecting pipe works, fire protection systems, foam systems, instrumentation, and electrical hook-ups. Our integrated approach ensures all components work seamlessly as a complete system.",
    },
    projects: {
      pageTitle: 'Our Projects',
      pageSubtitle: 'A Showcase of Our Successfully Completed Work',
      sectionTitle: 'Project Portfolio',
      sectionSubtitle: 'Take a look at our successfully completed projects in the oil and gas storage sector.',
      // New Project Names
      proj1: 'Storage Terminals',
      proj2: 'Pressure Vessels (ASME)',
      proj3: 'Tank Farm Piping',
      proj4: 'Floating Roof Tanks',
      proj5: 'Cryogenic Tanks (LNG)',
      proj6: 'Marine Loading Arms',
      proj7: 'Tank Repair Projects',
      proj8: 'Skid Mounted Systems',
    },
    contact: {
      pageTitle: 'Contact Us',
      pageSubtitle: 'Get in Touch with Our Team',
      formTitle: 'Send a Message or Request a Quote',
      formName: 'Full Name',
      formEmail: 'Email Address',
      formPhone: 'Phone Number',
      formService: 'Service of Interest',
      formServicePlaceholder: 'Select a service...',
      formServiceGeneral: 'General Inquiry',
      formSubject: 'Subject',
      formMessage: 'Your Message',
      formButton: 'Send Message',
      formButtonSubmitting: 'Sending...',
      formSuccessTitle: 'Message Sent!',
      formSuccessBody: 'Thank you for contacting us. We will get back to you shortly.',
      formErrorTitle: 'Something went wrong.',
      formErrorBody: 'Please try again later or contact us directly via email.',
      infoTitle: 'Contact Information',
      infoSubtitle: "We're open for any suggestion or just to have a chat. Feel free to reach out to us during our office hours.",
      infoAddressTitle: 'Our Address',
      infoAddressDesc: COMPANY_ADDRESS,
      infoCallTitle: 'Call Us',
      infoCallDesc: COMPANY_PHONE_NUMBER,
      infoEmailTitle: 'Email Us',
      infoEmailDesc: COMPANY_EMAIL,
    },
    footer: {
      about: 'Knights Engineering is a dynamic and fast-growing company specializing in end-to-end solutions for oil and gas storage tanks.',
      links: 'Quick Links',
      contact: 'Contact Company',
      contactAddress: COMPANY_ADDRESS,
      contactPhone: COMPANY_PHONE_NUMBER,
      contactEmail: COMPANY_EMAIL,
      newsletter: 'Newsletter',
      newsletterDesc: 'Get updates about our latest projects and innovations.',
      newsletterPlaceholder: 'Your Email Address',
      follow: 'Follow Us',
      copyright: 'Knights Engineering. All Rights Reserved.',
    },
    chat: {
      button: 'Chat with Us',
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      expertise: 'خدماتنا',
      projects: 'مشاريعنا',
      contact: 'اتصل بنا',
    },
    topBar: {
      phone: COMPANY_PHONE_NUMBER,
      email: COMPANY_EMAIL,
      address: 'الشارقة - الإمارات العربية المتحدة',
      langToggle: 'English',
    },
    hero: {
      slide1Title: 'نايتس الهندسية',
      slide1Subtitle: 'رواد تصنيع وخدمات خزانات النفط والغاز.',
      slide2Title: 'حلول التخزين',
      slide2Subtitle: 'تنفيذ مشاريع الخزانات المعقدة بدقة وجودة عالية.',
      slide3Title: 'خدمات خزانات متكاملة',
      slide3Subtitle: 'شريكك الموثوق من تصميم الخزان حتى التشغيل.',
      explore: 'اكتشف المزيد',
    },
    home: {
      aboutTitle: 'عن نايتس الهندسية',
      aboutSubtitle: 'من بداية متواضعة في الإمارات، أصبحت نايتس الهندسية رائدة في حلول تخزين النفط والغاز، مقدمة خدمات متكاملة من تصميم وتصنيع الخزانات إلى الصيانة والإصلاح.',
      aboutBody: 'التزامنا بتسليم المشاريع في الوقت المحدد، ضمن الميزانية، وبأعلى معايير API و ASME، يظهره سجل إنجازاتنا وفريقنا المتحمس.',
      aboutButton: 'اعرف المزيد عنا',
      whyChooseUsTitle: 'لماذا تختارنا؟',
      whyChooseUsSubtitle: 'التزامنا الراسخ بالتميز والسلامة ورضا العملاء يميزنا.',
      whyChooseUsSafety: 'السلامة أولاً (HSE)',
      whyChooseUsSafetyDesc: 'ثقافة سلامة لا تقبل التهاون تحمي موظفينا وعملائنا وأصولنا.',
      whyChooseUsQuality: 'معتمدون (API & ASME)',
      whyChooseUsQualityDesc: 'نلتزم بأعلى المعايير الدولية، مما يضمن نتائج متينة وموثوقة.',
      whyChooseUsExpertise: 'خبرة مثبتة',
      whyChooseUsExpertiseDesc: 'فريق متخصص من المحترفين المتمرسين يقود الابتكار في كل مشروع خزان.',
      statsTitle: 'إنجازاتنا',
      statsSubtitle: 'أرقام تتحدث عن نفسها',
      statsProjects: 'خزان تم تصنيعه',
      statsExperience: 'سنة من الخبرة',
      statsClients: 'عميل راضٍ',
      statsGlobal: 'دولة خدمناها',
      expertiseTitle: 'خدماتنا',
      expertiseSubtitle: 'نقدم حلولاً شاملة لصناعة تخزين النفط والغاز، من التصنيع إلى الصيانة الكاملة.',
      expertiseButton: 'عرض كل الخدمات',
      projectsTitle: 'مشاريع مختارة',
      projectsSubtitle: 'ألق نظرة على بعض مشاريع الخزانات والمحطات المنجزة بنجاح.',
      projectsButton: 'عرض كل المشاريع',
      ctaTitle: 'لنبدأ بناء حل التخزين القادم لك',
      ctaSubtitle: 'هل أنت مستعد لبدء مشروعك القادم مع شريك موثوق؟ اتصل بفريقنا اليوم لمناقشة متطلباتك.',
      ctaButton: 'تواصل معنا عبر واتساب',
      clientsTitle: 'عملاؤنا الكرام',
      clientsSubtitle: 'نحن فخورون بالعمل مع مؤسسات رائدة في قطاع النفط والغاز.',
    },
    about: {
      pageTitle: 'من نحن',
      pageSubtitle: 'رواد حلول تخزين الخزانات',
      sectionTitle: 'من نحن',
      sectionSubtitle: 'تحولت نايتس الهندسية إلى شركة ديناميكية سريعة النمو، متخصصة في الحلول المتكاملة لصناعة تخزين النفط والغاز.',
      sectionBody: 'التزامنا بتسليم المشاريع في الوقت المحدد، ضمن الميزانية، وبأعلى معايير الجودة (API 650, ASME)، يظهره سجل إنجازاتنا. نحن نعزز ثقافة السلامة والجودة والابتكار في جميع عملياتنا.',
      listItem1: 'فريق متخصص من الخبراء',
      listItem2: 'التسليم قبل الموعد',
      listItem3: 'حلول تخزين متخصصة',
      missionTitle: 'مهمتنا',
      missionDesc: 'تقديم مشاريع خزانات عالية الجودة وفعالة من حيث التكلفة بأمان وفي الموعد، مع بناء علاقات طويلة الأمد مع عملائنا.',
      visionTitle: 'رؤيتنا',
      visionDesc: 'أن نكون الشريك المفضل لحلول تصنيع وإصلاح الخزانات الشاملة في المنطقة وخارجها.',
      valuesTitle: 'قيمنا',
      valuesDesc: 'النزاهة، السلامة، الجودة، والابتكار. هذه المبادئ توجه كل قرار نتخذه وكل إجراء نقوم به.',
    },
    expertise: {
      pageTitle: 'خدماتنا',
      pageSubtitle: 'تقديم حلول خزانات تخزين شاملة',
      sectionTitle: 'ماذا نفعل',
      sectionSubtitle: 'تقدم نايتس الهندسية حلولاً متخصصة لصناعة تخزين النفط والغاز، من التصنيع الجديد إلى الصيانة والإصلاح.',
      readMore: 'اقرأ المزيد',
    },
    // New Tank Service Names (Arabic)
    expertiseServices: {
      tankFabricationTitle: 'تصنيع الخزانات (API 650)',
      tankFabricationDesc: 'تصنيع متكامل لخزانات التخزين، مع الالتزام الصارم بمعايير API 650.',
      tankDesignTitle: 'تصميم وهندسة الخزانات',
      tankDesignDesc: 'تصميم وهندسة داخلية للخزانات، الأساسات، والمحطات.',
      tankRepairTitle: 'إصلاح وصيانة الخزانات',
      tankRepairDesc: 'خدمات إصلاح وصيانة وتعديل شاملة للخزانات القائمة.',
      customFabricationTitle: 'تصنيع فولاذي مخصص',
      customFabricationDesc: 'تصنيع متطور لمكونات وهياكل ومنصات فولاذية مخصصة.',
      civilWorksTitle: 'الأعمال المدنية والأساسات',
      civilWorksDesc: 'إنشاء أساسات الخزانات، جدران الاحتواء، والبنية التحتية المدنية ذات الصلة.',
      mepWorksTitle: 'أعمال كهروميكانيكية (محطات)',
      mepWorksDesc: 'أعمال الأنابيب، الأجهزة، والأعمال الكهربائية لمحطات الخزانات المتكاملة.',
    },
    expertiseDetail: {
      backButton: 'العودة إلى كل الخدمات',
      notFound: 'الخدمة غير موجودة.',
      notFoundSubtitle: 'الخدمة التي تبحث عنها غير موجودة.',
      // New Detail Descriptions (Arabic)
      tankFabrication: "تكمن خبرتنا الأساسية في التصنيع الكامل لخزانات التخزين السطحية (ASTs) المتوافقة مع معايير API 650 و API 620. ندير العملية برمتها، من شراء المواد وقطع الألواح إلى اللحام والتجميع والاختبار. تضمن مرافقنا الحديثة واللحامون المعتمدون أعلى مستويات الجودة للخزانات ذات السقف الثابت والسقف العائم والمصممة خصيصًا.",
      tankDesign: "يستخدم فريق التصميم والهندسة الداخلي لدينا أحدث البرامج، بما في ذلك E-TANK و COMPRESS، لتقديم حلول قوية وفعالة من حيث التكلفة. نقدم حسابات مفصلة ورسومات تصنيع وتحليل العناصر المحدودة (FEA) للخزانات وأوعية الضغط وأساساتها، مما يضمن الامتثال الكامل للمعايير الدولية.",
      tankRepair: "نحن متخصصون في فحص وإصلاح وصيانة خزانات التخزين القائمة. تشمل خدماتنا رفع الخزانات (jacking)، واستبدال الألواح السفلية، وإصلاحات الهيكل، وتعديلات السقف (مثل تحويل السقف الثابت إلى عائم)، وإضافة الفوهات. نعمل على تقليل وقت التوقف عن العمل وإطالة العمر التشغيلي لأصولك بأمان وكفاءة.",
      customFabrication: "إلى جانب الخزانات، يتعامل قسم تصنيع الصلب لدينا مع مجموعة واسعة من المشاريع المخصصة. ويشمل ذلك أوعية الضغط (ASME U Stamp)، والمنصات (skids)، ورفوف الأنابيب، والصلب الإنشائي للمصانع الصناعية. يقدم فريقنا المعتمد من CWB/AWS منتجات مصممة بدقة ومصممة خصيصًا لمواصفاتك الدقيقة.",
      civilWorks: "الخزان المستقر يتطلب أساسًا متينًا. نحن نقدم أعمالًا مدنية وأساسات كاملة، بما في ذلك تحليل التربة، وأساسات الحلقة، والأساسات الخرسانية، وأساسات الركائز. كما نقوم ببناء جدران الاحتواء ومناطق الاحتواء والبنية التحتية للمحطة ذات الصلة لتلبية جميع المعايير البيئية ومعايير السلامة.",
      mepWorks: "نقدم حلولاً ميكانيكية وكهربائية وأنابيب (MEP) كاملة لمحطات الخزانات. ويشمل ذلك أعمال الأنابيب المترابطة، وأنظمة الحماية من الحرائق، وأنظمة الرغوة، والأجهزة، والتوصيلات الكهربائية. يضمن نهجنا المتكامل أن تعمل جميع المكونات بسلاسة كنظام كامل.",
    },
    projects: {
      pageTitle: 'مشاريعنا',
      pageSubtitle: 'استعراض لأعمالنا المنجزة بنجاح',
      sectionTitle: 'ملف المشاريع',
      sectionSubtitle: 'ألق نظرة على مشاريعنا المنجزة بنجاح في قطاع تخزين النفط والغاز.',
      // New Project Names (Arabic)
      proj1: 'محطات تخزين',
      proj2: 'أوعية ضغط (ASME)',
      proj3: 'أنابيب مزارع الخزانات',
      proj4: 'خزانات السقف العائم',
      proj5: 'خزانات التبريد (LNG)',
      proj6: 'أذرع تحميل بحرية',
      proj7: 'مشاريع إصلاح خزانات',
      proj8: 'أنظمة محمولة (Skids)',
    },
    contact: {
      pageTitle: 'اتصل بنا',
      pageSubtitle: 'تواصل مع فريقنا',
      formTitle: 'أرسل رسالة أو اطلب عرض سعر',
      formName: 'الاسم الكامل',
      formEmail: 'البريد الإلكتروني',
      formPhone: 'رقم الهاتف',
      formService: 'الخدمة المطلوبة',
      formServicePlaceholder: 'اختر خدمة...',
      formServiceGeneral: 'استفسار عام',
      formSubject: 'الموضوع',
      formMessage: 'رسالتك',
      formButton: 'إرسال الرسالة',
      formButtonSubmitting: 'جارٍ الإرسال...',
      formSuccessTitle: 'تم إرسال الرسالة!',
      formSuccessBody: 'شكراً لتواصلك معنا. سنقوم بالرد عليك قريباً.',
      formErrorTitle: 'حدث خطأ ما.',
      formErrorBody: 'يرجى المحاولة مرة أخرى لاحقاً أو الاتصال بنا مباشرة عبر البريد الإلكتروني.',
      infoTitle: 'معلومات الاتصال',
      infoSubtitle: 'نحن منفتحون على أي اقتراح أو لمجرد الدرشة. لا تتردد في التواصل معنا خلال ساعات العمل.',
      infoAddressTitle: 'عنواننا',
      infoAddressDesc: COMPANY_ADDRESS,
      infoCallTitle: 'اتصل بنا',
      infoCallDesc: COMPANY_PHONE_NUMBER,
      infoEmailTitle: 'راسلنا عبر البريد',
      infoEmailDesc: COMPANY_EMAIL,
    },
    footer: {
      about: 'نايتس الهندسية شركة ديناميكية سريعة النمو متخصصة في الحلول المتكاملة لخزانات تخزين النفط والغاز.',
      links: 'روابط سريعة',
      contact: 'اتصل بالشركة',
      contactAddress: COMPANY_ADDRESS,
      contactPhone: COMPANY_PHONE_NUMBER,
      contactEmail: COMPANY_EMAIL,
      newsletter: 'النشرة الإخبارية',
      newsletterDesc: 'احصل على تحديثات حول أحدث مشاريعنا وابتكاراتنا.',
      newsletterPlaceholder: 'بريدك الإلكتروني',
      follow: 'تابعنا',
      copyright: 'نايتس الهندسية. جميع الحقوق محفوظة.',
    },
    chat: {
      button: 'تحدث معنا',
    }
  },
};

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  const t = (key) => {
    const keys = key.split('.');
    let result = translations[locale];
    for (const k of keys) {
      result = result[k];
      if (!result) {
        // Fallback to English if translation is missing
        let fallback = translations['en'];
        for (const fk of keys) {
          fallback = fallback[fk];
        }
        return fallback || key;
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useTranslation = () => useContext(LanguageContext);

// --- DATA CONSTANTS (UPGRADED FOR NICHE) ---

const navLinks = [
  { nameKey: 'nav.home', href: '/' },
  { nameKey: 'nav.about', href: '/about' },
  { nameKey: 'nav.expertise', href: '/expertise' },
  { nameKey: 'nav.projects', href: '/projects' },
  { nameKey: 'nav.contact', href: '/contact' },
];

const heroSlides = [
  {
    img: 'images/hero1.jpg', // oil refinery
    titleKey: 'hero.slide1Title',
    subtitleKey: 'hero.slide1Subtitle',
  },
  {
    img: 'images/hero4.jpg', // storage tank
    titleKey: 'hero.slide2Title',
    subtitleKey: 'hero.slide2Subtitle',
  },
  {
    img: 'images/hero3.jpg', // tank farm
    titleKey: 'hero.slide3Title',
    subtitleKey: 'hero.slide3Subtitle',
  },
];

// --- UPGRADED EXPERTISE DATA (NICHE FOCUSED) ---
const expertiseData = [
  { 
    slug: 'tank-fabrication',
    titleKey: 'expertiseServices.tankFabricationTitle', 
    descriptionKey: 'expertiseServices.tankFabricationDesc', 
    icon: <FaWarehouse size={24} />, 
    img: 'https://picsum.photos/seed/tankfabrication/600/400',
    detailImg: 'https://picsum.photos/seed/tankfabrication-detail/1920/600',
    detailDescriptionKey: 'expertiseDetail.tankFabrication' // <-- ERROR FIX: Relative key
  },
  { 
    slug: 'tank-design-engineering',
    titleKey: 'expertiseServices.tankDesignTitle', 
    descriptionKey: 'expertiseServices.tankDesignDesc', 
    icon: <FaProjectDiagram size={24} />, 
    img: 'https://picsum.photos/seed/engineeringblueprint/600/400',
    detailImg: 'https://picsum.photos/seed/design-detail/1920/600',
    detailDescriptionKey: 'expertiseDetail.tankDesign' // <-- ERROR FIX: Relative key
  },
  { 
    slug: 'tank-repair-maintenance',
    titleKey: 'expertiseServices.tankRepairTitle', 
    descriptionKey: 'expertiseServices.tankRepairDesc', 
    icon: <FaHammer size={24} />, 
    img: 'https://picsum.photos/seed/tankmaintenance/600/400',
    detailImg: 'https://picsum.photos/seed/offshore-detail/1920/600',
    detailDescriptionKey: 'expertiseDetail.tankRepair' // <-- ERROR FIX: Relative key
  },
  { 
    slug: 'custom-steel-fabrication',
    titleKey: 'expertiseServices.customFabricationTitle', 
    descriptionKey: 'expertiseServices.customFabricationDesc', 
    icon: <FaCogs size={24} />, 
    img: 'https://picsum.photos/seed/welding/600/400',
    detailImg: 'https://picsum.photos/seed/steel-detail/1920/600',
    detailDescriptionKey: 'expertiseDetail.customFabrication' // <-- ERROR FIX: Relative key
  },
  { 
    slug: 'foundation-civil-works',
    titleKey: 'expertiseServices.civilWorksTitle', 
    descriptionKey: 'expertiseServices.civilWorksDesc', 
    icon: <FaHardHat size={24} />, 
    img: 'https://picsum.photos/seed/concretefoundation/600/400',
    detailImg: 'https://picsum.photos/seed/civil-detail/1920/600',
    detailDescriptionKey: 'expertiseDetail.civilWorks' // <-- ERROR FIX: Relative key
  },
  { 
    slug: 'tank-terminal-mep',
    titleKey: 'expertiseServices.mepWorksTitle', 
    descriptionKey: 'expertiseServices.mepWorksDesc', 
    icon: <FaTools size={24} />, 
    img: 'https://picsum.photos/seed/industrialpipes/600/400',
    detailImg: 'https://picsum.photos/seed/mep-detail/1920/600',
    detailDescriptionKey: 'expertiseDetail.mepWorks' // <-- ERROR FIX: Relative key
  },
];
// --- END UPGRADED DATA ---

const projectsData = [
  { img: 'https://picsum.photos/seed/storageterminal/400/300', titleKey: 'projects.proj1' },
  { img: 'https://picsum.photos/seed/pressurevessel/400/300', titleKey: 'projects.proj2' },
  { img: 'https://picsum.photos/seed/tankpiping/400/300', titleKey: 'projects.proj3' },
  { img: 'https://picsum.photos/seed/floatingroof/400/300', titleKey: 'projects.proj4' },
  { img: 'https://picsum.photos/seed/cryotank/400/300', titleKey: 'projects.proj5' },
  { img: 'https://picsum.photos/seed/loadingarm/400/300', titleKey: 'projects.proj6' },
  { img: 'https://picsum.photos/seed/tankrepair/400/300', titleKey: 'projects.proj7' },
  { img: 'https://picsum.photos/seed/skid/400/300', titleKey: 'projects.proj8' },
];

const clientLogos = [
  'https://via.placeholder.com/150x60/ffffff/cccccc?text=ADNOC',
  'https://via.placeholder.com/150x60/ffffff/cccccc?text=ENOC',
  'https://via.placeholder.com/150x60/ffffff/cccccc?text=Trafigura',
  'https://via.placeholder.com/150x60/ffffff/cccccc?text=VOPAK',
  'https://via.placeholder.com/150x60/ffffff/cccccc?text=EMDAD',
  'https://via.placeholder.com/150x60/ffffff/cccccc?text=SHELL',
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
      ease: [0.6, 0.05, 0.01, 0.9]
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
 * Scroll to Top Utility
 */
const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

/**
 * Upgraded Button Component (RTL Aware)
 */
const Button = ({ children, variant = 'primary', className = '', as = 'button', ...props }) => {
  const { locale } = useTranslation();
  const styles = {
    primary: `bg-primary text-white hover:bg-red-700 disabled:bg-gray-400`,
    secondary: `bg-off-white text-primary border border-primary hover:bg-gray-100 disabled:bg-gray-300`,
  };
  const Tag = as;
  
  const ArrowIcon = locale === 'ar' ? FaArrowLeft : FaArrowRight;

  return (
    <motion.div whileHover={props.disabled ? {} : { scale: 1.03 }} whileTap={props.disabled ? {} : { scale: 0.98 }}>
      <Tag
        className={`py-3 px-7 rounded font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 group inline-flex items-center justify-center gap-2 ${styles[variant]} ${className}`}
        {...props}
      >
        {children}
        {!props.disabled && <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" size={12} />}
      </Tag>
    </motion.div>
  );
};

/**
 * Upgraded Section Header Component (RTL Aware)
 */
const SectionHeader = ({ title, subtitle, centered = true }) => (
  <div className={centered ? 'text-center' : 'text-left rtl:text-right'}>
    <h2 className="font-heading text-4xl lg:text-5xl font-bold text-dark mb-4">{title}</h2>
    <p className={`text-lg text-light max-w-3xl ${centered ? 'mx-auto' : ''}`}>{subtitle}</p>
    <div className={`flex ${centered ? 'justify-center' : 'justify-start rtl:justify-end'} mt-4`}>
      <div className="w-24 h-1 bg-secondary"></div>
    </div>
  </div>
);

/**
 * Upgraded Expertise Card (i18n & Linking)
 */
const ExpertiseCard = ({ item }) => {
  const { t, locale } = useTranslation();
  const ChevronIcon = locale === 'ar' ? FaChevronLeft : FaChevronRight;

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg overflow-hidden group flex flex-col"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="relative">
        <img src={item.img} alt={t(item.titleKey)} className="w-full h-56 object-cover" />
        <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-primary text-white p-3 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110">
          {item.icon}
        </div>
      </div>
      <div className="p-6 text-left rtl:text-right flex flex-col flex-grow">
        <h3 className="font-heading text-2xl font-semibold text-dark mb-3">{t(item.titleKey)}</h3>
        <p className="font-body text-light mb-5 flex-grow">{t(item.descriptionKey)}</p>
        <Link
          to={`/expertise/${item.slug}`} 
          className="font-semibold text-primary hover:text-red-700 transition-colors duration-300 group inline-flex items-center"
        >
          {t('expertise.readMore')} 
          <ChevronIcon className="ms-2 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" size={12} />
        </Link>
      </div>
    </motion.div>
  );
};

/**
 * Upgraded Project Card (i18n)
 */
const ProjectCard = ({ project }) => {
  const { t } = useTranslation();
  return (
    <motion.div 
      className="relative rounded-lg overflow-hidden shadow-lg group aspect-w-4 aspect-h-3"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      <img
        src={project.img}
        alt={t(project.titleKey)}
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ease-in-out flex items-end p-6">
        <h3 className="font-heading text-white text-2xl font-semibold transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          {t(project.titleKey)}
        </h3>
      </div>
    </motion.div>
  );
};

/**
 * Client Logo Carousel
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

// --- NEW COMPONENTS ---

/**
 * NEW: Social Media Links
 */
const SocialMediaLinks = ({ className = '' }) => (
  <div className={`flex space-x-4 rtl:space-x-reverse ${className}`}>
    <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-current hover:text-primary transition-colors duration-300">
      <FaFacebookF />
    </a>
    <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-current hover:text-primary transition-colors duration-300">
      <FaTwitter />
    </a>
    <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-current hover:text-primary transition-colors duration-300">
      <FaLinkedinIn />
    </a>
    <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-current hover:text-primary transition-colors duration-300">
      <FaInstagram />
    </a>
  </div>
);


/**
 * NEW: Chat Widget (WhatsApp Integration)
 */
const ChatWidget = () => {
  const { t } = useTranslation();
  const whatsappLink = `https://wa.me/${COMPANY_WHATSAPP_NUMBER}`;
  
  return (
    <motion.a
      href={whatsappLink} 
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center gap-3 group"
      whileHover={{ scale: 1.05, width: 'auto' }}
      whileTap={{ scale: 0.95 }}
      initial={{ width: 56, opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <FaCommentDots size={24} />
      <span className="hidden group-hover:block overflow-hidden whitespace-nowrap font-semibold">{t('chat.button')}</span>
    </motion.a>
  )
}

/**
 * NEW: Why Choose Us Section Component
 */
const WhyChooseUsSection = () => {
  const { t } = useTranslation();

  const items = [
    { 
      icon: <FaShieldAlt size={32} className="text-primary" />,
      titleKey: 'home.whyChooseUsSafety',
      descKey: 'home.whyChooseUsSafetyDesc'
    },
    { 
      icon: <FaStar size={32} className="text-primary" />,
      titleKey: 'home.whyChooseUsQuality',
      descKey: 'home.whyChooseUsQualityDesc'
    },
    { 
      icon: <FaUsers size={32} className="text-primary" />,
      titleKey: 'home.whyChooseUsExpertise',
      descKey: 'home.whyChooseUsExpertiseDesc'
    },
  ];

  return (
    <motion.section
      className="py-16 lg:py-24 bg-white"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4">
        <SectionHeader
          title={t('home.whyChooseUsTitle')}
          subtitle={t('home.whyChooseUsSubtitle')}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="text-center p-6 group"
              whileHover={{ y: -5 }}
            >
              <div className="inline-flex items-center justify-center p-5 bg-red-50 rounded-full mb-5 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                {React.cloneElement(item.icon, { className: 'text-primary transition-all duration-300 group-hover:text-white' })}
              </div>
              <h3 className="font-heading text-2xl font-semibold text-dark mb-3">{t(item.titleKey)}</h3>
              <p className="font-body text-light">{t(item.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

/**
 * NEW: Animated Counter for Stats Section
 */
const AnimatedCounter = ({ value }) => {
  const [isInView, setIsInView] = useState(false);
  const spring = useSpring(0, {
    mass: 0.8,
    stiffness: 75,
    damping: 15,
  });
  const display = useTransform(spring, (current) => Math.floor(current));

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [spring, value, isInView]);

  return (
    <motion.span
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true }}
    >
      {display}
    </motion.span>
  );
};

/**
 * NEW: Stats Section
 */
const StatsSection = () => {
  const { t } = useTranslation();
  const stats = [
    { value: 450, titleKey: 'home.statsProjects', icon: <FaWarehouse size={40} /> },
    { value: 25, titleKey: 'home.statsExperience', icon: <FaCalendarAlt size={40} /> },
    { value: 300, titleKey: 'home.statsClients', icon: <FaAward size={40} /> },
    { value: 8, titleKey: 'home.statsGlobal', icon: <FaGlobe size={40} /> },
  ];

  return (
    <motion.section
      className="py-20 lg:py-24 bg-dark text-white"
      style={{ backgroundImage: "url('https://picsum.photos/seed/welding sparks/1920/400')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay', backgroundColor: 'rgba(20, 20, 20, 0.90)' }}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4">
        <SectionHeader
          title={t('home.statsTitle')}
          subtitle={t('home.statsSubtitle')}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-primary mb-3">{stat.icon}</div>
              <h3 className="font-heading text-5xl font-bold mb-2">
                <AnimatedCounter value={stat.value} />+
              </h3>
              <p className="font-body text-lg text-gray-300">{t(stat.titleKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};


/**
 * NEW: Call to Action (CTA) Section (WhatsApp Integration)
 */
const CallToActionSection = () => {
  const { t } = useTranslation();
  const whatsappLink = `https://wa.me/${COMPANY_WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Knights Engineering, I'd like to get a quote.")}`;

  return (
    <motion.section
      className="py-20 lg:py-24 bg-primary text-white"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading text-4xl lg:text-5xl font-bold mb-6">{t('home.ctaTitle')}</h2>
        <p className="font-body text-lg text-gray-200 max-w-3xl mx-auto mb-10">{t('home.ctaSubtitle')}</p>
        <Button 
          as="a" 
          href={whatsappLink} 
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary" 
          className="py-3 px-8 text-lg rounded-full !bg-white !text-primary hover:!bg-gray-100"
        >
          {t('home.ctaButton')}
        </Button>
      </div>
    </motion.section>
  );
};


// --- LAYOUT COMPONENTS (UPGRADED) ---

/**
 * 1. Upgraded Header Component (Logo, i18n, Language Toggler, Social, RTL)
 */
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { t, locale, setLocale } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'ar' : 'en');
  };

  const navLinkClass = ({ isActive }) =>
    `relative py-2 font-body font-medium transition-colors duration-300 ${
      isActive ? 'text-primary' : 'text-dark hover:text-primary'
    } after:content-[''] after:absolute after:left-0 rtl:after:left-auto rtl:after:right-0 after:bottom-0 after:h-0.5 after:transition-all after:duration-300 ${
      isActive ? 'after:w-full after:bg-primary' : 'after:w-0 after:bg-secondary'
    } hover:after:w-full`;
    
  const mobileNavLinkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-base font-medium text-right rtl:text-right ${
      isActive ? 'bg-red-50 text-primary' : 'text-dark hover:bg-gray-100 hover:text-primary'
    }`;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out font-body ${
      isSticky ? 'shadow-lg bg-white/95 backdrop-blur-sm' : 'bg-white'
    }`}>
      {/* Top Bar */}
      <div className="bg-dark text-gray-300 py-2 px-4 md:px-8 lg:px-12 hidden md:flex justify-between items-center text-xs">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <button 
            onClick={toggleLocale} 
            className="font-semibold text-white hover:text-primary transition-colors duration-300"
            aria-label="Change language"
          >
            {t('topBar.langToggle')}
          </button>
          <span className="border-l rtl:border-l-0 rtl:border-r border-gray-600 h-4"></span>
          <SocialMediaLinks className="text-white" />
        </div>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <a href={`tel:${t('topBar.phone')}`} className="flex items-center hover:text-white">
            <FaPhone className="me-2" /> {t('topBar.phone')}
          </a>
          <a href={`mailto:${t('topBar.email')}`} className="flex items-center hover:text-white">
            <FaEnvelope className="me-2" /> {t('topBar.email')}
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="relative py-4 px-4 md:px-8 lg:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={COMPANY_LOGO_URL} alt="Knights Engineering Logo" className="h-10 lg:h-12 w-auto" />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
          {navLinks.map((link) => (
            <NavLink key={link.nameKey} to={link.href} className={navLinkClass}>
              {t(link.nameKey)}
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
                  key={link.nameKey}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={mobileNavLinkClass}
                >
                  {t(link.nameKey)}
                </NavLink>
              ))}
               <button 
                onClick={() => {
                  toggleLocale();
                  setIsOpen(false);
                }} 
                className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:bg-gray-100 hover:text-primary text-left rtl:text-right"
              >
                {t('topBar.langToggle')}
              </button>
              <div className="pt-2 px-3">
                <SocialMediaLinks className="text-dark" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

/**
 * 7. Upgraded Footer Component (i18n, RTL, Social)
 */
const Footer = () => {
  const { t, locale } = useTranslation();
  const ChevronIcon = locale === 'ar' ? FaChevronLeft : FaChevronRight;

  return (
    <footer className="bg-dark font-body text-left rtl:text-right">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16 text-gray-400">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: About */}
          <div className="space-y-4">
             <Link to="/" className="flex-shrink-0 mb-4 inline-block">
               <img src={COMPANY_LOGO_URL} alt="Knights Engineering Logo" className="h-10 w-auto" style={{ filter: 'brightness(0) invert(1) grayscale(1) contrast(100)' }} />
             </Link>
            <p className="text-sm">
              {t('footer.about')}
            </p>
             <h4 className="text-lg font-semibold text-white pt-4 font-heading">{t('footer.follow')}</h4>
             <SocialMediaLinks className="text-white text-xl" />
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4 font-heading">{t('footer.links')}</h4>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.nameKey}>
                  <Link to={link.href} className="text-sm hover:text-white transition-colors duration-300 flex items-center group">
                    <ChevronIcon size={10} className="me-2 text-primary transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                    {t(link.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4 font-heading">{t('footer.contact')}</h4>
            <div className="flex items-start space-x-3 rtl:space-x-reverse group">
              <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" size={16} />
              <p className="text-sm">{t('footer.contactAddress')}</p>
            </div>
            <a href={`tel:${t('footer.contactPhone')}`} className="flex items-start space-x-3 rtl:space-x-reverse group">
              <FaPhone className="text-primary mt-1 flex-shrink-0" size={16} />
              <p className="text-sm group-hover:text-white transition-colors duration-300">{t('footer.contactPhone')}</p>
            </a>
            <a href={`mailto:${t('footer.contactEmail')}`} className="flex items-start space-x-3 rtl:space-x-reverse group">
              <FaEnvelope className="text-primary mt-1 flex-shrink-0" size={16} />
              <p className="text-sm group-hover:text-white transition-colors duration-300">{t('footer.contactEmail')}</p>
            </a>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4 font-heading">{t('footer.newsletter')}</h4>
            <p className="text-sm">{t('footer.newsletterDesc')}</p>
            <form className="flex mt-4">
              <input
                type="email"
                placeholder={t('footer.newsletterPlaceholder')}
                className="w-full px-4 py-2 rounded-l-md rtl:rounded-l-none rtl:rounded-r-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-r-md rtl:rounded-r-none rtl:rounded-l-md hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Subscribe"
              >
                <ChevronIcon />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright Strip */}
      <div className="bg-black text-gray-500 text-center text-sm py-4">
        <div className="container mx-auto px-4">
          © {new Date().getFullYear()} {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
};

/**
 * Main Layout Component (with Page Transitions, ScrollToTop & Chat Widget)
 */
const PageLayout = () => {
  const location = useLocation();
  useScrollToTop(); // Add scroll to top hook
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
          className="pt-24 md:pt-[124px]" // Adjust main content padding for fixed header
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <ChatWidget />
      <Footer />
    </>
  );
};

// --- PAGE COMPONENTS (UPGRADED) ---

/**
 * 2. Hero Section (Upgraded with i18n & Niche Images)
 */
const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation();

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
    // Adjust hero to account for header height by using a negative margin-top
    <section id="home" className="relative h-screen w-full overflow-hidden -mt-24 md:-mt-[124px] pt-24 md:pt-[124px]">
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
            alt={t(heroSlides[currentSlide].titleKey)}
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
          {t(heroSlides[currentSlide].titleKey)}
        </motion.h1>
        <motion.p 
          key={`subtitle-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          className="font-body text-xl md:text-2xl mb-8 max-w-2xl"
        >
          {t(heroSlides[currentSlide].subtitleKey)}
        </motion.p>
        <motion.div
          key={`button-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
        >
          <Button variant="primary" as={Link} to="/about" className="py-3 px-8 text-lg rounded-full">
            {t('hero.explore')}
          </Button>
        </motion.div>
      </div>
      
      {/* Slider Dots */}
      <div className="absolute z-30 bottom-10 left-1/2 -translate-x-1/2 flex space-x-3 rtl:space-x-reverse">
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
 * Home Page Component (Upgraded with Niche Content & Stats)
 */
const HomePage = () => {
  const { t } = useTranslation();

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
                title={t('home.aboutTitle')}
                subtitle={t('home.aboutSubtitle')}
                centered={false}
              />
              <p className="font-body text-light my-6 text-left rtl:text-right">
                {t('home.aboutBody')}
              </p>
              <Button as={Link} to="/about" variant="primary" className="mt-4">
                {t('home.aboutButton')}
              </Button>
            </div>
            <motion.div 
              className="w-full h-80 lg:h-full min-h-[300px]"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src="images/hero2.jpg" // refinery sunset
                alt="Refinery Site"
                className="w-full h-full object-cover rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* --- NEW SECTION --- */}
      <WhyChooseUsSection />
      
      {/* --- NEW SECTION --- */}
      <StatsSection />

      {/* Expertise Summary Section */}
      <motion.section 
        className="py-16 lg:py-24 bg-gray-50 bg-geometric-pattern"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <SectionHeader
            title={t('home.expertiseTitle')}
            subtitle={t('home.expertiseSubtitle')}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {expertiseData.slice(0, 3).map((item) => (
              <ExpertiseCard key={item.slug} item={item} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button as={Link} to="/expertise" variant="secondary">
              {t('home.expertiseButton')}
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
            title={t('home.projectsTitle')}
            subtitle={t('home.projectsSubtitle')}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {projectsData.slice(0, 4).map((project) => (
              <ProjectCard key={project.titleKey} project={project} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button as={Link} to="/projects" variant="primary">
              {t('home.projectsButton')}
            </Button>
          </div>
        </div>
      </motion.section>

      {/* --- NEW SECTION --- */}
      <CallToActionSection />

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
            title={t('home.clientsTitle')}
            subtitle={t('home.clientsSubtitle')}
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
 * About Us Page Component (Niche Content)
 */
const AboutPage = () => {
  const { t, locale } = useTranslation();
  const ChevronIcon = locale === 'ar' ? FaChevronLeft : FaChevronRight;

  return (
    <div className="font-body">
      {/* Page Header */}
      <section className="py-24 bg-dark text-white relative" style={{ backgroundImage: "url('https://picsum.photos/seed/team welding/1920/400')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay', backgroundColor: 'rgba(0,0,0,0.6)' }}>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-5xl lg:text-6xl font-bold">{t('about.pageTitle')}</h1>
          <p className="text-xl mt-4">{t('about.pageSubtitle')}</p>
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
                title={t('about.sectionTitle')}
                subtitle={t('about.sectionSubtitle')}
                centered={false}
              />
              <p className="font-body text-light my-6 text-left rtl:text-right">
                {t('about.sectionBody')}
              </p>
              <ul className="space-y-3 text-left rtl:text-right">
                <li className="flex items-center font-semibold text-dark text-lg">
                  <ChevronIcon className="me-3 text-primary" size={14} />
                  {t('about.listItem1')}
                </li>
                <li className="flex items-center font-semibold text-dark text-lg">
                  <ChevronIcon className="me-3 text-primary" size={14} />
                  {t('about.listItem2')}
                </li>
                <li className="flex items-center font-semibold text-dark text-lg">
                  <ChevronIcon className="me-3 text-primary" size={14} />
                  {t('about.listItem3')}
                </li>
              </ul>
            </div>
            <motion.div 
              className="w-full h-80 lg:h-full min-h-[400px]"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src="https://picsum.photos/seed/welding team/600/500"
                alt={t('about.sectionTitle')}
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
              <h3 className="font-heading text-2xl font-semibold mb-3">{t('about.missionTitle')}</h3>
              <p className="font-body text-light">{t('about.missionDesc')}</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="p-8 bg-white rounded-lg shadow-lg text-center">
              <FaProjectDiagram size={48} className="mx-auto text-primary mb-4" />
              <h3 className="font-heading text-2xl font-semibold mb-3">{t('about.visionTitle')}</h3>
              <p className="font-body text-light">{t('about.visionDesc')}</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="p-8 bg-white rounded-lg shadow-lg text-center">
              <FaUserCheck size={48} className="mx-auto text-primary mb-4" />
              <h3 className="font-heading text-2xl font-semibold mb-3">{t('about.valuesTitle')}</h3>
              <p className="font-body text-light">{t('about.valuesDesc')}</p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

/**
 * Expertise Page Component (Niche Content)
 */
const ExpertisePage = () => {
  const { t } = useTranslation();
  return (
    <div className="font-body">
      {/* Page Header */}
      <section className="py-24 bg-dark text-white relative" style={{ backgroundImage: "url('https://picsum.photos/seed/large storage tanks/1920/400')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay', backgroundColor: 'rgba(0,0,0,0.6)' }}>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-5xl lg:text-6xl font-bold">{t('expertise.pageTitle')}</h1>
          <p className="text-xl mt-4">{t('expertise.pageSubtitle')}</p>
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
            title={t('expertise.sectionTitle')}
            subtitle={t('expertise.sectionSubtitle')}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {expertiseData.map((item) => (
              <ExpertiseCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

// --- NEW PAGE ---
/**
 * NEW: Expertise Detail Page (Error Fixed)
 */
const ExpertiseDetailPage = () => {
  const { slug } = useParams();
  const { t, locale } = useTranslation();
  const navigate = useNavigate();

  const item = expertiseData.find(e => e.slug === slug);

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-heading text-4xl font-bold text-dark mb-4">{t('expertiseDetail.notFound')}</h1>
        <p className="font-body text-lg text-light mb-8">{t('expertiseDetail.notFoundSubtitle')}</p>
        <Button onClick={() => navigate('/expertise')} variant="primary">
          {t('expertiseDetail.backButton')}
        </Button>
      </div>
    );
  }

  const BackIcon = locale === 'ar' ? FaArrowRight : FaArrowLeft;

  return (
    <div className="font-body">
      {/* Page Header */}
      <section className="py-32 bg-dark text-white relative" style={{ backgroundImage: `url(${item.detailImg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay', backgroundColor: 'rgba(0,0,0,0.6)' }}>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-5xl lg:text-6xl font-bold">{t(item.titleKey)}</h1>
        </div>
      </section>

      {/* Main Content */}
      <motion.section 
        className="py-16 lg:py-24 bg-white"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-left rtl:text-right">
            <Button onClick={() => navigate('/expertise')} variant="secondary" className="mb-8">
              <BackIcon size={12} className="group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
              {t('expertiseDetail.backButton')}
            </Button>
            
            <div className="prose lg:prose-lg max-w-none text-light text-left rtl:text-right font-body">
              {/* This renders the description text. 
                The `t(item.detailDescriptionKey)` fetches the correct text (e.g., 'expertiseDetail.tankFabrication')
                The .split('\n') allows for simple paragraphs in the translation file.
              */}
              {t(item.detailDescriptionKey).split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 font-body">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

/**
 * Projects Page Component (Niche Content)
 */
const ProjectsPage = () => {
  const { t } = useTranslation();
  return (
    <div className="font-body">
      {/* Page Header */}
      <section className="py-24 bg-dark text-white relative" style={{ backgroundImage: "url('https://picsum.photos/seed/tank construction site/1920/400')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay', backgroundColor: 'rgba(0,0,0,0.6)' }}>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-5xl lg:text-6xl font-bold">{t('projects.pageTitle')}</h1>
          <p className="text-xl mt-4">{t('projects.pageSubtitle')}</p>
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
            title={t('projects.sectionTitle')}
            subtitle={t('projects.sectionSubtitle')}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {projectsData.map((project) => (
              <ProjectCard key={project.titleKey} project={project} />
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
 * Contact Us Page Component (Functional Form)
 */
const ContactPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState('idle'); // 'idle', 'success', 'error'

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('idle');
    
    try {
      // Simulate network delay
      await new Promise(res => setTimeout(res, 2000));
      
      console.log('Form Submitted (Simulated):', formData);
      setIsSubmitting(false);
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', service: '', subject: '', message: '' });

    } catch (error) {
      console.error('Submission Error (Simulated):', error);
      setIsSubmitting(false);
      setFormStatus('error');
    }
  };


  return (
    <div className="font-body text-left rtl:text-right">
      {/* Page Header */}
      <section className="py-24 bg-dark text-white relative" style={{ backgroundImage: "url('https://picsum.photos/seed/modern office/1920/400')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay', backgroundColor: 'rgba(0,0,0,0.6)' }}>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-5xl lg:text-6xl font-bold">{t('contact.pageTitle')}</h1>
          <p className="text-xl mt-4">{t('contact.pageSubtitle')}</p>
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
              <h3 className="font-heading text-3xl font-semibold mb-6">{t('contact.formTitle')}</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-dark mb-1 font-body">{t('contact.formName')}</label>
                    <input type="text" id="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary bg-gray-50 font-body" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-dark mb-1 font-body">{t('contact.formEmail')}</label>
                    <input type="email" id="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary bg-gray-50 font-body" />
                  </div>
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-dark mb-1 font-body">{t('contact.formPhone')}</label>
                    <input type="tel" id="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary bg-gray-50 font-body" />
                  </div>
                   <div>
                    <label htmlFor="service" className="block text-sm font-medium text-dark mb-1 font-body">{t('contact.formService')}</label>
                    <select id="service" value={formData.service} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary bg-gray-50 font-body">
                      <option value="">{t('contact.formServicePlaceholder')}</option>
                      <option value="general">{t('contact.formServiceGeneral')}</option>
                      {expertiseData.map(item => (
                        <option key={item.slug} value={item.slug}>{t(item.titleKey)}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-dark mb-1 font-body">{t('contact.formSubject')}</label>
                  <input type="text" id="subject" value={formData.subject} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary bg-gray-50 font-body" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-dark mb-1 font-body">{t('contact.formMessage')}</label>
                  <textarea id="message" rows="6" value={formData.message} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary bg-gray-50 font-body"></textarea>
                </div>
                
                {/* --- FORM STATUS MESSAGES --- */}
                <AnimatePresence>
                  {formStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-md bg-green-50 border border-green-300 text-green-700"
                    >
                      <div className="flex items-center gap-3">
                        <FaCheckCircle />
                        <div>
                          <h4 className="font-semibold font-heading">{t('contact.formSuccessTitle')}</h4>
                          <p className="text-sm font-body">{t('contact.formSuccessBody')}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {formStatus === 'error' && (
                     <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-md bg-red-50 border border-red-300 text-red-700"
                    >
                      <div className="flex items-center gap-3">
                        <FaExclamationTriangle />
                        <div>
                          <h4 className="font-semibold font-heading">{t('contact.formErrorTitle')}</h4>
                          <p className="text-sm font-body">{t('contact.formErrorBody')}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* --- END STATUS MESSAGES --- */}
                
                <div>
                  <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full py-4 text-lg">
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        {t('contact.formButtonSubmitting')}
                      </>
                    ) : (
                      t('contact.formButton')
                    )}
                  </Button>
                </div>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="font-heading text-3xl font-semibold mb-6">{t('contact.infoTitle')}</h3>
              <p className="font-body text-light">{t('contact.infoSubtitle')}</p>
              
              <div className="flex items-start space-x-4 rtl:space-x-reverse p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300 group">
                <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-lg text-dark font-heading">{t('contact.infoAddressTitle')}</h4>
                  <p className="font-body text-light group-hover:text-dark">{t('contact.infoAddressDesc')}</p>
                </div>
              </div>
              <a href={`tel:${t('contact.infoCallDesc')}`} className="flex items-start space-x-4 rtl:space-x-reverse p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300 group">
                <FaPhone className="text-primary mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-lg text-dark font-heading">{t('contact.infoCallTitle')}</h4>
                  <p className="font-body text-light group-hover:text-dark">{t('contact.infoCallDesc')}</p>
                </div>
              </a>
              <a href={`mailto:${t('contact.infoEmailDesc')}`} className="flex items-start space-x-4 rtl:space-x-reverse p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300 group">
                <FaEnvelope className="text-primary mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-lg text-dark font-heading">{t('contact.infoEmailTitle')}</h4>
                  <p className="font-body text-light group-hover:text-dark">{t('contact.infoEmailDesc')}</p>
                </div>
              </a>
              
              {/* Embedded Map */}
              <div className="w-full h-64 bg-gray-200 rounded-lg shadow-inner overflow-hidden">
                <iframe
                  src="http://googleusercontent.com/maps.google.com/3" // Changed seed to avoid cache
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
    // Wrap entire app in LanguageProvider
    <LanguageProvider> 
      {/* --- NEW: GOOGLE FONTS IMPORT --- */}
      {/* --- END FONT IMPORT --- */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="expertise" element={<ExpertisePage />} />
            <Route path="expertise/:slug" element={<ExpertiseDetailPage />} /> 
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;