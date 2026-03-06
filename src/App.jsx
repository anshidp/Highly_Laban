import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, MapPin, Phone, Instagram, Facebook, Star, PlayCircle, Plus, ChevronDown } from 'lucide-react';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentStoryImage, setCurrentStoryImage] = useState(0);

  const storyImages = [
    "/assets/product_laban2_1772818245641.png",
    "/assets/hero_laban_dessert_1772818197266.png",
    "/assets/media__1772821209180.png"
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Auto slider interval
    const timer = setInterval(() => {
      setCurrentStoryImage((prev) => (prev + 1) % storyImages.length);
    }, 4000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, [storyImages.length]);

  const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.5, 0, 0, 1] } }
  };

  const slideRight = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.5, 0, 0, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="font-sans text-brand-text bg-brand-bg min-h-screen selection:bg-brand-primary selection:text-white overflow-x-hidden">

      {/* Navbar directly inspired by highlaban.com structure */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">

          <div className="flex items-center gap-3 z-10">
            {/* Logo Placeholder */}
            <div className="w-10 h-10 rounded-lg bg-brand-primary flex items-center justify-center text-white font-heading font-black text-2xl tracking-tighter shadow-md">
              HL
            </div>
            <span className="text-xl md:text-2xl font-heading font-black text-brand-text tracking-tight uppercase mt-1">Highly Laban</span>
          </div>

          <div className="hidden md:flex items-center space-x-10 text-[15px] font-medium tracking-wide">
            <a href="#hero" className="hover:text-brand-primary transition-colors duration-300">Home</a>
            <a href="#about" className="hover:text-brand-primary transition-colors duration-300">Our Story</a>
            <a href="#products" className="hover:text-brand-primary transition-colors duration-300">Menu</a>
            <a href="#franchise" className="hover:text-brand-primary transition-colors duration-300">Franchise</a>
            <a href="#locations" className="hover:text-brand-primary transition-colors duration-300">Locations</a>
          </div>

          <div className="hidden md:flex items-center z-10">
            <a href="#contact" className="px-6 py-2.5 rounded-full bg-brand-text text-white text-sm font-semibold hover:bg-brand-primary transition-colors duration-300 shadow-lg shadow-black/10">
              Get in Touch
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-brand-text z-50 p-1" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.5, 0, 0, 1] }}
            className="fixed inset-0 z-40 bg-white pt-28 px-8 md:hidden flex flex-col items-start shadow-2xl"
          >
            <div className="flex flex-col space-y-6 w-full mt-4">
              {['Home', 'Our Story', 'Menu', 'Franchise', 'Locations'].map((item, i) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i + 0.2 }}
                  href={`#${item.toLowerCase().replace(' ', '')}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-heading font-bold text-brand-text border-b border-gray-100 pb-4 w-full"
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <div className="mt-12 w-full">
              <button className="w-full py-4 rounded-full bg-brand-primary text-white font-bold text-lg shadow-lg shadow-brand-primary/30">Contact Us</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>

        {/* Immersive Full-Screen Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">

          {/* Animated Background Image */}
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 z-0 w-full h-full"
          >
            <img
              src="/assets/hero_laban_dessert_1772818197266.png"
              alt="Highly Laban Premium Dessert"
              className="w-full h-full object-cover object-center"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-gray-900/30"></div>
          </motion.div>

          <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center mt-20">

            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.5, 0, 0, 1] }}
              className="inline-flex items-center bg-white/10 backdrop-blur-md py-2 px-5 rounded-full border border-white/20 mb-8"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-brand-primary animate-pulse mr-3"></span>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-white">The Viral Sensation</span>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4, ease: [0.5, 0, 0, 1] } }
              }}
              className="text-[3.5rem] sm:text-[5vw] lg:text-[6rem] font-heading font-black tracking-tight leading-[1] text-white mb-8 drop-shadow-2xl"
            >
              Taste the <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-300">True Essence</span> <br className="hidden md:block" />
              of Laban.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.5, 0, 0, 1] }}
              className="text-gray-200 text-lg sm:text-2xl font-light mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-md"
            >
              Elevating traditional Egyptian desserts into an artistic culinary experience. Discover the rich, creamy texture everyone is talking about.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.5, 0, 0, 1] }}
              className="flex flex-col sm:flex-row items-center gap-5"
            >
              <a href="#products" className="group flex items-center justify-center px-10 py-5 rounded-full bg-brand-primary text-white font-bold tracking-widest uppercase text-sm shadow-[0_0_40px_rgba(39,170,225,0.4)] hover:shadow-[0_0_60px_rgba(39,170,225,0.6)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
                Explore Menu
                <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
              </a>
              <a href="#about" className="group flex items-center justify-center px-10 py-5 rounded-full bg-white/10 backdrop-blur-md text-white font-bold tracking-widest uppercase text-sm border border-white/20 hover:bg-white hover:text-brand-text transition-all duration-300 w-full sm:w-auto">
                <PlayCircle size={20} className="mr-3 group-hover:text-brand-primary transition-colors" />
                Our Story
              </a>
            </motion.div>

          </div>

          {/* Floating animated scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
          >
            <span className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3">Scroll</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-16 bg-gradient-to-b from-white to-transparent"
            ></motion.div>
          </motion.div>
        </section>

        {/* Feature Highlights / Story */}
        <section id="about" className="py-24 bg-gray-50 relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-16 items-center">

              {/* Slidable Photo Gallery */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                className="w-full lg:w-1/2 relative h-[450px] md:h-[550px]"
              >
                <div className="w-full h-full rounded-[40px] overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] border-8 border-white relative z-10 group">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentStoryImage}
                      src={storyImages[currentStoryImage]}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full object-cover"
                      alt="Our Story Journey"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
                </div>

                {/* Background decorative elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-brand-primary/10 rounded-[60px] blur-3xl -z-10"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-yellow-100 rounded-full blur-2xl -z-10 mix-blend-multiply"></div>

                {/* Floating indicator dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {storyImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentStoryImage(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`w-2 h-2 rounded-full transition-all duration-300 outline-none ${currentStoryImage === idx ? 'bg-white w-8 shadow-sm' : 'bg-white/60 hover:bg-white/80'}`}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Shop Journey Text */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                className="w-full lg:w-1/2 pl-0 lg:pl-10 relative z-10"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -z-10"></div>

                <motion.h3 variants={slideUp} className="text-brand-primary uppercase tracking-[0.2em] mb-3 text-sm font-bold flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-brand-primary"></span>
                  Our Journey
                </motion.h3>
                <motion.h2 variants={slideUp} className="text-[2.5rem] md:text-[3.5rem] font-heading font-black mb-8 text-[#001732] leading-[1.15] tracking-tight">
                  A Passion for Authentic Sweetness.
                </motion.h2>

                <div className="space-y-6 text-[#4a5568] text-[1.05rem] leading-[1.8] font-light">
                  <motion.p variants={slideUp}>
                    Our journey began with a simple passion: to recreate the authentic, nostalgic flavors of traditional Egyptian desserts while elevating them with a modern twist. Over the years, we have mastered the art of balancing rich, creamy textures to craft desserts that feel both comforting and luxurious.
                  </motion.p>
                  <motion.p variants={slideUp}>
                    Every bowl at Highly Laban is a testament to our dedication. We meticulously source premium ingredients—from the freshest milk for our signature laban base to the finest global nuts for that perfect, irresistible crunch. Our artisans spend hours perfecting small batches, ensuring exceptional quality in every single bite.
                  </motion.p>
                  <motion.p variants={slideUp}>
                    Today, we continue to innovate by introducing new flavors like pistachio lotus and rich chocolate, but our core philosophy remains unchanged. We don't just serve desserts; we serve an experience crafted with love and a commitment to absolute perfection.
                  </motion.p>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Authentic Products Menu Area matching highlaban.com screenshot */}
        <section id="products" className="py-24 bg-[#f2f8fc] relative">
          <div className="container mx-auto px-6 max-w-7xl">

            {/* Top Navigation Tabs */}
            {/* <div className="flex justify-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[100px] shadow-sm px-2 py-2 flex items-center"
              >
                <div className="px-5 py-2">
                  <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center text-white font-heading font-black text-xs shadow-md">
                    HL
                  </div>
                </div>
                <div className="flex space-x-1 px-4 border-l border-gray-100">
                  <button className="px-4 md:px-6 py-2.5 text-[0.8rem] md:text-[0.85rem] font-bold text-brand-text uppercase tracking-wide hover:text-brand-primary transition-colors">Our Story</button>
                  <button className="px-4 md:px-6 py-2.5 text-[0.8rem] md:text-[0.85rem] font-bold text-brand-primary uppercase tracking-wide transition-colors">Menu</button>
                  <button className="px-6 md:px-8 py-2.5 bg-white text-[0.8rem] md:text-[0.85rem] font-bold text-brand-text uppercase tracking-wide rounded-[100px] border-[1.5px] border-brand-text hover:bg-gray-50 transition-colors ml-2 md:ml-4">Franchise</button>
                </div>
              </motion.div>
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {/* Product Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
                className="bg-white rounded-[40px] p-6 lg:p-8 flex flex-col shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 relative"
              >
                <div className="h-[240px] flex items-center justify-center mb-6 relative w-full pt-4">
                  <img src="/assets/product_laban2_1772818245641.png" alt="Ambalyh" className="w-[90%] md:w-[80%] h-full object-contain filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-500 relative z-10 rounded-2xl" />

                  {/* Floating badges */}
                  <div className="absolute top-0 right-0 z-20">
                    <span className="bg-white shadow-sm text-brand-primary px-4 py-1.5 rounded-[12px] text-[0.65rem] font-bold uppercase tracking-widest border border-gray-100/50 block tracking-wider">
                      NEW ARRIVAL
                    </span>
                  </div>
                </div>

                <div className="flex justify-center mb-6 z-20 relative">
                  <span className="bg-[#4295b9] text-white text-[0.65rem] font-bold uppercase tracking-widest px-6 py-1.5 rounded-[100px] shadow-sm">CHOCOLATE</span>
                </div>

                <div className="flex justify-between items-center mb-1 px-2">
                  <h4 className="text-[1.5rem] font-black font-heading text-[#001732]">Ambalyh</h4>
                  <ChevronDown className="text-gray-400" size={24} strokeWidth={3} />
                </div>

                <div className="px-2">
                  <div className="text-[1.8rem] font-black font-heading tracking-tight text-brand-primary">₹380</div>
                </div>
              </motion.div>

              {/* Product Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-[40px] p-6 lg:p-8 flex flex-col shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 relative"
              >
                <div className="h-[240px] flex items-center justify-center mb-6 relative w-full pt-4">
                  <img src="/assets/hero_laban_dessert_1772818197266.png" alt="Qashtoota" className="w-[90%] md:w-[80%] h-full object-contain filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-500 relative z-10 rounded-2xl" />

                  {/* Floating badges */}
                  <div className="absolute top-0 right-0 z-20">
                    <span className="bg-white shadow-sm text-brand-primary px-4 py-1.5 rounded-[12px] text-[0.65rem] font-bold uppercase tracking-widest border border-gray-100/50 block tracking-wider">
                      TRENDING
                    </span>
                  </div>
                </div>

                <div className="flex justify-center mb-6 z-20 relative">
                  <span className="bg-[#4295b9] text-white text-[0.65rem] font-bold uppercase tracking-widest px-6 py-1.5 rounded-[100px] shadow-sm">MANGO</span>
                </div>

                <div className="flex justify-between items-center mb-1 px-2">
                  <h4 className="text-[1.5rem] font-black font-heading text-[#001732]">Qashtoota</h4>
                  <ChevronDown className="text-gray-400" size={24} strokeWidth={3} />
                </div>

                <div className="px-2">
                  <div className="text-[1.8rem] font-black font-heading tracking-tight text-brand-primary">₹350</div>
                </div>
              </motion.div>

              {/* Product Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-[40px] p-6 lg:p-8 flex flex-col shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 relative"
              >
                <div className="h-[240px] flex items-center justify-center mb-6 relative w-full pt-4">
                  <img src="/assets/product_laban2_1772818245641.png" alt="Bambooza" className="w-[90%] md:w-[80%] h-full object-contain filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-500 relative z-10 rounded-2xl" />

                  {/* Floating badges */}
                  <div className="absolute top-0 right-0 z-20">
                    <span className="bg-white shadow-sm text-brand-primary px-4 py-1.5 rounded-[12px] text-[0.65rem] font-bold uppercase tracking-widest border border-gray-100/50 block tracking-wider">
                      TRENDING
                    </span>
                  </div>
                </div>

                <div className="flex justify-center mb-6 z-20 relative">
                  <span className="bg-[#4295b9] text-white text-[0.65rem] font-bold uppercase tracking-widest px-6 py-1.5 rounded-[100px] shadow-sm">LOTUS</span>
                </div>

                <div className="flex justify-between items-center mb-1 px-2">
                  <h4 className="text-[1.5rem] font-black font-heading text-[#001732]">Bambooza</h4>
                  <ChevronDown className="text-gray-400" size={24} strokeWidth={3} />
                </div>

                <div className="px-2">
                  <div className="text-[1.8rem] font-black font-heading tracking-tight text-brand-primary">₹380</div>
                </div>
              </motion.div>

              {/* Product Card 4 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-[40px] p-6 lg:p-8 flex flex-col shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 relative"
              >
                <div className="h-[240px] flex items-center justify-center mb-6 relative w-full pt-4">
                  <img src="/assets/product_laban2_1772818245641.png" alt="Salankatia" className="w-[90%] md:w-[80%] h-full object-contain filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-500 relative z-10 rounded-2xl" />

                  {/* Floating badges */}
                  <div className="absolute top-0 right-0 z-20">
                    <span className="bg-white shadow-sm text-brand-primary px-4 py-1.5 rounded-[12px] text-[0.65rem] font-bold uppercase tracking-widest border border-gray-100/50 block tracking-wider">
                      NEW ARRIVAL
                    </span>
                  </div>
                </div>

                <div className="flex justify-center mb-6 z-20 relative">
                  <span className="bg-[#4295b9] text-white text-[0.65rem] font-bold uppercase tracking-widest px-6 py-1.5 rounded-[100px] shadow-sm">PISTACHIO</span>
                </div>

                <div className="flex justify-between items-center mb-1 px-2">
                  <h4 className="text-[1.5rem] font-black font-heading text-[#001732]">Salankatia</h4>
                  <ChevronDown className="text-gray-400" size={24} strokeWidth={3} />
                </div>

                <div className="px-2">
                  <div className="text-[1.8rem] font-black font-heading tracking-tight text-brand-primary">₹380</div>
                </div>
              </motion.div>

              {/* Product Card 5 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-[40px] p-6 lg:p-8 flex flex-col shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 relative"
              >
                <div className="h-[240px] flex items-center justify-center mb-6 relative w-full pt-4">
                  <img src="/assets/hero_laban_dessert_1772818197266.png" alt="Koushiri" className="w-[90%] md:w-[80%] h-full object-contain filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-500 relative z-10 rounded-2xl" />

                  {/* Floating badges */}
                  <div className="absolute top-0 right-0 z-20">
                    <span className="bg-white shadow-sm text-brand-primary px-4 py-1.5 rounded-[12px] text-[0.65rem] font-bold uppercase tracking-widest border border-gray-100/50 block tracking-wider">
                      TRENDING
                    </span>
                  </div>
                </div>

                <div className="flex justify-center mb-6 z-20 relative">
                  <span className="bg-[#4295b9] text-white text-[0.65rem] font-bold uppercase tracking-widest px-6 py-1.5 rounded-[100px] shadow-sm">PISTACHIO LOTUS</span>
                </div>

                <div className="flex justify-between items-center mb-1 px-2">
                  <h4 className="text-[1.5rem] font-black font-heading text-[#001732]">Koushiri</h4>
                  <ChevronDown className="text-gray-400" size={24} strokeWidth={3} />
                </div>

                <div className="px-2">
                  <div className="text-[1.8rem] font-black font-heading tracking-tight text-brand-primary">₹350</div>
                </div>
              </motion.div>

              {/* Product Card 6 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white rounded-[40px] p-6 lg:p-8 flex flex-col shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 relative"
              >
                <div className="h-[240px] flex items-center justify-center mb-6 relative w-full pt-4">
                  <img src="/assets/product_laban2_1772818245641.png" alt="Halibo" className="w-[90%] md:w-[80%] h-full object-contain filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-500 relative z-10" />

                  {/* Floating badges */}
                  <div className="absolute top-0 right-0 z-20">
                    <span className="bg-white shadow-sm text-brand-primary px-4 py-1.5 rounded-[12px] text-[0.65rem] font-bold uppercase tracking-widest border border-gray-100/50 block tracking-wider">
                      TRENDING
                    </span>
                  </div>
                </div>

                <div className="flex justify-center mb-6 z-20 relative">
                  <span className="bg-[#4295b9] text-white text-[0.65rem] font-bold uppercase tracking-widest px-6 py-1.5 rounded-[100px] shadow-sm">NUTELLA</span>
                </div>

                <div className="flex justify-between items-center mb-1 px-2">
                  <h4 className="text-[1.5rem] font-black font-heading text-[#001732]">Halibo</h4>
                  <ChevronDown className="text-gray-400" size={24} strokeWidth={3} />
                </div>

                <div className="px-2">
                  <div className="text-[1.8rem] font-black font-heading tracking-tight text-brand-primary">₹380</div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Elegant Store Locator inside a banner style CTA */}
        <section id="locations" className="py-24 bg-gray-50 relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-7xl relative z-10">

            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="bg-brand-text text-white rounded-[40px] p-10 md:p-16 relative overflow-hidden flex flex-col items-center text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-text via-gray-900 to-brand-primary/40 z-0"></div>

              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-[2.5rem] md:text-[4rem] font-heading font-black mb-6 leading-tight">Find a location near you.</h2>
                <p className="text-gray-300 text-lg md:text-xl font-light mb-12">Experience the magic in person. Visit any of our aesthetic locations crafted for your comfort across Kerala.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full relative z-10">
                {[
                  { name: 'Kottakkal', desc: 'Main Branch', phone: '+91 86061 00088' },
                  { name: 'HiLITE Mall, Calicut', desc: 'Shopping Center', phone: '+91 97442 82829' },
                  { name: 'Perinthalmanna', desc: 'Town Square', phone: '+91 97442 82864' }
                ].map((loc, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-colors text-left flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <MapPin size={24} className="text-brand-primary" strokeWidth={2} />
                    </div>
                    <h4 className="text-2xl font-heading font-bold mb-1">{loc.name}</h4>
                    <p className="text-gray-400 text-sm mb-6 flex-grow">{loc.desc}</p>
                    <div className="text-white font-medium flex items-center">
                      <Phone size={16} className="mr-2 text-brand-primary" />
                      {loc.phone}
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-12 px-8 py-4 bg-brand-primary rounded-full font-bold shadow-lg hover:shadow-brand-primary/50 hover:-translate-y-1 transition-all relative z-10">
                View All 30+ Locations
              </button>
            </motion.div>

          </div>
        </section>

      </main>

      {/* Modern Footer matching highlaban */}
      <footer id="contact" className="bg-white pt-24 pb-12 border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 border-b border-gray-100 pb-16 mb-10">

            <div className="md:col-span-12 lg:col-span-5 flex flex-col space-y-6 pr-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-primary flex items-center justify-center text-white font-heading font-black text-2xl shadow-md">
                  HL
                </div>
                <span className="text-3xl font-heading font-black tracking-tight text-brand-text uppercase mt-1">Highly Laban</span>
              </div>
              <p className="text-brand-text-muted text-lg font-light leading-relaxed mt-4">
                The authentic taste of Egyptian Laban, spreading sweetness across India with every bite.
              </p>
              <div className="flex space-x-3 pt-4">
                <a href="#" className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-brand-text border border-gray-100 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-300"><Instagram size={20} /></a>
                <a href="#" className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-brand-text border border-gray-100 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-300"><Facebook size={20} /></a>
              </div>
            </div>

            <div className="md:col-span-6 lg:col-span-3">
              <h4 className="font-heading font-bold text-xl text-brand-text mb-6">Quick Links</h4>
              <ul className="space-y-4 font-medium text-brand-text-muted">
                <li><a href="#hero" className="hover:text-brand-primary transition-colors hover:translate-x-1 inline-block transform duration-300">Home</a></li>
                <li><a href="#about" className="hover:text-brand-primary transition-colors hover:translate-x-1 inline-block transform duration-300">Our Story</a></li>
                <li><a href="#products" className="hover:text-brand-primary transition-colors hover:translate-x-1 inline-block transform duration-300">Menu & Pricing</a></li>
                <li><a href="#franchise" className="hover:text-brand-primary transition-colors hover:translate-x-1 inline-block transform duration-300">Franchise</a></li>
              </ul>
            </div>

            <div className="md:col-span-6 lg:col-span-4">
              <h4 className="font-heading font-bold text-xl text-brand-text mb-6">Contact Us</h4>
              <ul className="space-y-6 font-medium text-brand-text-muted">
                <li className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex flex-shrink-0 items-center justify-center mr-4">
                    <MapPin size={18} className="text-brand-primary" />
                  </div>
                  <span className="mt-2">Kerala, India</span>
                </li>
                <li className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex flex-shrink-0 items-center justify-center mr-4">
                    <Phone size={18} className="text-brand-primary" />
                  </div>
                  <span>+91 90000 00000</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-brand-text-muted font-medium text-sm">
            <p>&copy; {new Date().getFullYear()} Highly Laban. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-brand-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
