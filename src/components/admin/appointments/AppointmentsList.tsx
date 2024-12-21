import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Appointment, Professional, Service } from '../../../types';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { useStore } from '../../../store/useStore';

interface AppointmentsListProps {
  appointments: Appointment[];
  professionals: Professional[];
  services: Service[];
}

export function AppointmentsList({ appointments, professionals, services }: AppointmentsListProps) {
  const { completeAppointment, cancelAppointment } = useStore();

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
    }
  };

  const getStatusText = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled':
        return 'Agendado';
      case 'completed':
        return 'Concluído';
      case 'cancelled':
        return 'Cancelado';
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium text-gray-900">Agendamentos do Dia</h3>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {appointments.map((appointment) => {
            const professional = professionals.find(p => p.id === appointment.professionalId);
            const service = services.find(s => s.id === appointment.serviceId);

            return (
              <li key={appointment.id} className="px-4 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {format(new Date(appointment.date), 'HH:mm')}
                    </p>
                    <p className="text-sm text-gray-500">{service?.name}</p>
                    <p className="text-sm text-gray-500">
                      Profissional: {professional?.name}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {getStatusText(appointment.status)}
                    </span>
                    {appointment.status === 'scheduled' && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => completeAppointment(appointment.id)}
                        >
                          Concluir
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => cancelAppointment(appointment.id)}
                        >
                          Cancelar
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Card>
  );
}