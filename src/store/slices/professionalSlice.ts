import { StateCreator } from 'zustand';
import { Professional } from '../../types';

export interface ProfessionalSlice {
  professionals: Professional[];
  setProfessionals: (professionals: Professional[]) => void;
  getProfessionalsByService: (serviceId: string) => Professional[];
}

export const createProfessionalSlice: StateCreator<ProfessionalSlice> = (set, get) => ({
  professionals: [
    {
      id: '1',
      name: 'João Silva',
      avatar: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=400',
      specialties: ['Corte Masculino', 'Barba'],
      services: ['1', '2', '3'],
      bio: 'Especialista em cortes modernos e barbas estilizadas',
      rating: 4.8,
      availability: {
        start: '09:00',
        end: '18:00',
        daysOff: [0], // Sunday
      },
    },
    {
      id: '2',
      name: 'Maria Santos',
      avatar: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=400',
      specialties: ['Química', 'Coloração'],
      services: ['1', '4'],
      bio: 'Especialista em coloração e tratamentos capilares',
      rating: 4.9,
      availability: {
        start: '10:00',
        end: '19:00',
        daysOff: [0], // Sunday
      },
    },
  ],
  setProfessionals: (professionals) => set({ professionals }),
  getProfessionalsByService: (serviceId) =>
    get().professionals.filter((prof) => prof.services.includes(serviceId)),
});