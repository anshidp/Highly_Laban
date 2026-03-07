import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Menu, X, ArrowRight, MapPin, Phone, Instagram, Facebook, Star, PlayCircle, Plus, ChevronDown } from 'lucide-react';

/* ── Animated split-word headline (Apple "grow in" effect) ── */
function AnimatedHeadline({ text, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const words = text.split(' ');
  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : {}}
            transition={{ duration: 0.75, delay: wi * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ── Magnetic hover wrapper ── */
function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const spring = { stiffness: 200, damping: 20 };
  const x = useSpring(pos.x, spring);
  const y = useSpring(pos.y, spring);

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength });
  };
  const onLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div ref={ref} style={{ x, y }} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </motion.div>
  );
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentStoryImage, setCurrentStoryImage] = useState(0);

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImgScale = useTransform(heroScroll, [0, 1], [1, 1.18]);
  const heroOpacity = useTransform(heroScroll, [0, 0.75], [1, 0]);
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '25%']);

  const storyImages = [
    './assets/product_laban2_1772818245641.png',
    './assets/hero_laban_dessert_1772818197266.png',
    './assets/media__1772821209180.png',
  ];

  const [currentLocation, setCurrentLocation] = useState(0);

  const locations = [
    { name: 'Kottakkal', desc: 'Main Branch', phone: '+91 86061 00088', area: 'Malappuram' },
    { name: 'HiLITE Mall, Calicut', desc: 'Shopping Center', phone: '+91 97442 82829', area: 'Kozhikode' },
    { name: 'Perinthalmanna', desc: 'Town Square', phone: '+91 97442 82864', area: 'Malappuram' },
    { name: 'Tirur', desc: 'High Street', phone: '+91 90000 11111', area: 'Malappuram' },
    { name: 'Manjeri', desc: 'City Center', phone: '+91 90000 22222', area: 'Malappuram' },
    { name: 'Calicut Beach Road', desc: 'Beachside Outlet', phone: '+91 90000 33333', area: 'Kozhikode' },
  ];
  const VISIBLE = 3;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    const imgTimer = setInterval(() => {
      setCurrentStoryImage(p => (p + 1) % storyImages.length);
    }, 4000);
    const locTimer = setInterval(() => {
      setCurrentLocation(p => (p + 1) % (locations.length - VISIBLE + 1));
    }, 3500);
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearInterval(imgTimer);
      clearInterval(locTimer);
    };
  }, [storyImages.length, locations.length]);

  /* Shared variants */
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };
  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const products = [
    { name: 'Ambalyh', price: '₹380', badge: 'NEW ARRIVAL', flavor: 'CHOCOLATE', img: './assets/product_laban2_1772818245641.png' },
    { name: 'Qashtoota', price: '₹350', badge: 'TRENDING', flavor: 'MANGO', img: './assets/hero_laban_dessert_1772818197266.png' },
    { name: 'Bambooza', price: '₹380', badge: 'TRENDING', flavor: 'LOTUS', img: './assets/product_laban2_1772818245641.png' },
    { name: 'Salankatia', price: '₹380', badge: 'NEW ARRIVAL', flavor: 'PISTACHIO', img: './assets/product_laban2_1772818245641.png' },
    { name: 'Koushiri', price: '₹350', badge: 'TRENDING', flavor: 'PISTACHIO LOTUS', img: './assets/hero_laban_dessert_1772818197266.png' },
    { name: 'Halibo', price: '₹380', badge: 'TRENDING', flavor: 'NUTELLA', img: './assets/product_laban2_1772818245641.png' },
  ];

  /* marquee items */
  const marqueeItems = ['Chocolate', 'Mango', 'Lotus', 'Pistachio', 'Nutella', 'Saffron', 'Rose'];

  return (
    <div className="font-sans text-brand-text bg-brand-bg min-h-screen selection:bg-brand-primary selection:text-white overflow-x-hidden">

      {/* ── Navbar ─────────────────────────────────────────────── */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)] py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
          <div className="flex items-center gap-3 z-10">
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className={`w-11 h-11 rounded-xl flex items-center justify-center font-heading font-black text-xl shadow-md transition-colors duration-300 ${isScrolled ? 'bg-brand-primary text-white' : 'bg-white/20 text-white backdrop-blur-md border border-white/20'}`}
            >HL</motion.div>
            <span className={`text-2xl font-heading font-black tracking-tight uppercase transition-colors duration-300 ${isScrolled ? 'text-brand-text' : 'text-white'}`}>
              Highly Laban
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Our Story', href: '#ourstory' },
              { label: 'Menu', href: '#products' },
              { label: 'Locations', href: '#locations' },
            ].map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 + 0.1, ease: 'easeOut' }}
                className={`text-sm font-bold uppercase tracking-wide transition-colors duration-200 ${isScrolled ? 'text-brand-text hover:text-brand-primary' : 'text-white/80 hover:text-white'}`}
              >{item.label}</motion.a>
            ))}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`md:hidden transition-colors ${isScrolled ? 'text-brand-text' : 'text-white'}`}
          ><Menu size={26} /></button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col p-8"
          >
            <button onClick={() => setIsMobileMenuOpen(false)} className="self-end mb-10"><X size={28} /></button>
            <div className="flex flex-col space-y-6">
              {['Home', 'Our Story', 'Menu', 'Locations'].map((item, i) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.1 }}
                  href={item === 'Menu' ? '#products' : item === 'Our Story' ? '#ourstory' : `#${item.toLowerCase().replace(' ', '')}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-heading font-bold text-brand-text border-b border-gray-100 pb-4 w-full"
                >{item}</motion.a>
              ))}
            </div>
            <div className="mt-12 w-full">
              <button className="w-full py-4 rounded-full bg-brand-primary text-white font-bold text-lg shadow-lg shadow-brand-primary/30">Order Now</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* ── Hero ──────────────────────────────────────────────── */}
        <section ref={heroRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">

          {/* Parallax background */}
          <motion.div
            style={{ scale: heroImgScale, y: heroY }}
            className="absolute inset-0 z-0 w-full h-full origin-center"
          >
            <img
              src="./assets/hero_laban_dessert_1772818197266.png"
              alt="Highly Laban"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/20" />
          </motion.div>

          {/* Hero content fades out on scroll */}
          <motion.div
            style={{ opacity: heroOpacity }}
            className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center mt-24"
          >
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center bg-white/10 backdrop-blur-sm py-2 px-5 rounded-full border border-white/20 mb-10"
            >
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse mr-3" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-white">The Viral Sensation</span>
            </motion.div>

            {/* Giant headline — split word animation */}
            <h1 className="text-[4rem] sm:text-[6vw] lg:text-[7rem] font-heading font-black tracking-tight leading-[0.95] text-white mb-8 drop-shadow-2xl">
              <AnimatedHeadline text="Taste the True" className="block" />
              <AnimatedHeadline
                text="Essence of Laban."
                className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-sky-300 to-blue-400"
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/70 text-lg sm:text-xl font-light mb-14 max-w-2xl mx-auto leading-relaxed"
            >
              Elevating traditional Egyptian desserts into an artistic culinary experience. Discover the rich, creamy texture everyone is talking about.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Magnetic>
                <a href="#products" className="group flex items-center justify-center px-10 py-4 rounded-full bg-brand-primary text-white font-bold tracking-widest uppercase text-sm shadow-[0_0_40px_rgba(39,170,225,0.4)] hover:shadow-[0_0_60px_rgba(39,170,225,0.7)] hover:-translate-y-1 transition-all duration-300">
                  Explore Menu
                  <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
                </a>
              </Magnetic>
              <a href="#ourstory" className="group flex items-center justify-center px-10 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white font-bold tracking-widest uppercase text-sm border border-white/20 hover:bg-white hover:text-brand-text transition-all duration-300">
                <PlayCircle size={20} className="mr-3 group-hover:text-brand-primary transition-colors" />
                Our Story
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          >
            <span className="text-white/40 text-[0.6rem] font-bold uppercase tracking-[0.3em]">Scroll</span>
            <motion.div
              animate={{ scaleY: [0.3, 1, 0.3] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-14 bg-gradient-to-b from-white/60 to-transparent origin-top"
            />
          </motion.div>
        </section>

        {/* ── Marquee flavor ticker ─────────────────────────────── */}
        <div className="bg-brand-primary py-4 overflow-hidden whitespace-nowrap select-none" aria-hidden>
          <motion.div
            animate={{ x: '-50%' }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="inline-flex gap-0"
          >
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="text-white text-sm font-bold uppercase tracking-[0.25em] mx-8">
                {item}
                <span className="mx-8 text-white/40">✦</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Story Section ─────────────────────────────────────── */}
        <section id="ourstory" className="py-32 bg-gray-50 relative overflow-hidden">

          {/* Background blob */}
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-[300px] h-[300px] bg-yellow-100/60 rounded-full blur-[80px] pointer-events-none mix-blend-multiply" />

          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}
              className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center"
            >
              {/* Slideshow */}
              <motion.div variants={fadeUp} className="w-full lg:w-1/2 relative h-[460px] md:h-[560px]">
                <div className="w-full h-full rounded-[44px] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.18)] border-8 border-white relative z-10">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentStoryImage}
                      src={storyImages[currentStoryImage]}
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 w-full h-full object-cover"
                      alt="Our Story"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
                </div>

                {/* Dot indicators */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {storyImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentStoryImage(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className={`h-2 rounded-full transition-all duration-400 outline-none ${currentStoryImage === idx ? 'w-8 bg-white shadow' : 'w-2 bg-white/50 hover:bg-white/80'}`}
                    />
                  ))}
                </div>

                {/* Floating stats chip */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-6 -right-6 bg-white rounded-2xl px-6 py-4 shadow-xl border border-gray-100/80 z-20"
                >
                  <p className="text-3xl font-black font-heading text-brand-primary leading-none">30+</p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Locations</p>
                </motion.div>
              </motion.div>

              {/* Text */}
              <motion.div variants={stagger} className="w-full lg:w-1/2 pl-0 lg:pl-6">
                <motion.p variants={fadeUp} className="text-brand-primary uppercase tracking-[0.25em] mb-4 text-xs font-bold flex items-center gap-3">
                  <span className="w-8 h-px bg-brand-primary" />
                  Our Journey
                </motion.p>
                <motion.h2 variants={fadeUp} className="text-[2.8rem] md:text-[4rem] font-heading font-black mb-10 text-[#001732] leading-[1.1] tracking-tight">
                  A Passion for Authentic Sweetness.
                </motion.h2>

                <div className="space-y-6 text-[#4a5568] text-[1.05rem] leading-[1.85] font-light">
                  {[
                    'Our journey began with a simple passion: to recreate the authentic, nostalgic flavors of traditional Egyptian desserts while elevating them with a modern twist. Over the years, we have mastered the art of balancing rich, creamy textures to craft desserts that feel both comforting and luxurious.',
                    'Every bowl at Highly Laban is a testament to our dedication. We meticulously source premium ingredients—from the freshest milk for our signature laban base to the finest global nuts for that perfect, irresistible crunch. Our artisans spend hours perfecting small batches, ensuring exceptional quality in every single bite.',
                    'Today, we continue to innovate by introducing new flavors like pistachio lotus and rich chocolate, but our core philosophy remains unchanged. We don\'t just serve desserts; we serve an experience crafted with love and a commitment to absolute perfection.',
                  ].map((para, i) => (
                    <motion.p key={i} variants={fadeUp}>{para}</motion.p>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── Products Grid ─────────────────────────────────────── */}
        <section id="products" className="py-32 bg-[#f2f8fc] relative">
          <div className="container mx-auto px-6 max-w-7xl">

            {/* Section header */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger}
              className="text-center mb-20"
            >
              <motion.p variants={fadeUp} className="text-brand-primary uppercase tracking-[0.25em] text-xs font-bold mb-4">Our Signature Flavors</motion.p>
              <h2 className="text-[2.8rem] md:text-[4.5rem] font-heading font-black text-[#001732] leading-[1.05] tracking-tight">
                <AnimatedHeadline text="Explore the Menu" className="" />
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, i) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.3, ease: 'easeOut' } }}
                  className="bg-white rounded-[44px] p-6 lg:p-8 flex flex-col shadow-[0_8px_40px_-12px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.12)] transition-shadow duration-500 relative group"
                >
                  {/* Image */}
                  <div className="h-[240px] flex items-center justify-center mb-6 relative w-full pt-4 overflow-hidden">
                    <motion.img
                      src={product.img}
                      alt={product.name}
                      whileHover={{ scale: 1.08, rotate: 2 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="w-[85%] h-full object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.15)] rounded-2xl relative z-10"
                    />
                    {/* Badge */}
                    <div className="absolute top-0 right-0 z-20">
                      <span className="bg-white shadow-sm text-brand-primary px-4 py-1.5 rounded-xl text-[0.6rem] font-bold uppercase tracking-widest border border-gray-100/50 block">
                        {product.badge}
                      </span>
                    </div>
                  </div>

                  {/* Flavor pill */}
                  <div className="flex justify-center mb-6">
                    <span className="bg-[#4295b9] text-white text-[0.6rem] font-bold uppercase tracking-widest px-6 py-1.5 rounded-full shadow-sm">
                      {product.flavor}
                    </span>
                  </div>

                  {/* Name & price */}
                  <div className="flex justify-between items-center mb-1 px-2">
                    <h4 className="text-[1.5rem] font-black font-heading text-[#001732]">{product.name}</h4>
                    <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                      <ChevronDown className="text-gray-400" size={22} strokeWidth={2.5} />
                    </motion.div>
                  </div>
                  <div className="px-2">
                    <div className="text-[1.8rem] font-black font-heading tracking-tight text-brand-primary">{product.price}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats strip ──────────────────────────────────────── */}
        <section className="py-20 bg-white border-y border-gray-100">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center"
            >
              {[
                { val: '30+', label: 'Locations' },
                { val: '50K+', label: 'Happy Customers' },
                { val: '10+', label: 'Signature Flavors' },
                { val: '5★', label: 'Average Rating' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex flex-col items-center"
                >
                  <span className="text-[3.2rem] font-black font-heading text-brand-primary leading-none">{stat.val}</span>
                  <span className="text-sm text-gray-400 font-bold uppercase tracking-wider mt-2">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Locations ─────────────────────────────────────────── */}
        <section id="locations" className="py-32 bg-gray-50 relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#001732] text-white rounded-[48px] p-10 md:p-16 relative overflow-hidden flex flex-col items-center text-center"
            >
              {/* Glow orbs */}
              <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/30 rounded-full blur-[100px] pointer-events-none" />
              <motion.div animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.35, 0.2] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }} className="absolute bottom-0 left-0 w-72 h-72 bg-sky-400/20 rounded-full blur-[80px] pointer-events-none" />

              {/* Header */}
              <div className="relative z-10 max-w-3xl mx-auto mb-12">
                <h2 className="text-[2.5rem] md:text-[4rem] font-heading font-black mb-4 leading-tight">
                  <AnimatedHeadline text="Find a location near you." className="" />
                </h2>
                <p className="text-gray-400 text-lg font-light">Experience the magic in person across Kerala.</p>
              </div>

              {/* Carousel */}
              <div className="relative w-full z-10">
                <div className="overflow-hidden">
                  <motion.div
                    animate={{ x: `-${(currentLocation / VISIBLE) * 100}%` }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="flex gap-6"
                    style={{ width: `${(locations.length / VISIBLE) * 100}%` }}
                  >
                    {locations.map((loc, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.03, y: -4 }}
                        className="bg-white/[0.08] backdrop-blur-md rounded-2xl p-7 border border-white/10 hover:bg-white/[0.15] transition-colors text-left flex flex-col flex-1"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <MapPin size={22} className="text-brand-primary" strokeWidth={2} />
                          <span className="text-[0.6rem] font-bold uppercase tracking-widest text-brand-primary/80 bg-brand-primary/10 px-3 py-1 rounded-full">{loc.area}</span>
                        </div>
                        <h4 className="text-xl font-heading font-bold mb-1 leading-tight">{loc.name}</h4>
                        <p className="text-gray-400 text-sm mb-6 flex-grow">{loc.desc}</p>
                        <div className="text-white/70 font-medium flex items-center text-sm">
                          <Phone size={14} className="mr-2 text-brand-primary" />
                          {loc.phone}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Arrow controls */}
                <div className="flex justify-center items-center gap-4 mt-8">
                  <button
                    onClick={() => setCurrentLocation(p => Math.max(0, p - 1))}
                    aria-label="Previous"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 transition-colors flex items-center justify-center border border-white/10 disabled:opacity-30"
                    disabled={currentLocation === 0}
                  >
                    <ChevronDown size={18} className="rotate-90 text-white" strokeWidth={2.5} />
                  </button>

                  {/* Dots */}
                  <div className="flex gap-2">
                    {Array.from({ length: locations.length - VISIBLE + 1 }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentLocation(idx)}
                        aria-label={`Go to location ${idx + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 outline-none ${currentLocation === idx ? 'w-8 bg-brand-primary shadow-[0_0_10px_rgba(39,170,225,0.6)]' : 'w-2 bg-white/30 hover:bg-white/60'}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentLocation(p => Math.min(locations.length - VISIBLE, p + 1))}
                    aria-label="Next"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 transition-colors flex items-center justify-center border border-white/10 disabled:opacity-30"
                    disabled={currentLocation === locations.length - VISIBLE}
                  >
                    <ChevronDown size={18} className="-rotate-90 text-white" strokeWidth={2.5} />
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        </section>
      </main>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer id="contact" className="bg-white pt-24 pb-12 border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 border-b border-gray-100 pb-16 mb-10">
            <div className="md:col-span-12 lg:col-span-5 flex flex-col space-y-6 pr-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-primary flex items-center justify-center text-white font-heading font-black text-2xl shadow-md">HL</div>
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
                {['Home:#home', 'Our Story:#ourstory', 'Menu & Pricing:#products', 'Franchise:#franchise'].map(link => {
                  const [label, href] = link.split(':');
                  return <li key={label}><a href={href} className="hover:text-brand-primary transition-colors hover:translate-x-1 inline-block transform duration-300">{label}</a></li>;
                })}
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
