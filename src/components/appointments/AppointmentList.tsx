import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, Clock, DollarSign } from 'lucide-react';
import { Appointment } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useStore } from '../../store/useStore';

interface AppointmentListProps {
  appointments: Appointment[];
  showCancelButton?: boolean;
}

export function AppointmentList({ appointments, showCancelButton = true }: AppointmentListProps) {
  const { services, professionals, cancelAppointment } = useStore();

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled':
        return 'text-blue-600 bg-blue-100';
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
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
      default:
        return status;
    }
  };

  if (appointments.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-gray-500">Nenhum agendamento encontrado.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => {
        const service = services.find((s) => s.id === appointment.serviceId);
        const professional = professionals.find((p) => p.id === appointment.professionalId);

        if (!service || !professional) return null;

        return (
          <Card key={appointment.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{service.name}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                {getStatusText(appointment.status)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{format(new Date(appointment.date), "dd 'de' MMMM", { locale: ptBR })}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                <span>{format(new Date(appointment.date), 'HH:mm')}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <DollarSign className="w-4 h-4 mr-2" />
                <span>R$ {appointment.price}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-600">Profissional:</p>
              <p className="font-medium">{professional.name}</p>
            </div>

            {showCancelButton && appointment.status === 'scheduled' && (
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => cancelAppointment(appointment.id)}
              >
                Cancelar Agendamento
              </Button>
            )}
          </Card>
        );
      })}
    </div>
  );
}