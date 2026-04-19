import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, Ruler, FileText, Trash2 } from 'lucide-react';

interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  tattooType: string;
  size: string;
  description: string;
  preferredDate: string;
  createdAt: string;
}

const Admin = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/appointments');
      setAppointments(response.data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('No se pudo conectar con el servidor de base de datos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const deleteAppointment = async (id: string) => {
    if (!window.confirm('¿Estás seguro de eliminar este registro?')) return;
    try {
      await axios.delete(`http://localhost:3000/appointments/${id}`);
      setAppointments(appointments.filter(a => a.id !== id));
    } catch (err) {
      alert('Error al eliminar');
    }
  };

  return (
    <div className="pt-32 pb-20 container mx-auto px-6">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">Panel de <span className="text-gradient">Gestión</span></h1>
          <p className="text-muted-foreground mt-2">Aquí puedes ver los datos guardados en la base de datos.</p>
        </div>
        <button 
          onClick={fetchAppointments}
          className="bg-white/5 border border-white/10 px-6 py-2 rounded-full hover:bg-white/10 transition-colors"
        >
          Refrescar
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary" />
        </div>
      ) : error ? (
        <div className="glass p-12 text-center rounded-3xl">
          <p className="text-primary mb-4">{error}</p>
          <p className="text-sm opacity-50">Asegúrate de que el servidor (NestJS) esté corriendo.</p>
        </div>
      ) : appointments.length === 0 ? (
        <div className="glass p-12 text-center rounded-3xl">
          <p className="opacity-50 text-xl">Aún no hay citas registradas en la base de datos.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appt) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={appt.id}
              className="glass p-6 rounded-3xl group relative hover:border-primary/30 transition-colors"
            >
              <button 
                onClick={() => deleteAppointment(appt.id)}
                className="absolute top-4 right-4 p-2 text-white/20 hover:text-primary transition-colors"
              >
                <Trash2 size={18} />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <User size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold leading-none">{appt.clientName}</h3>
                    <p className="text-xs opacity-50 mt-1">{new Date(appt.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 opacity-70">
                    <Mail size={14} className="text-primary" />
                    <span>{appt.clientEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-70">
                    <Phone size={14} className="text-primary" />
                    <span>{appt.clientPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-70">
                    <Calendar size={14} className="text-primary" />
                    <span>{appt.preferredDate}</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-70">
                    <Ruler size={14} className="text-primary" />
                    <span>Estilo: {appt.tattooType} | Tam: {appt.size}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <div className="flex items-start gap-2">
                    <FileText size={14} className="text-primary mt-1 shrink-0" />
                    <p className="text-xs leading-relaxed opacity-60 italic">"{appt.description}"</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
