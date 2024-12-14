import { Appointment } from '../../types';
import { StorageAdapter } from '../storage/StorageAdapter';

const APPOINTMENTS_KEY = '@barbershop:appointments';

export class AppointmentService {
  constructor(private storage: StorageAdapter) {}

  async getAppointments(): Promise<Appointment[]> {
    const appointments = await this.storage.getItem<Appointment[]>(APPOINTMENTS_KEY);
    return appointments || [];
  }

  async saveAppointment(appointment: Appointment): Promise<void> {
    const appointments = await this.getAppointments();
    appointments.push(appointment);
    await this.storage.setItem(APPOINTMENTS_KEY, appointments);
  }

  async updateAppointment(appointmentId: string, status: Appointment['status']): Promise<void> {
    const appointments = await this.getAppointments();
    const updatedAppointments = appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status } : apt
    );
    await this.storage.setItem(APPOINTMENTS_KEY, updatedAppointments);
  }

  async cancelAppointment(appointmentId: string): Promise<void> {
    await this.updateAppointment(appointmentId, 'cancelled');
  }
}