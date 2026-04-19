import { MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <img src="/assets/logo.png" alt="INKORA" className="h-10" />
            <span className="text-2xl font-bold tracking-tighter">INKORA</span>
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            Diseña tu piel... Reserva tu historia. Especialistas en arte corporal de alta calidad y diseños personalizados.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.607.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.365-.333 2.632-1.308 3.607-.975.975-2.242 1.246-3.607 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.365-.063-2.632-.333-3.607-1.308-.975-.975-1.246-2.242-1.308-3.607-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.365.332-2.632 1.308-3.607.975-.975 2.242-1.245 3.607-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.28-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Explorar</h4>
          <ul className="space-y-4 text-muted-foreground text-sm">
            <li><Link to="/" className="hover:text-primary transition-colors">Inicio</Link></li>
            <li><Link to="/portfolio" className="hover:text-primary transition-colors">Portafolio</Link></li>
            <li><Link to="/booking" className="hover:text-primary transition-colors">Reservar Cita</Link></li>
            <li><Link to="/admin" className="opacity-30 hover:opacity-100 hover:text-primary transition-all">Gestión (DB)</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Contacto</h4>
          <ul className="space-y-4 text-muted-foreground text-sm">
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-primary" />
              Calle del Diseño 123, Madrid
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-primary" />
              +34 600 000 000
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-primary" />
              hola@inkora.com
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Horario</h4>
          <div className="space-y-2 text-muted-foreground text-sm">
            <div className="flex justify-between">
              <span>Lunes - Viernes:</span>
              <span>10:00 - 20:00</span>
            </div>
            <div className="flex justify-between">
              <span>Sábado:</span>
              <span>11:00 - 18:00</span>
            </div>
            <div className="flex justify-between text-primary font-bold">
              <span>Domingo:</span>
              <span>Cerrado</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 pt-10 border-t border-white/5 text-center text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} INKORA Tattoo Studio. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
