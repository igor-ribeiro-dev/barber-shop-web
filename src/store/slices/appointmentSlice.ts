import { StateCreator } from 'zustand';
import { Appointment } from '../../types';
import { AppointmentService } from '../../services/appointments/AppointmentService';
import { LocalStorageAdapter } from '../../services/storage/StorageAdapter';

const appointmentService = new AppointmentService(new LocalStorageAdapter());

export interface AppointmentSlice {
  appointments: Appointment[];
  isLoading: boolean;
  addAppointment: (appointment: Appointment) => Promise<void>;
  cancelAppointment: (appointmentId: string) => Promise<void>;
  loadAppointments: () => Promise<void>;
  getAppointmentsByCustomer: (customerId: string) => Appointment[];
  getAppointmentsByDate: (date: Date) => Appointment[];
}

export const createAppointmentSlice: StateCreator<AppointmentSlice> = (set, get) => ({
  appointments: [],
  isLoading: false,
  
  addAppointment: async (appointment) => {
    await appointmentService.saveAppointment(appointment);
    set((state) => ({
      appointments: [...state.appointments, appointment],
    }));
  },
    
  cancelAppointment: async (appointmentId) => {
    await appointmentService.cancelAppointment(appointmentId);
    set((state) => ({
      appointments: state.appointments.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: 'cancelled' as const } : apt
      ),
    }));
  },

  loadAppointments: async () => {
    set({ isLoading: true });
    try {
      const appointments = await appointmentService.getAppointments();
      set({ appointments });
    } finally {
      set({ isLoading: false });
    }
  },
    
  getAppointmentsByCustomer: (customerId) =>
    get().appointments.filter((apt) => apt.customerId === customerId),
    
  getAppointmentsByDate: (date) =>
    get().appointments.filter(
      (apt) =>
        apt.date.getFullYear() === date.getFullYear() &&
        apt.date.getMonth() === date.getMonth() &&
        apt.date.getDate() === date.getDate()
    ),
});