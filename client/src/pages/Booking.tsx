import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Send, CheckCircle, MessageSquare } from 'lucide-react';
import axios from 'axios';

const bookingSchema = z.object({
  clientName: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  clientEmail: z.string().email('Email inválido'),
  clientPhone: z.string().min(7, 'Teléfono inválido'),
  tattooType: z.string().min(1, 'Selecciona un estilo'),
  size: z.string().min(1, 'Indica el tamaño aproximado'),
  description: z.string().min(10, 'Cuéntanos un poco más sobre tu idea'),
  preferredDate: z.string().min(1, 'Selecciona una fecha deseada'),
});

type BookingForm = z.infer<typeof bookingSchema>;

const Booking = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<BookingForm | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingForm) => {
    try {
      setError(null);
      // Guardamos en la base de datos (Backend NestJS)
      await axios.post('http://localhost:3000/appointments', data);
      
      setFormData(data);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Error saving appointment:', err);
      setError('Hubo un problema al guardar tu cita. Por favor intenta de nuevo.');
    }
  };

  const handleWhatsAppRedirect = () => {
    if (!formData) return;
    
    // NÚMERO DE WHATSAPP DEL ESTUDIO
    const phoneNumber = "573144015703"; 
    
    const text = `¡Hola INKORA! 👋\n\nAcabo de dejar mis datos en la web y quiero concretar mi cita:\n\n` +
                 `👤 *Nombre:* ${formData.clientName}\n` +
                 `📧 *Email:* ${formData.clientEmail}\n` +
                 `📱 *Teléfono:* ${formData.clientPhone}\n` +
                 `🎨 *Estilo:* ${formData.tattooType}\n` +
                 `📏 *Tamaño:* ${formData.size}\n` +
                 `📅 *Fecha deseada:* ${formData.preferredDate}\n` +
                 `📝 *Descripción:* ${formData.description}`;
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
  };

  if (isSubmitted && formData) {
    return (
      <div className="pt-32 pb-20 container mx-auto px-6 text-center">
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="max-w-md mx-auto glass p-12 rounded-3xl"
        >
          <CheckCircle size={80} className="text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">¡Datos Guardados!</h2>
          <p className="text-muted-foreground mb-8">
            Tus datos han sido registrados en nuestra base de datos. Para finalizar la reserva y hablar con el artista, haz clic abajo.
          </p>
          
          <button 
            onClick={handleWhatsAppRedirect}
            className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white p-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all mb-6 shadow-xl shadow-green-500/20"
          >
            <MessageSquare size={20} />
            Hablemos por WhatsApp
          </button>

          <button 
            onClick={() => setIsSubmitted(false)}
            className="text-white/40 text-sm hover:text-white transition-colors"
          >
            Volver al formulario
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black mb-4 uppercase tracking-tighter">
            RESERVA TU <span className="text-gradient">HISTORIA</span>
          </h1>
          <p className="text-muted-foreground">Tu información es vital para nosotros. Completa este formulario y terminamos la reserva por WhatsApp.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-xl text-primary text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="glass p-8 md:p-12 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-6 relative overflow-hidden group">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl opacity-50" />
          
          <div className="space-y-2">
            <label className="text-sm font-medium opacity-70 uppercase tracking-widest text-[10px]">Nombre Completo</label>
            <input
              {...register('clientName')}
              placeholder="Tu nombre"
              className={`w-full bg-white/5 border ${errors.clientName ? 'border-primary' : 'border-white/10'} rounded-xl p-4 focus:outline-none focus:border-primary transition-colors`}
            />
            {errors.clientName && <p className="text-xs text-primary">{errors.clientName.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium opacity-70 uppercase tracking-widest text-[10px]">Correo Electrónico</label>
            <input
              {...register('clientEmail')}
              placeholder="correo@ejemplo.com"
              className={`w-full bg-white/5 border ${errors.clientEmail ? 'border-primary' : 'border-white/10'} rounded-xl p-4 focus:outline-none focus:border-primary transition-colors`}
            />
            {errors.clientEmail && <p className="text-xs text-primary">{errors.clientEmail.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium opacity-70 uppercase tracking-widest text-[10px]">WhatsApp</label>
            <input
              {...register('clientPhone')}
              placeholder="Número de contacto"
              className={`w-full bg-white/5 border ${errors.clientPhone ? 'border-primary' : 'border-white/10'} rounded-xl p-4 focus:outline-none focus:border-primary transition-colors`}
            />
            {errors.clientPhone && <p className="text-xs text-primary">{errors.clientPhone.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium opacity-70 uppercase tracking-widest text-[10px]">Fecha Estimada</label>
            <input
              type="date"
              {...register('preferredDate')}
              className={`w-full bg-white/5 border ${errors.preferredDate ? 'border-primary' : 'border-white/10'} rounded-xl p-4 focus:outline-none focus:border-primary transition-colors`}
            />
            {errors.preferredDate && <p className="text-xs text-primary">{errors.preferredDate.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium opacity-70 uppercase tracking-widest text-[10px]">Estilo</label>
            <select
              {...register('tattooType')}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-primary transition-colors appearance-none"
            >
              <option value="" className="bg-neutral-900">Seleccionar estilo</option>
              <option value="Realismo" className="bg-neutral-900">Realismo</option>
              <option value="Blackwork" className="bg-neutral-900">Blackwork</option>
              <option value="Tradicional" className="bg-neutral-900">Tradicional</option>
              <option value="Minimalista" className="bg-neutral-900">Minimalista</option>
            </select>
            {errors.tattooType && <p className="text-xs text-primary">{errors.tattooType.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium opacity-70 uppercase tracking-widest text-[10px]">Tamaño (cm)</label>
            <input
              {...register('size')}
              placeholder="Ej. 10 cm"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-primary transition-colors"
            />
            {errors.size && <p className="text-xs text-primary">{errors.size.message}</p>}
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-medium opacity-70 uppercase tracking-widest text-[10px]">Cuéntanos tu idea</label>
            <textarea
              {...register('description')}
              rows={3}
              placeholder="Describe tu visión para el tatuaje..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-primary transition-colors resize-none"
            />
            {errors.description && <p className="text-xs text-primary">{errors.description.message}</p>}
          </div>

          <div className="md:col-span-2 pt-4">
            <button
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white p-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all hover:scale-[1.01] disabled:opacity-50 shadow-2xl shadow-primary/20"
            >
              {isSubmitting ? 'Guardando en base de datos...' : (
                <>
                  <Send size={20} />
                  Siguiente paso: WhatsApp
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;
