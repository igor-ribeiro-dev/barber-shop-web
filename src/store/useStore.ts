import { create } from 'zustand';
import { AppointmentSlice, createAppointmentSlice } from './slices/appointmentSlice';
import { ProfessionalSlice, createProfessionalSlice } from './slices/professionalSlice';
import { ServiceSlice, createServiceSlice } from './slices/serviceSlice';
import { AuthSlice, createAuthSlice } from './slices/authSlice';

type StoreState = AppointmentSlice & ProfessionalSlice & ServiceSlice & AuthSlice;

export const useStore = create<StoreState>()((...args) => ({
  ...createAppointmentSlice(...args),
  ...createProfessionalSlice(...args),
  ...createServiceSlice(...args),
  ...createAuthSlice(...args),
}));