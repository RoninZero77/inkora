import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const portfolioItems = [
  { id: 1, title: 'Retrato Realista', category: 'realism', image: 'https://images.unsplash.com/photo-1621503717082-2070495f269c?q=80&w=2574&auto=format&fit=crop', artist: 'Alex Ink' },
  { id: 2, title: 'Blackwork Skull', category: 'blackwork', image: 'https://images.unsplash.com/photo-1590210315971-da03763481af?q=80&w=2670&auto=format&fit=crop', artist: 'Maria Dark' },
  { id: 3, title: 'Flores Minimalistas', category: 'fine-line', image: 'https://images.unsplash.com/photo-1560707303-4e980ce876ad?q=80&w=2574&auto=format&fit=crop', artist: 'Alex Ink' },
  { id: 4, title: 'Arquitectura', category: 'blackwork', image: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=2671&auto=format&fit=crop', artist: 'Maria Dark' },
  { id: 5, title: 'Ojo Detallado', category: 'realism', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop', artist: 'Alex Ink' },
  { id: 6, title: 'Línea Continua', category: 'fine-line', image: 'https://images.unsplash.com/photo-1550537687-c91072c4792d?q=80&w=2574&auto=format&fit=crop', artist: 'Maria Dark' },
];

const Portfolio = () => {
  const [filter, setFilter] = useState('all');

  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'realism', name: 'Realismo' },
    { id: 'blackwork', name: 'Blackwork' },
    { id: 'fine-line', name: 'Fine Line' },
  ];

  return (
    <div className="pt-32 pb-20 container mx-auto px-6">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black mb-4">NUESTRO <span className="text-gradient">PORTAFOLIO</span></h1>
        <p className="text-muted-foreground">Una selección de nuestros trabajos más recientes.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-8 py-3 rounded-full font-bold transition-all border ${
              filter === cat.id 
                ? 'bg-primary border-primary text-white scale-105 shadow-xl shadow-primary/30' 
                : 'bg-white/5 border-white/10 text-foreground/60 hover:text-white hover:border-white/30'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group relative aspect-square rounded-3xl overflow-hidden glass"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <span className="text-primary font-bold text-xs uppercase tracking-widest mb-2">{item.category}</span>
                <h3 className="text-2xl font-bold text-white mb-1">{item.title}</h3>
                <p className="text-white/60 text-sm">por {item.artist}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Portfolio;
