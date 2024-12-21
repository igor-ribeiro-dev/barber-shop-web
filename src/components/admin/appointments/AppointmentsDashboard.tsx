import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar } from '../../Calendar';
import { useStore } from '../../../store/useStore';
import { AppointmentsList } from './AppointmentsList';
import { AppointmentsStats } from './AppointmentsStats';

export function AppointmentsDashboard() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const { appointments, professionals, services } = useStore();

  const dailyAppointments = appointments.filter(
    (apt) => format(apt.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <AppointmentsStats appointments={appointments} />
        <AppointmentsList
          appointments={dailyAppointments}
          professionals={professionals}
          services={services}
        />
      </div>

      <div>
        <Calendar
          selected={selectedDate}
          onSelect={(date) => setSelectedDate(date)}
        />
      </div>
    </div>
  );
}