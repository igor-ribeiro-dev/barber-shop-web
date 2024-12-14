import React from 'react';
import { DayPicker } from 'react-day-picker';
import { ptBR } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';

interface CalendarProps {
  selected?: Date;
  onSelect: (date: Date) => void;
  disabledDays?: Date[] | ((date: Date) => boolean);
}

export function Calendar({ selected, onSelect, disabledDays }: CalendarProps) {
  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={(date) => date && onSelect(date)}
      disabled={disabledDays}
      locale={ptBR}
      modifiers={{
        disabled: disabledDays,
      }}
      modifiersStyles={{
        disabled: { textDecoration: 'line-through' },
      }}
      styles={{
        caption: { color: 'rgb(17 24 39)' },
        head_cell: { color: 'rgb(17 24 39)' },
      }}
      className="p-3 bg-white rounded-lg shadow-md"
    />
  );
}