import React from 'react';
import { useStore } from '../store/useStore';
import { AppointmentList } from '../components/appointments/AppointmentList';
import { Card } from '../components/ui/Card';

export function Appointments() {
  const { user, appointments, loadAppointments } = useStore();

  React.useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const userAppointments = appointments.filter(apt => apt.customerId === user?.id);
  
  const currentAppointments = userAppointments.filter(apt => apt.status === 'scheduled');
  const pastAppointments = userAppointments.filter(apt => apt.status !== 'scheduled');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold">Meus Agendamentos</h2>

        <div>
          <h3 className="text-xl font-semibold mb-4">Agendamentos Atuais</h3>
          <AppointmentList appointments={currentAppointments} />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Histórico</h3>
          <AppointmentList 
            appointments={pastAppointments} 
            showCancelButton={false}
          />
        </div>
      </div>
    </div>
  );
}