import React from 'react';
import { Service, Professional } from '../../types';
import { Card } from '../ui/Card';

interface BookingDetailsProps {
  service: Service;
  professional: Professional;
}

export function BookingDetails({ service, professional }: BookingDetailsProps) {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Detalhes do Agendamento</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Serviço</p>
          <p className="font-medium">{service.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Profissional</p>
          <p className="font-medium">{professional.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Duração</p>
          <p className="font-medium">{service.duration} minutos</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Valor</p>
          <p className="font-medium">R$ {service.price}</p>
        </div>
      </div>
    </Card>
  );
}