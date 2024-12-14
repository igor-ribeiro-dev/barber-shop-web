import React from 'react';
import { formatTime } from '../utils/date';
import { Button } from './ui/Button';

interface TimeSlotsProps {
  slots: Date[];
  selectedSlot?: Date;
  onSelectSlot: (slot: Date) => void;
}

export function TimeSlots({ slots, selectedSlot, onSelectSlot }: TimeSlotsProps) {
  if (slots.length === 0) {
    return (
      <p className="text-gray-500 text-center py-4">
        Não há horários disponíveis nesta data.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {slots.map((slot) => (
        <Button
          key={slot.toISOString()}
          variant={selectedSlot?.getTime() === slot.getTime() ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onSelectSlot(slot)}
        >
          {formatTime(slot)}
        </Button>
      ))}
    </div>
  );
}