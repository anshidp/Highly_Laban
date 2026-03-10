import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Menu, X, ArrowRight, MapPin, Phone, Instagram, Facebook, Star, PlayCircle, Plus, ChevronDown } from 'lucide-react';

/* ── Animated split-word headline — skips animation on mobile ── */
function AnimatedHeadline({ text, className, isMobile }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const words = text.split(' ');
  if (isMobile) {
    return <span ref={ref} className={className} aria-label={text}>{text}</span>;
  }
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

/* ── Magnetic hover — no-op on touch devices ── */
function Magnetic({ children, strength = 0.35 }) {
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const spring = { stiffness: 200, damping: 20 };
  const x = useSpring(pos.x, spring);
  const y = useSpring(pos.y, spring);

  if (isTouch) return <>{children}</>;

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
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth <= 768
  );

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  // Parallax only on desktop — mobile skips for smooth 60fps
  const heroImgScaleRaw = useTransform(heroScroll, [0, 1], [1, 1.14]);
  const heroOpacityRaw = useTransform(heroScroll, [0, 0.75], [1, 0]);
  const heroYRaw = useTransform(heroScroll, [0, 1], ['0%', '20%']);
  const heroImgScale = isMobile ? undefined : heroImgScaleRaw;
  const heroOpacity = isMobile ? undefined : heroOpacityRaw;
  const heroY = isMobile ? undefined : heroYRaw;

  const storyImages = [
    './assets/shop1.JPG',
    './assets/shop2.JPG',
    './assets/shop3.JPG',
  ];

  // Map locations — starred = running shops, not starred = upcoming
  const mapLocations = [
    { name: 'OMR', sub: 'Starting Point', starred: true, x: 18, y: 82 },
    { name: 'Velachery', starred: true, x: 47, y: 82 },
    { name: 'ECR', starred: true, x: 78, y: 82 },
    { name: 'Navallur', starred: false, x: 18, y: 66 },
    { name: 'Adyar', starred: false, x: 47, y: 66 },
    { name: 'Pallavaram', starred: false, x: 25, y: 55 },
    { name: 'Guindy', starred: false, x: 55, y: 55 },
    { name: 'KNK Road', starred: false, x: 75, y: 48 },
    { name: 'Anna Nagar', starred: false, x: 30, y: 44 },
    { name: 'Mount Road', starred: false, x: 55, y: 44 },
    { name: 'Mannady', starred: false, x: 78, y: 38 },
    { name: 'Porur', starred: false, x: 22, y: 36 },
    { name: 'Egmore', starred: true, x: 52, y: 30 },
    { name: 'Royapuram', starred: false, x: 72, y: 28 },
    { name: 'Poonamallee', starred: false, x: 32, y: 26 },
    { name: 'Pondy Bazaar', starred: false, x: 54, y: 18 },
    { name: 'Tiruvottiyur', starred: false, x: 20, y: 22 },
  ];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    const imgTimer = setInterval(() => {
      setCurrentStoryImage(p => (p + 1) % storyImages.length);
    }, 4000);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      clearInterval(imgTimer);
    };
  }, [storyImages.length]);

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
    { name: 'Koushri', price: '₹380', badge: 'BESTSELLER', flavor: 'CHOCO PISTA', img: './assets/product1.jpg' },
    { name: "Lou'a", price: '₹380', badge: 'TRENDING', flavor: 'STRAWBERRY', img: './assets/product2.jpg' },
    { name: 'Salankatia', price: '₹380', badge: 'NEW ARRIVAL', flavor: 'BISCOFF', img: './assets/product3.jpg' },
    { name: 'Ambalyh', price: '₹380', badge: 'SIGNATURE', flavor: 'PISTACHIO', img: './assets/product4.jpg' },
    { name: 'Ambalyh', price: '₹380', badge: 'SIGNATURE', flavor: 'PISTACHIO', img: './assets/product5.jpg' },
    { name: 'Koushri', price: '₹380', badge: 'BESTSELLER', flavor: 'CHOCO PISTA', img: './assets/product6.jpg' },
  ];

  /* marquee items — aligned with real product flavors */
  const marqueeItems = ['Ambalyh', 'Koushri', 'Lou\'a', 'Salankatia', 'Pistachio', 'Chocolate', 'Pure Sweetness'];

  return (
    <div className="font-sans text-brand-text bg-brand-bg min-h-screen selection:bg-brand-primary selection:text-white overflow-x-hidden">

      {/* ── Navbar ─────────────────────────────────────────────── */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)] py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
          <div className="flex items-center gap-2 z-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className={`w-20 md:w-28 h-16 md:h-20 flex items-center justify-center transition-colors duration-300 ${isScrolled ? '' : ''}`}
            >
              <img src="./assets/logo.png" alt="Hyle Laban Logo" className="w-full h-full object-contain" />
            </motion.div>
            <span className={`text-3xl font-heading font-black tracking-tight uppercase transition-colors duration-300 -ml-2 ${isScrolled ? 'text-brand-text' : 'text-white'}`}>
              Hyle Laban
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
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="./assets/poster.png"
              className="w-full h-full object-cover object-center"
            >
              <source src="https://firebasestorage.googleapis.com/v0/b/unitedareechola.appspot.com/o/LABAAN%20FILM%2003.mp4?alt=media&token=284747bd-0077-4805-be50-ce94d54dec05" type="video/mp4" />
            </video>
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

            <h1 className="text-[4rem] sm:text-[6vw] lg:text-[7rem] font-heading font-black tracking-tight leading-[0.95] text-white mb-8 drop-shadow-2xl">
              <AnimatedHeadline text="Taste the True" className="block" isMobile={isMobile} />
              <AnimatedHeadline
                text="Essence of Laban."
                className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-sky-300 to-blue-400"
                isMobile={isMobile}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/70 text-lg sm:text-xl font-light mb-14 max-w-2xl mx-auto leading-relaxed"
            >

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

          {/* Floating mascot — hero bottom-right */}
          <motion.img
            src="./assets/Mascot.png"
            alt="Hyle Laban Mascot"
            initial={{ opacity: 0, x: 80, y: 20 }}
            animate={{ opacity: 1, x: 0, y: [0, -14, 0] }}
            transition={{ opacity: { duration: 1, delay: 1 }, x: { duration: 1, delay: 1 }, y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 } }}
            className="absolute bottom-0 right-4 md:right-16 z-20 w-28 md:w-52 lg:w-64 select-none pointer-events-none drop-shadow-2xl"
            loading="lazy"
          />
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
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
                  transition={{ delay: 0.4, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-6 -right-6 bg-white rounded-2xl px-6 py-4 shadow-xl border border-gray-100/80 z-20"
                >
                  <p className="text-3xl font-black font-heading text-brand-primary leading-none">30+</p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Locations</p>
                </motion.div>

                {/* Story mascot */}
                <motion.img
                  src="./assets/Mascot 01.png"
                  alt="Mascot"
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0, y: [0, -10, 0] }}
                  viewport={{ once: true }}
                  transition={{ opacity: { duration: 0.6, delay: 0.3 }, x: { duration: 0.6, delay: 0.3 }, y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 } }}
                  className="absolute -top-12 -left-12 w-20 md:w-28 z-20 select-none pointer-events-none drop-shadow-xl"
                />
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
                    '"Why should something this special be experienced only abroad?" — That question sparked Hyle Laban. We set out to bring the richness of authentic laban desserts to India, not as a foreign concept, but as a familiar, accessible, everyday joy.',
                    'Our goal is to become the most loved laban-based dessert brand in the country, known for quality, warmth, and an unforgettable taste that connects families, friends, and communities across Kerala and beyond.',
                    '"If a taste can make one person travel across countries to experience it, we will bring that taste to every city in India." That is our promise — from our kitchen to your heart.',
                  ].map((para, i) => (
                    <motion.p key={i} variants={fadeUp}>{para}</motion.p>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Mission & Vision Text Blocks */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }} variants={stagger}
              className="mt-24 lg:mt-32 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16"
            >
              {/* Vision */}
              <motion.div variants={fadeUp} className="bg-white rounded-[40px] p-10 lg:p-14 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] border border-gray-100/60 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-bl-[100px] -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-110" />
                <h3 className="text-3xl font-heading font-black text-[#001732] mb-6 relative z-10 flex items-center gap-4">
                  <span className="w-12 h-1 bg-brand-primary rounded-full" />
                  Vision
                </h3>
                <div className="space-y-4 text-[#4a5568] text-base leading-relaxed font-light relative z-10">
                  <p>Our vision was shaped by a simple question: <br /><strong className="text-brand-primary font-medium">"Why should something this special be experienced only abroad?"</strong></p>
                  <p>We want to bring the richness of authentic laban desserts to India, not as a foreign concept, but as a familiar, accessible, everyday joy. Our goal is to become the most loved laban-based dessert brand in the country, known for quality, warmth, and an unforgettable taste that connects families, friends, and communities.</p>
                  <p>We aspire to build spaces where people feel the same excitement our founder felt in that moment when culture, flavor, and curiosity meet.</p>
                  <p>By expanding through passionate franchise partners, we aim to create a national presence that celebrates Middle Eastern indulgence, reimagined for India.</p>
                </div>
              </motion.div>

              {/* Mission */}
              <motion.div variants={fadeUp} className="bg-[#001732] text-white rounded-[40px] p-10 lg:p-14 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 rounded-bl-[100px] -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-110" />
                <h3 className="text-3xl font-heading font-black mb-6 relative z-10 flex items-center gap-4">
                  <span className="w-12 h-1 bg-brand-primary rounded-full" />
                  Mission
                </h3>
                <div className="space-y-4 text-white/80 text-base leading-relaxed font-light relative z-10">
                  <p>Our mission began with a promise: <br /><strong className="text-white font-medium">"If a taste can make one person travel across countries to experience it, we will bring that taste to every city in India."</strong></p>
                  <p>Hyle Laban's mission is to deliver rich, creamy, soulful desserts while honoring their cultural roots. We blend traditional preparation methods with modern flavors, creating a dessert experience that feels both familiar and unforgettable.</p>
                  <p className="font-medium text-white pt-2">We are committed to:</p>
                  <ul className="list-none space-y-2 mt-2">
                    {['Using high-quality ingredients, just as the originals do', 'Training every kitchen to maintain authentic preparation methods', 'Designing each outlet to feel warm, inviting, and culturally rooted', 'Supporting franchise partners to build success stories with us'].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-brand-primary mt-1">✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="pt-4 border-t border-white/10 mt-4"><strong className="text-white">Our purpose is simple:</strong><br />To inspire India's dessert lovers with a taste that carries a story, from Dubai to here, from our kitchen to your heart.</p>
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
              className="text-center mb-20 relative"
            >
              {/* Decorative mascot left of heading */}
              <motion.img
                src="./assets/Mascot 02.png"
                alt="Mascot"
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 w-28 xl:w-36 select-none pointer-events-none drop-shadow-xl"
              />

              <h2 className="text-[2.8rem] md:text-[4.5rem] font-heading font-black text-[#001732] leading-[1.05] tracking-tight">
                <AnimatedHeadline text="Explore the Menu" className="" isMobile={isMobile} />
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
                  <div className="h-[320px] md:h-[380px] flex items-center justify-center mb-6 relative w-full pt-4">
                    <motion.img
                      src={product.img}
                      alt={product.name}
                      whileHover={{ scale: 1.05, rotate: 1 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="w-full h-full object-cover rounded-3xl relative z-10"
                    />
                    {/* Badge */}
                    <div className="absolute top-4 right-4 z-20">
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

                  {/* Name */}
                  <div className="flex justify-between items-center mb-1 px-2">
                    <h4 className="text-[1.5rem] font-black font-heading text-[#001732]">{product.name}</h4>
                    <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                      <ChevronDown className="text-gray-400" size={22} strokeWidth={2.5} />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats strip ──────────────────────────────────────── */}
        <section className="py-20 bg-white border-y border-gray-100 relative overflow-hidden">
          {/* Mascot 03 — floating right */}
          <motion.img
            src="./assets/Mascot 03.png"
            alt="Mascot"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 0.9, x: 0, y: [0, -12, 0] }}
            viewport={{ once: true }}
            transition={{ opacity: { duration: 0.8 }, x: { duration: 0.8 }, y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 } }}
            className="absolute right-0 bottom-0 w-24 md:w-36 select-none pointer-events-none drop-shadow-xl z-10"
          />
          {/* Mascot 04 — floating left */}
          <motion.img
            src="./assets/Mascot 04.png"
            alt="Mascot"
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 0.9, x: 0, y: [0, -12, 0] }}
            viewport={{ once: true }}
            transition={{ opacity: { duration: 0.8, delay: 0.2 }, x: { duration: 0.8, delay: 0.2 }, y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 } }}
            className="absolute left-0 bottom-0 w-24 md:w-36 select-none pointer-events-none drop-shadow-xl z-10"
          />
          <div className="container mx-auto px-6 max-w-7xl relative z-20">
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

        {/* ── Locations — Journey Map ──────────────────────────── */}
        <section id="locations" className="relative overflow-hidden bg-white" style={{ paddingTop: '6rem', paddingBottom: '0' }}>

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="container mx-auto px-6 max-w-7xl text-center mb-12 relative z-10"
          >
            <p className="text-brand-primary uppercase tracking-[0.25em] text-xs font-bold flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-brand-primary" />
              Our Journey
              <span className="w-8 h-px bg-brand-primary" />
            </p>
            <h2 className="text-[2.8rem] md:text-[4.5rem] font-heading font-black text-[#001732] leading-[1.05] tracking-tight mb-4">
              <AnimatedHeadline text="Hyle Laban Journey Across Chennai" className="" isMobile={isMobile} />
            </h2>
            <p className="text-gray-500 text-lg font-light max-w-xl mx-auto mb-8">From OMR to the heart of the city — taste us near you.</p>

            {/* Legend */}
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-brand-primary flex items-center justify-center shadow-md">
                  <Star size={14} fill="white" className="text-white" />
                </span>
                <span className="text-sm font-bold text-[#001732]">Running Shop</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-white border-2 border-[#4295b9] flex items-center justify-center shadow-sm">
                  <MapPin size={13} className="text-[#4295b9]" strokeWidth={2.5} />
                </span>
                <span className="text-sm font-bold text-gray-400">Upcoming Shop</span>
              </div>
            </div>
          </motion.div>

          {/* Map container */}
          <div className="relative w-full" style={{ minHeight: '560px', background: 'linear-gradient(180deg,#dff2fb 0%,#b8e3f5 40%,#e8f6fc 100%)' }}>

            {/* Wavy water lines SVG — background atmosphere */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1200 560" xmlns="http://www.w3.org/2000/svg">
              {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                <ellipse key={i} cx={100 + i * 140} cy={280 + (i % 3) * 40 - 40} rx={120} ry={55}
                  fill="none" stroke="#27aae1" strokeWidth="1.2" strokeOpacity="0.18" />
              ))}
              {/* City skyline silhouette top */}
              <path d="M0,140 L60,140 L60,120 L80,120 L80,100 L100,100 L100,80 L120,80 L120,100 L140,100 L140,140 L200,140 L200,110 L220,110 L220,90 L240,90 L240,110 L260,110 L260,140 L340,140 L340,115 L360,115 L360,95 L375,95 L375,75 L390,75 L390,95 L405,95 L405,115 L440,115 L440,140 L520,140 L520,115 L540,115 L540,95 L560,95 L560,115 L580,115 L580,140 L650,140 L650,110 L670,110 L670,90 L690,90 L690,70 L710,70 L710,90 L730,90 L730,110 L760,110 L760,140 L840,140 L840,115 L860,115 L860,95 L880,95 L880,115 L920,115 L920,140 L1000,140 L1000,115 L1020,115 L1020,95 L1040,95 L1040,115 L1080,115 L1080,140 L1200,140"
                fill="#c8e8f5" stroke="#27aae1" strokeWidth="1" strokeOpacity="0.3" fillOpacity="0.4" />
            </svg>

            {/* Dashed journey paths */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <style>{`
                  .dash-path { stroke-dasharray: 2.5 2; animation: dashMove 6s linear infinite; }
                  @keyframes dashMove { to { stroke-dashoffset: -20; } }
                `}</style>
              </defs>
              {/* vertical spine */}
              <path className="dash-path" d="M47,82 Q47,74 47,66 Q47,58 55,55 Q63,52 55,44 Q52,36 52,30 Q52,24 54,18" fill="none" stroke="#27aae1" strokeWidth="0.4" strokeOpacity="0.55" />
              {/* horizontal bottom */}
              <path className="dash-path" d="M18,82 Q32,78 47,82 Q62,86 78,82" fill="none" stroke="#27aae1" strokeWidth="0.4" strokeOpacity="0.55" />
              {/* left branch */}
              <path className="dash-path" d="M18,82 Q18,74 18,66 Q18,60 25,55 Q30,50 30,44 Q26,40 22,36 Q21,29 20,22" fill="none" stroke="#27aae1" strokeWidth="0.35" strokeOpacity="0.45" />
              {/* right branch */}
              <path className="dash-path" d="M78,82 Q76,65 75,48 Q74,43 78,38 Q75,33 72,28" fill="none" stroke="#27aae1" strokeWidth="0.35" strokeOpacity="0.45" />
              {/* cross links */}
              <path className="dash-path" d="M47,66 Q46,66 25,55" fill="none" stroke="#27aae1" strokeWidth="0.25" strokeOpacity="0.3" />
              <path className="dash-path" d="M55,55 Q65,51 75,48" fill="none" stroke="#27aae1" strokeWidth="0.25" strokeOpacity="0.3" />
              <path className="dash-path" d="M30,44 Q42,40 55,44" fill="none" stroke="#27aae1" strokeWidth="0.25" strokeOpacity="0.3" />
              <path className="dash-path" d="M32,26 Q43,22 54,18" fill="none" stroke="#27aae1" strokeWidth="0.25" strokeOpacity="0.3" />
              <path className="dash-path" d="M20,22 Q32,20 32,26" fill="none" stroke="#27aae1" strokeWidth="0.25" strokeOpacity="0.3" />
              <path className="dash-path" d="M55,30 Q63,29 72,28" fill="none" stroke="#27aae1" strokeWidth="0.25" strokeOpacity="0.3" />
            </svg>

            {/* Location pins — absolutely positioned using % coordinates */}
            <div className="absolute inset-0">
              {mapLocations.map((loc, i) => (
                <motion.div
                  key={loc.name}
                  initial={{ opacity: 0, scale: 0, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.15, zIndex: 50 }}
                  className="absolute flex flex-col items-center group cursor-pointer"
                  style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: 'translate(-50%,-100%)' }}
                >
                  {/* Label above pin */}
                  <div className={`mb-1 px-2 py-0.5 rounded-full text-[0.6rem] font-black uppercase tracking-wide whitespace-nowrap shadow-sm
                    ${loc.starred ? 'bg-[#001732] text-white' : 'bg-white text-[#001732] border border-[#4295b9]/40'}`}>
                    {loc.name}
                    {loc.sub && <span className="ml-1 font-normal text-[0.5rem] opacity-70">{loc.sub}</span>}
                  </div>
                  {/* Pin icon */}
                  {loc.starred ? (
                    <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center shadow-[0_4px_16px_rgba(39,170,225,0.55)] border-2 border-white group-hover:shadow-[0_6px_24px_rgba(39,170,225,0.7)] transition-shadow">
                      <Star size={14} fill="white" className="text-white" strokeWidth={1} />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-md border-2 border-[#4295b9]/60 group-hover:border-brand-primary transition-colors">
                      <MapPin size={12} className="text-[#4295b9]" strokeWidth={2.5} />
                    </div>
                  )}
                  {/* Drop needle */}
                  <div className={`w-px h-3 ${loc.starred ? 'bg-brand-primary' : 'bg-[#4295b9]/50'}`} />
                </motion.div>
              ))}
            </div>

            {/* Mascot walking — bottom left */}
            <motion.img
              src="./assets/Mascot.png"
              alt="Hyle Laban Mascot"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0, y: [0, -10, 0] }}
              viewport={{ once: true }}
              transition={{ opacity: { duration: 0.8, delay: 0.3 }, x: { duration: 0.8, delay: 0.3 }, y: { duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 } }}
              className="absolute bottom-0 left-4 md:left-12 w-28 md:w-44 select-none pointer-events-none drop-shadow-2xl z-20"
            />

            {/* Brand watermark right */}
            <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-10 opacity-90">
              <img src="./assets/logo.png" alt="Hyle Laban" className="w-14 md:w-20 drop-shadow" />
              <div className="text-center">
                <p className="font-heading font-black text-[#001732] text-sm md:text-base leading-tight">Hyle Laban</p>
                <p className="font-bold text-[#27aae1] text-[0.6rem] md:text-xs uppercase tracking-widest">Journey Across Chennai</p>
              </div>
            </div>

            {/* Bottom wave */}
            <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1200 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,30 Q100,0 200,30 Q300,60 400,30 Q500,0 600,30 Q700,60 800,30 Q900,0 1000,30 Q1100,60 1200,30 L1200,60 L0,60 Z" fill="white" />
            </svg>
          </div>

          {/* Stats row below map */}
          <div className="bg-white pt-10 pb-0">
            <div className="container mx-auto px-6 max-w-5xl">
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center border border-gray-100 rounded-3xl p-8 shadow-sm"
              >
                {[
                  { val: `${mapLocations.filter(l => l.starred).length}`, label: 'Running Shops' },
                  { val: `${mapLocations.filter(l => !l.starred).length + 6}`, label: 'Opening Soon' },
                  { val: `${mapLocations.length + 6}+`, label: 'Locations' },
                  { val: 'India', label: 'Nationwide' },
                ].map((stat, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex flex-col items-center">
                    <span className="text-[2.8rem] font-black font-heading text-brand-primary leading-none">{stat.val}</span>
                    <span className="text-sm text-gray-400 font-bold uppercase tracking-wider mt-2">{stat.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Expanding Soon — upcoming cities across India */}
          <div className="bg-white py-14">
            <div className="container mx-auto px-6 max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-center mb-10"
              >
                <p className="text-brand-primary uppercase tracking-[0.25em] text-xs font-bold flex items-center justify-center gap-3 mb-3">
                  <span className="w-8 h-px bg-brand-primary" />
                  Coming Soon
                  <span className="w-8 h-px bg-brand-primary" />
                </p>
                <h3 className="text-2xl md:text-3xl font-heading font-black text-[#001732]">Expanding Across India</h3>
                <p className="text-gray-400 text-sm mt-2">These cities are opening soon — stay tuned!</p>
              </motion.div>

              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
                className="flex flex-wrap justify-center gap-4"
              >
                {[
                  { city: 'Salem', state: 'Tamil Nadu' },
                  { city: 'Madurai', state: 'Tamil Nadu' },
                  { city: 'Hyderabad', state: 'Telangana' },
                  { city: 'Mumbai', state: 'Maharashtra' },
                  { city: 'Pune', state: 'Maharashtra' },
                  { city: 'Delhi', state: 'NCR' },
                ].map((loc, i) => (
                  <motion.div
                    key={loc.city}
                    variants={fadeUp}
                    whileHover={{ y: -4, scale: 1.04 }}
                    className="flex items-center gap-3 bg-gray-50 border border-[#4295b9]/25 rounded-2xl px-6 py-4 shadow-sm hover:shadow-md hover:border-brand-primary/40 transition-all duration-300 cursor-default"
                  >
                    <span className="w-8 h-8 rounded-full bg-[#eaf6fc] border border-[#4295b9]/30 flex items-center justify-center flex-shrink-0">
                      <MapPin size={14} className="text-[#4295b9]" strokeWidth={2.5} />
                    </span>
                    <div className="text-left">
                      <p className="font-heading font-black text-[#001732] text-base leading-tight">{loc.city}</p>
                      <p className="text-[0.65rem] text-gray-400 font-bold uppercase tracking-wider">{loc.state}</p>
                    </div>
                    <span className="ml-2 bg-amber-50 text-amber-500 border border-amber-200 text-[0.55rem] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">Soon</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer id="contact" className="bg-white pt-24 pb-12 border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 border-b border-gray-100 pb-16 mb-10">
            <div className="md:col-span-12 lg:col-span-5 flex flex-col space-y-6 pr-8">
              <div className="flex items-center gap-2">
                <div className="w-24 md:w-32 h-20 md:h-28 flex items-center justify-center">
                  <img src="./assets/logo.png" alt="Hyle Laban Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-3xl font-heading font-black tracking-tight text-brand-text uppercase mt-1 -ml-2">Hyle Laban</span>
              </div>
              <p className="text-brand-text-muted text-lg font-light leading-relaxed mt-4">
                Pure Sweetness — delivering rich, creamy, soulful laban desserts inspired by the streets of Dubai, now in every city across India.
              </p>
              <div className="flex space-x-3 pt-4">
                <a href="https://www.instagram.com/hyle_laban" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-brand-text border border-gray-100 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-300"><Instagram size={20} /></a>
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
                  <div>
                    <div>+91 99402 80906</div>
                    <div>+91 99479 76573</div>
                  </div>
                </li>
                <li className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex flex-shrink-0 items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primary"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                  </div>
                  <a href="mailto:hylelaban@gmail.com" className="hover:text-brand-primary transition-colors">hylelaban@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-brand-text-muted font-medium text-sm">
            <p>&copy; {new Date().getFullYear()} Hyle Laban. All rights reserved.</p>
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
