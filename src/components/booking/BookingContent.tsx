import React from 'react';
import { Service, Professional } from '../../types';
import { ServiceSelector } from './ServiceSelector';
import { BookingDetails } from './BookingDetails';
import { BookingCalendar } from './BookingCalendar';
import { Button } from '../ui/Button';

interface BookingContentProps {
  services: Service[];
  selectedService?: Service;
  onSelectService: (service: Service) => void;
  professional: Professional;
  selectedDate?: Date;
  selectedSlot?: Date;
  availableSlots: Date[];
  onSelectDate: (date: Date) => void;
  onSelectSlot: (slot: Date) => void;
  onConfirm: () => void;
}

export function BookingContent({
  services,
  selectedService,
  onSelectService,
  professional,
  selectedDate,
  selectedSlot,
  availableSlots,
  onSelectDate,
  onSelectSlot,
  onConfirm,
}: BookingContentProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-6">
        {!selectedService && (
          <ServiceSelector
            services={services}
            selectedService={selectedService}
            onSelectService={onSelectService}
            professionalServices={professional.services}
          />
        )}

        {selectedService && (
          <BookingDetails
            service={selectedService}
            professional={professional}
          />
        )}
      </div>

      {selectedService && (
        <div className="space-y-6">
          <BookingCalendar
            professional={professional}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            availableSlots={availableSlots}
            onSelectDate={(date) => {
              onSelectDate(date);
              onSelectSlot(undefined);
            }}
            onSelectSlot={onSelectSlot}
          />

          {selectedSlot && (
            <Button
              variant="primary"
              className="w-full"
              onClick={onConfirm}
            >
              Confirmar Agendamento
            </Button>
          )}
        </div>
      )}
    </div>
  );
}