import { StateCreator } from 'zustand';
import { Service } from '../../types';

export interface ServiceSlice {
  services: Service[];
  setServices: (services: Service[]) => void;
  getServicesByCategory: (category: Service['category']) => Service[];
}

export const createServiceSlice: StateCreator<ServiceSlice> = (set, get) => ({
  services: [
    {
      id: '1',
      name: 'Corte de Cabelo',
      description: 'Corte masculino tradicional ou moderno',
      duration: 30,
      price: 35,
      category: 'hair',
      image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400',
    },
    {
      id: '2',
      name: 'Barba',
      description: 'Barba tradicional com toalha quente',
      duration: 30,
      price: 25,
      category: 'beard',
      image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400',
    },
    {
      id: '3',
      name: 'Corte + Barba',
      description: 'Combo corte e barba com produtos premium',
      duration: 60,
      price: 55,
      category: 'combo',
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400',
    },
    {
      id: '4',
      name: 'Tratamento Capilar',
      description: 'Hidratação profunda e tratamento personalizado',
      duration: 45,
      price: 70,
      category: 'treatment',
      image: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=400',
    },
  ],
  setServices: (services) => set({ services }),
  getServicesByCategory: (category) =>
    get().services.filter((service) => service.category === category),
});