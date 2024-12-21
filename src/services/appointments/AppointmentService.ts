import { Appointment } from '../../types';
import { StorageAdapter } from '../storage/StorageAdapter';

const APPOINTMENTS_KEY = '@barbershop:appointments';

export class AppointmentService {
  constructor(private storage: StorageAdapter) {}

  private parseAppointment(appointment: any): Appointment {
    return {
      ...appointment,
      date: new Date(appointment.date),
    };
  }

  async getAppointments(): Promise<Appointment[]> {
    const appointments = await this.storage.getItem<any[]>(APPOINTMENTS_KEY);
    return appointments ? appointments.map(this.parseAppointment) : [];
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

  async completeAppointment(appointmentId: string): Promise<void> {
    await this.updateAppointment(appointmentId, 'completed');
  }
}