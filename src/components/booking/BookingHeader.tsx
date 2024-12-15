import React from 'react';
import { Service } from '../../types';

interface BookingHeaderProps {
  selectedService?: Service;
}

export function BookingHeader({ selectedService }: BookingHeaderProps) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold">Agendar Horário</h2>
      {selectedService && (
        <p className="text-gray-600 mt-2">
          Agendamento para {selectedService.name}
        </p>
      )}
    </div>
  );
}