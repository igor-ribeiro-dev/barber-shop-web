import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Professional } from '../../types';
import { Calendar } from '../Calendar';
import { TimeSlots } from '../TimeSlots';
import { Card } from '../ui/Card';

interface BookingCalendarProps {
  professional: Professional;
  selectedDate?: Date;
  selectedSlot?: Date;
  availableSlots: Date[];
  onSelectDate: (date: Date) => void;
  onSelectSlot: (slot: Date) => void;
}

export function BookingCalendar({
  professional,
  selectedDate,
  selectedSlot,
  availableSlots,
  onSelectDate,
  onSelectSlot,
}: BookingCalendarProps) {
  return (
    <div className="space-y-6">
      <Calendar
        selected={selectedDate}
        onSelect={(date) => {
          onSelectDate(date);
        }}
        disabledDays={(date) => professional.availability.daysOff.includes(date.getDay())}
      />

      {selectedDate && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Horários disponíveis para {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
          </h3>
          <TimeSlots
            slots={availableSlots}
            selectedSlot={selectedSlot}
            onSelectSlot={onSelectSlot}
          />
        </Card>
      )}
    </div>
  );
}