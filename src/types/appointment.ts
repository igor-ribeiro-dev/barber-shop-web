export interface Appointment {
  id: string;
  customerId: string;
  professionalId: string;
  serviceId: string;
  date: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  price: number;
}