import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/80 to-background z-10" />
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=2671&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-50"
          style={{ backgroundAttachment: 'fixed' }}
        />
        
        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4">
              DISEÑA TU <span className="text-gradient">PIEL</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light max-w-2xl mx-auto">
              Reserva tu historia... El arte que te acompaña para siempre. Inmortaliza tus ideas en INKORA.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                to="/booking"
                className="bg-primary text-white px-10 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-2xl shadow-primary/40"
              >
                <Calendar size={20} />
                Reservar Ahora
              </Link>
              <Link
                to="/portfolio"
                className="bg-white/10 backdrop-blur-md px-10 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
              >
                Ver Portafolio
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-px h-20 bg-linear-to-b from-primary to-transparent" />
        </div>
      </section>

      {/* Featured Styles */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Especialidades</h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Realismo', img: 'https://images.unsplash.com/photo-1621503717082-2070495f269c?q=80&w=2574&auto=format&fit=crop' },
            { title: 'Blackwork', img: 'https://images.unsplash.com/photo-1590210315971-da03763481af?q=80&w=2670&auto=format&fit=crop' },
            { title: 'Minimalista', img: 'https://images.unsplash.com/photo-1560707303-4e980ce876ad?q=80&w=2574&auto=format&fit=crop' }
          ].map((style, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
            >
              <img src={style.img} alt={style.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-bold text-white">{style.title}</h3>
                <p className="text-white/60 text-sm">Explorar estilo</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Social CTA */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Síguenos en Instagram</h2>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-primary font-bold text-xl hover:underline"
          >
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.607.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.365-.333 2.632-1.308 3.607-.975.975-2.242 1.246-3.607 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.365-.063-2.632-.333-3.607-1.308-.975-.975-1.246-2.242-1.308-3.607-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.365.332-2.632 1.308-3.607.975-.975 2.242-1.245 3.607-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            @inkora_studio
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
