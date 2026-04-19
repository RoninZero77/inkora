export interface Tattoo {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  artistId: string;
  categoryId: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Artist {
  id: string;
  name: string;
  bio: string;
  profileImage: string;
  specialty: string;
}

export interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  tattooType: string;
  size: string;
  description: string;
  preferredDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface CreateAppointmentDto {
  name: string;
  email: string;
  phone: string;
  tattooType: string;
  size: string;
  description: string;
  date: string;
}
