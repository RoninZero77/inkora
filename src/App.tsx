import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import {
  MessageSquare,
  Send,
  MapPin,
  Instagram,
  Calendar,
  CheckCircle,
  User,
  Scissors,
  ShieldCheck,
  ChevronRight,
  Database,
  Trash2,
  X,
  Skull,
  Sword,
  Anchor,
  Zap,
  Droplet
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Persistence Logic
const STORAGE_KEY = 'inkora_leads';

const saveLead = (lead: any) => {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const newLead = { ...lead, id: Date.now(), createdAt: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([newLead, ...existing]));
  return newLead;
};

const getLeads = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
const deleteLead = (id: number) => {
  const existing = getLeads();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.filter((l: any) => l.id !== id)));
};

const Lightbox = ({ selectedImg, setSelectedImg }: { selectedImg: any, setSelectedImg: (img: any) => void }) => {
  const motionZoom = useMotionValue(1);
  const motionPanX = useMotionValue(0);
  const motionPanY = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [currentZoomDisplay, setCurrentZoomDisplay] = useState(100);

  // Robust Scroll Lock
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const closeLightbox = (e?: any) => {
    if (e) e.stopPropagation();
    setSelectedImg(null);
  };

  return (
    <motion.div
      key="lightbox-main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="fixed inset-0 z-200 bg-black/98 backdrop-blur-3xl flex items-center justify-center overflow-hidden touch-none"
    >
      <div className="absolute inset-0 z-0" onClick={closeLightbox} />

      <div className="absolute top-6 right-6 z-210">
        <button
          onClick={closeLightbox}
          className="w-14 h-14 rounded-full bg-white/10 hover:bg-red-500/80 flex items-center justify-center transition-all backdrop-blur-md border border-white/10 shadow-2xl active:scale-90"
        >
          <X size={28} />
        </button>
      </div>

      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-210 bg-black/50 px-6 py-2 rounded-full border border-white/10 text-[10px] uppercase tracking-[0.3em] font-bold">
        {selectedImg.title} <span className="text-amber-500 ml-4">{currentZoomDisplay}%</span>
      </div>

      <div
        className="relative w-full h-full flex items-center justify-center cursor-move"
        onWheel={(e) => {
          const delta = e.deltaY * -0.005;
          const next = Math.min(Math.max(motionZoom.get() + delta, 0.5), 5);
          motionZoom.set(next);
          setCurrentZoomDisplay(Math.round(next * 100));
        }}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseMove={(e) => {
          if (!isDragging || motionZoom.get() <= 1.05) return;
          motionPanX.set(motionPanX.get() + e.movementX);
          motionPanY.set(motionPanY.get() + e.movementY);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          if (e.touches.length === 2) {
            (e.currentTarget as any)._lastDist = Math.hypot(
              e.touches[0].pageX - e.touches[1].pageX,
              e.touches[0].pageY - e.touches[1].pageY
            );
          } else if (e.touches.length === 1) {
            (e.currentTarget as any)._lastTouch = { x: e.touches[0].pageX, y: e.touches[0].pageY };
          }
        }}
        onTouchEnd={() => {
          setIsDragging(false);
          setCurrentZoomDisplay(Math.round(motionZoom.get() * 100));
        }}
        onTouchMove={(e) => {
          if (e.touches.length === 2) {
            const dist = Math.hypot(
              e.touches[0].pageX - e.touches[1].pageX,
              e.touches[0].pageY - e.touches[1].pageY
            );
            const lastDist = (e.currentTarget as any)._lastDist || dist;
            const delta = (dist - lastDist) * 0.01;
            motionZoom.set(Math.min(Math.max(motionZoom.get() + delta, 0.5), 5));
            (e.currentTarget as any)._lastDist = dist;
          } else if (e.touches.length === 1 && motionZoom.get() > 1.05) {
            const touch = { x: e.touches[0].pageX, y: e.touches[0].pageY };
            const lastTouch = (e.currentTarget as any)._lastTouch || touch;
            motionPanX.set(motionPanX.get() + (touch.x - lastTouch.x));
            motionPanY.set(motionPanY.get() + (touch.y - lastTouch.y));
            (e.currentTarget as any)._lastTouch = touch;
          }
        }}
      >
        <motion.div
          style={{
            scale: motionZoom,
            x: motionPanX,
            y: motionPanY,
            willChange: 'transform'
          }}
          className="relative pointer-events-none"
        >
          <img
            src={selectedImg.src}
            alt={selectedImg.title}
            className="max-h-[75vh] sm:max-h-[85vh] w-auto rounded-lg shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-white/5"
          />
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-500 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.4em] pointer-events-none text-center px-6">
        <span className="sm:hidden">Pellizca para zoom y arrastra para explorar</span>
        <span className="hidden sm:inline">Usa el scroll y arrastra para explorar el detalle</span>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [section, setSection] = useState('home');
  const [catFilter, setCatFilter] = useState('HOMBRE');
  const [selectedImg, setSelectedImg] = useState<any>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [pin, setPin] = useState('');

  // Final Interaction Safety Layer
  useEffect(() => {
    if (!selectedImg) {
      const reset = () => {
        document.body.style.overflow = 'unset';
        document.body.style.cursor = 'default';
        document.body.style.pointerEvents = 'auto';
        // Force a layout reflow for sticky browsers
        window.dispatchEvent(new Event('resize'));
      };
      reset();
      // Second pass to ensure exit animations finished
      const timer = setTimeout(reset, 300);
      return () => clearTimeout(timer);
    }
  }, [selectedImg]);

  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImg(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);
  const [leads, setLeads] = useState(getLeads());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    style: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Sync leads when admin is opened
  useEffect(() => {
    if (showAdmin) setLeads(getLeads());
  }, [showAdmin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate slight delay for premium feel
    await new Promise(r => setTimeout(r, 1200));

    // Save to Local DB
    saveLead(formData);

    setIsSubmitting(false);
    setSuccess(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const openWhatsApp = () => {
    const phone = "573144015703";
    const text = `¡Hola INKORA! 👋\n\nAcabo de dejar mis datos en la web:\n\n` +
      `👤 *Nombre:* ${formData.name}\n` +
      `📧 *Email:* ${formData.email}\n` +
      `📱 *Teléfono:* ${formData.phone}\n` +
      `🎨 *Estilo:* ${formData.style}\n` +
      `📝 *Idea:* ${formData.description}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Reset pin when closing admin
  useEffect(() => {
    if (!showAdmin) {
      setAdminAuth(false);
      setPin('');
    }
  }, [showAdmin]);

  const handlePinInput = (digit: string) => {
    setPin(prev => {
      const next = prev + digit;
      if (next === '2026') {
        setTimeout(() => setAdminAuth(true), 300);
      } else if (next.length >= 4) {
        setTimeout(() => setPin(''), 500);
      }
      return next.slice(0, 4);
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-['Outfit'] selection:bg-amber-500/30 selection:text-white overflow-x-hidden relative">
      
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            key="loader"
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-500 bg-black flex items-center justify-center overflow-hidden"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 40], opacity: [0, 1, 1] }}
              transition={{ duration: 1.5, ease: "circIn" }}
              className="w-20 h-20 bg-white rounded-full blur-md mix-blend-difference"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute text-white font-black text-4xl tracking-[1em] uppercase"
            >
              Inkora
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox - Motor de Alto Rendimiento 60FPS (TOP LEVEL) */}
      <AnimatePresence>
        {selectedImg && (
          <Lightbox selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
        )}
      </AnimatePresence>

      {/* Massive Old School Tattoo Rain - ULTRA OPTIMIZED 2.0 */}
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden opacity-[0.2] bg-[#050505]">
        {[...Array(30)].map((_, i) => {
          const size = Math.random() * 25 + 15;
          const duration = Math.random() * 6 + 4;
          const delay = Math.random() * -15;
          const leftPos = (i * (100 / 30)); 
          const icons = [<Skull size={size} />, <Sword size={size} />, <Anchor size={size} />, <Droplet size={size} />, <Zap size={size} />];
          const icon = icons[i % icons.length];
          
          return (
            <motion.div
              key={i}
              initial={{ y: -100, rotate: Math.random() * 360 }}
              animate={{ 
                y: "110vh",
                rotate: 180,
              }}
              transition={{ 
                duration, 
                repeat: Infinity, 
                delay,
                ease: "linear" 
              }}
              className="absolute text-zinc-500/50 flex flex-col items-center will-change-transform"
              style={{ left: `${leftPos}%` }}
            >
              {icon}
              <div className="w-px h-20 bg-linear-to-b from-zinc-700/30 to-transparent mt-1" />
            </motion.div>
          );
        })}
        
        {/* Deep Ink Splashes - Light Optimization */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`drop-${i}`}
            animate={{ 
              scale: [0.95, 1.05, 0.95],
              opacity: [0, 0.08, 0]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              delay: i * 4,
              ease: "easeInOut"
            }}
            className="absolute rounded-full bg-zinc-900 blur-[80px] will-change-transform"
            style={{
              width: Math.random() * 300 + 300,
              height: Math.random() * 300 + 300,
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
          />
        ))}
      </div>

      {/* Navigation - Responsive Adaptada (Prioridad Absoluta) */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] sm:w-auto sm:min-w-[400px] z-[999] px-6 sm:px-10 py-3 flex justify-center items-center backdrop-blur-xl bg-zinc-200/90 border border-zinc-300 shadow-2xl rounded-full">
        <div className="flex gap-4 sm:gap-10 text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-black">
          <button onClick={() => setSection('home')} className="hover:opacity-60 transition-opacity">Studio</button>
          <button onClick={() => setSection('catalogue')} className="hover:opacity-60 transition-opacity">Catálogo</button>
          <button onClick={() => setSection('booking')} className="hover:opacity-60 transition-opacity">Reserva</button>
          <button onClick={() => setShowAdmin(true)} className="hover:text-amber-600 transition-all flex items-center gap-2">
            <Database size={14} /> <span className="hidden xs:inline">Gestión</span>
          </button>
        </div>
      </nav>

      {/* Desktop Logo (Fixed Corner) - MAX IMPACT */}
      <div className="hidden sm:block fixed top-4 left-6 z-100 group">
        <div className="absolute inset-0 bg-yellow-400/20 blur-[60px] rounded-full group-hover:bg-yellow-400/40 transition-all duration-1000" />
        <button onClick={() => setSection('home')} className="relative hover:scale-110 transition-transform duration-500">
          <img
            src="/assets/logo.png"
            alt="INKORA"
            className="h-32 lg:h-56 w-auto brightness-150 contrast-125"
            style={{ 
              filter: 'drop-shadow(0 0 15px rgba(255,255,0,0.8)) drop-shadow(0 0 30px rgba(255,255,0,0.4))' 
            }}
          />
        </button>
      </div>

      {/* Header Space for Nav */}
      <div className="h-28 sm:h-10" />

      {/* Mobile Logo - Dynamic Impact (Reserva Fix) */}
      <div className={cn(
        "sm:hidden flex justify-center relative z-20 px-6 transition-all duration-500",
        section === 'home' ? "h-48 mb-6 mt-16" : "h-24 mb-2 mt-16"
      )}>
        <motion.button 
          onClick={() => setSection('home')} 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <img
            src="/assets/logo.png"
            alt="INKORA"
            className="h-full w-auto object-contain brightness-200 contrast-150 saturate-150 transition-all duration-500"
            style={{ 
                filter: 'drop-shadow(0 0 15px rgba(255,255,0,0.9))' 
            }}
            loading="eager"
          />
        </motion.button>
      </div>

      <main className="relative z-10 px-6 pt-10 sm:pt-40 pb-32">
        <AnimatePresence mode="wait">
          {section === 'home' && (
            <motion.section
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-6xl mx-auto"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                <div className="space-y-10 text-center lg:text-left">
                  <motion.h1 
                    className="text-5xl sm:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.9]"
                  >
                    {["ARTE", "SIN", "LÍMITES"].map((word, i) => (
                      <span key={i} className="block overflow-hidden h-fit">
                        <motion.span
                          initial={{ y: "100%" }}
                          animate={!isLoading ? { y: 0 } : { y: "100%" }}
                          transition={{ duration: 0.8, delay: 0.5 + (i * 0.1), ease: [0.33, 1, 0.68, 1] }}
                          className={cn("inline-block", i === 2 ? "text-gradient" : "")}
                        >
                          {word}
                        </motion.span>
                      </span>
                    ))}
                  </motion.h1>
                  <p className="text-lg sm:text-xl text-zinc-400 max-w-md mx-auto lg:mx-0 font-light leading-relaxed">
                    Personalizamos cada trazo para que tu piel sea el lienzo de tu mejor historia.
                  </p>
                  <div className="flex flex-col xs:flex-row gap-4 justify-center lg:justify-start">
                    <button
                      onClick={() => setSection('booking')}
                      className="bg-white text-black px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all duration-500 flex items-center justify-center gap-3 text-xs sm:text-sm"
                    >
                      Reserva ahora <ChevronRight size={18} />
                    </button>
                    <button
                      onClick={() => setSection('catalogue')}
                      className="border border-white/10 px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold uppercase tracking-widest hover:bg-white/5 transition-all duration-500 flex items-center justify-center gap-3 text-xs sm:text-sm"
                    >
                      Ver catálogo
                    </button>
                  </div>
                </div>

                <div className="relative group mx-auto max-w-md lg:max-w-none">
                  <div className="absolute inset-0 bg-amber-500/10 blur-[100px] rounded-full group-hover:bg-amber-500/20 transition-all duration-1000" />
                  <img
                    src="/assets/producto/mujer/brazo_leon.png"
                    alt="Inkora Show"
                    className="relative w-full aspect-4/5 object-cover rounded-[3rem] grayscale hover:grayscale-0 transition-all duration-1000 border border-white/5 shadow-2xl"
                  />
                </div>
              </div>

              {/* Stats/Badges */}
              <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  { icon: <Scissors />, name: 'Precisión Técnica', desc: 'Dominio experto de líneas finas y sombreados realistas para un acabado impecable.' },
                  { icon: <ShieldCheck />, name: 'Bioseguridad', desc: 'Protocolos estrictos de higiene y uso exclusivo de materiales desechables de grado médico.' },
                  { icon: <CheckCircle />, name: 'Garantía de Arte', desc: 'Diseños de autor personalizados que mantienen su esencia y vitalidad en el tiempo.' }
                ].map((item, i) => (
                  <div key={i} className="p-10 border border-white/5 rounded-4xl hover:bg-zinc-900/50 transition-all group text-center">
                    <div className="text-amber-500 mb-6 flex justify-center group-hover:scale-110 transition-transform">{item.icon}</div>
                    <h3 className="text-xl font-bold uppercase tracking-tight mb-2">{item.name}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {section === 'catalogue' && (
            <motion.section
              key="catalogue"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-10 sm:mb-16">
                <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase mb-4">Catálogo de <span className="text-gradient">Trabajos</span></h2>
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-6">
                  {['HOMBRE', 'MUJER'].map(cat => (
                    <motion.button
                      key={cat}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCatFilter(cat)}
                      className={cn(
                        "px-8 sm:px-12 py-3 rounded-full text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] transition-all border",
                        catFilter === cat ? "bg-amber-500 border-amber-500 text-black px-10 sm:px-14 shadow-[0_0_20px_rgba(245,158,11,0.3)]" : "border-white/5 text-zinc-500 hover:border-white/20"
                      )}
                    >
                      {cat}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {(catFilter === 'HOMBRE' ? [
                  { src: '/assets/producto/hombre/abdomen.png', title: 'Abdomen Warrior' },
                  { src: '/assets/producto/hombre/anime.png', title: 'Anime Culture' },
                  { src: '/assets/producto/hombre/espalda.png', title: 'Full Back' },
                  { src: '/assets/producto/hombre/gemelo.png', title: 'Geometry Calf' },
                ] : [
                  { src: '/assets/producto/mujer/brazo_leon.png', title: 'Queen Lion' },
                  { src: '/assets/producto/mujer/calavera.png', title: 'Floral Skull' },
                  { src: '/assets/producto/mujer/demonia.png', title: 'Dark Soul' },
                  { src: '/assets/producto/mujer/hada.png', title: 'Fairy Forest' },
                  { src: '/assets/producto/mujer/pierna_buho.png', title: 'Owl Spirit' },
                ]).map((img, i) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={`img-${catFilter}-${img.src}-${i}`}
                    id={`gallery-item-${i}`}
                    onClick={(e) => { 
                      e.stopPropagation();
                      setSelectedImg(img); 
                    }}
                    className="relative aspect-4/5 rounded-4xl overflow-hidden group border border-white/5 cursor-zoom-in"
                  >
                    <div className="absolute inset-0 bg-linear-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10" />
                    <img src={img.src} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                    {/* Skin Shimmer Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none z-20" />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8 z-30">
                      <div>
                        <p className="text-[10px] text-amber-500 uppercase tracking-widest font-bold mb-1">{catFilter}</p>
                        <h4 className="text-xl font-bold uppercase">{img.title}</h4>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-20 text-center">
                <button
                  onClick={() => setSection('booking')}
                  className="bg-zinc-900 border border-white/10 px-12 py-5 rounded-full font-bold uppercase tracking-widest hover:border-amber-500 transition-all duration-500"
                >
                  ¿Te gusta alguno? Reserva aquí
                </button>
              </div>
            </motion.section>
          )}

          {section === 'booking' && (
            <motion.section
              key="booking"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="max-w-4xl mx-auto relative z-20"
            >
              {!success ? (
                <div className="bg-zinc-900 border border-white/10 p-6 sm:p-12 rounded-4xl sm:rounded-[3rem] backdrop-blur-3xl shadow-2xl">
                  <h2 className="text-3xl sm:text-5xl font-black mb-2 uppercase tracking-tighter text-white">RESERVA</h2>
                  <p className="text-zinc-400 mb-8 sm:mb-10 text-xs sm:text-sm font-bold">Reserva tu historia hoy.</p>

                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-[0.2em] font-black text-amber-500">Nombre Completo</label>
                      <input
                        required
                        className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl focus:border-amber-500 text-white outline-none transition-all placeholder:text-zinc-600 font-medium"
                        placeholder="Tu nombre aquí"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-[0.2em] font-black text-amber-500">Email</label>
                        <input
                          required type="email"
                          className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl focus:border-amber-500 text-white outline-none transition-all placeholder:text-zinc-600 font-medium"
                          placeholder="hola@ejemplo.com"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-[0.2em] font-black text-amber-500">WhatsApp</label>
                        <input
                          required
                          className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl focus:border-amber-500 text-white outline-none transition-all placeholder:text-zinc-600 font-medium"
                          placeholder="+57..."
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] opacity-40">Estilo Preferido</label>
                      <div className="flex flex-wrap gap-2">
                        {['Realismo', 'Blackwork', 'Tradicional', 'Minimalista'].map(s => (
                          <button
                            key={s} type="button"
                            onClick={() => setFormData({ ...formData, style: s })}
                            className={cn(
                              "px-6 py-2 rounded-full text-xs uppercase tracking-widest border transition-all",
                              formData.style === s ? "bg-amber-500 border-amber-500 text-black font-bold" : "border-white/5 text-zinc-500 hover:border-white/20"
                            )}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-[0.2em] font-black text-amber-500">Descripción de la idea</label>
                      <textarea
                        required rows={3}
                        className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl focus:border-amber-500 text-white outline-none transition-all placeholder:text-zinc-600 resize-none font-medium"
                        placeholder="Contamos un poco sobre lo que tienes en mente..."
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>

                    <button
                      disabled={isSubmitting || !formData.style}
                      className="w-full bg-amber-500 text-black py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-30"
                    >
                      {isSubmitting ? 'Procesando...' : <><Send size={18} /> Guardar y continuar</>}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center bg-zinc-900 border border-white/5 p-12 rounded-[3.5rem] space-y-8 backdrop-blur-2xl">
                  <div className="w-24 h-24 bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center mx-auto scale-110">
                    <CheckCircle size={48} />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-4xl font-black tracking-tighter uppercase">¡DATOS RECIBIDOS!</h2>
                    <p className="text-zinc-500 max-w-sm mx-auto leading-relaxed">
                      Tu información ya está en nuestro sistema. Ahora, haz clic abajo para finalizar la reserva por WhatsApp conmigo.
                    </p>
                  </div>
                  <button
                    onClick={openWhatsApp}
                    className="w-full bg-[#25D366] text-white py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-[#20ba5a] transition-all flex items-center justify-center gap-3 shadow-2xl shadow-green-900/20"
                  >
                    <MessageSquare size={18} /> Hablar con el artista
                  </button>
                  <button
                    onClick={() => { setSuccess(false); setSection('home') }}
                    className="text-xs uppercase tracking-widest text-zinc-600 hover:text-white transition-colors"
                  >
                    Volver al inicio
                  </button>
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Floating WhatsApp (Always visible) */}
      <button
        onClick={openWhatsApp}
        className="fixed bottom-10 right-10 w-20 h-20 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-95 transition-all z-40 group"
      >
        <span className="absolute right-full mr-4 bg-zinc-900 text-white px-4 py-2 rounded-xl text-xs uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/5">¿Tienes dudas?</span>
        <MessageSquare size={32} />
      </button>

      {/* Admin Panel (Modal) */}
      <AnimatePresence>
        {showAdmin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/90 backdrop-blur-xl p-6 md:p-20 overflow-y-auto"
          >
            <div className="max-w-4xl mx-auto pb-20">
              <div className="flex justify-between items-center mb-16">
                <div>
                  <h2 className="text-5xl font-black uppercase tracking-tighter">LEADS <span className="text-amber-500">RECOGIDOS</span></h2>
                  <p className="text-zinc-600 mt-2">Gestiona las personas que han contactado por la web.</p>
                </div>
                <button
                  onClick={() => setShowAdmin(false)}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                >
                  <X />
                </button>
              </div>

              {!adminAuth ? (
                <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mb-8">
                    <ShieldCheck size={40} />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-10">Ingresa el PIN de Acceso</h3>
                  
                  <div className="flex gap-4 mb-12">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className={cn(
                        "w-4 h-4 rounded-full border-2 border-zinc-700 transition-all duration-300",
                        pin.length > i ? "bg-amber-500 border-amber-500 scale-125 shadow-[0_0_15px_rgba(245,158,11,0.5)]" : ""
                      )} />
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, 'X'].map((val) => (
                      <button
                        key={val}
                        onClick={() => {
                          if (val === 'C') setPin('');
                          else if (val === 'X') setShowAdmin(false);
                          else handlePinInput(val.toString());
                        }}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-xl font-bold hover:bg-amber-500 hover:text-black transition-all active:scale-90"
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  <p className="mt-8 text-[10px] text-zinc-600 uppercase tracking-widest font-bold">Sólo personal autorizado de Inkora</p>
                </div>
              ) : leads.length === 0 ? (
                <div className="text-center py-20 border border-white/5 rounded-[3rem] text-zinc-700 uppercase tracking-[0.3em] font-bold">Sin registros aún</div>
              ) : (
                <div className="grid gap-6">
                  {leads.map((l: any) => (
                    <div key={l.id} className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold">{l.name.charAt(0)}</div>
                          <div>
                            <h4 className="font-bold text-xl">{l.name}</h4>
                            <p className="text-xs text-zinc-600 uppercase tracking-widest">{new Date(l.createdAt).toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-4 text-xs font-medium text-zinc-500">
                          <span className="flex items-center gap-1"><Instagram size={12} /> {l.email}</span>
                          <span className="flex items-center gap-1 font-bold text-amber-500/70"><MessageSquare size={12} /> {l.phone}</span>
                          <span className="flex items-center gap-1"><Calendar size={12} /> {l.style}</span>
                        </div>
                        <p className="text-sm text-zinc-400 italic">"{l.description}"</p>
                      </div>
                      <button
                        onClick={() => { deleteLead(l.id); setLeads(getLeads()); }}
                        className="p-4 rounded-2xl bg-zinc-800 text-zinc-600 hover:bg-amber-500 hover:text-black transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="px-6 py-20 border-t border-white/5 text-center space-y-4">
        <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-700">
          &copy; {new Date().getFullYear()} Inkora Tattoo Studio | All Rights Reserved
        </p>
        <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">
          Desarrollado por <a href="https://artechlabs.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-white transition-colors">ARTECH LABS</a>
        </p>
      </footer>

    </div>
  );
}
