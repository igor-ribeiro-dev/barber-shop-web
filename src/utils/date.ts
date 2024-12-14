import { addMinutes, format, parse, setHours, setMinutes } from 'date-fns';
import { Professional, Service } from '../types';

export function generateTimeSlots(
  date: Date,
  professional: Professional,
  service: Service
): Date[] {
  const slots: Date[] = [];
  const { start, end } = professional.availability;

  const startTime = parse(start, 'HH:mm', date);
  const endTime = parse(end, 'HH:mm', date);
  
  let currentSlot = startTime;

  while (currentSlot <= endTime) {
    slots.push(currentSlot);
    currentSlot = addMinutes(currentSlot, service.duration);
  }

  return slots;
}

export function formatTime(date: Date): string {
  return format(date, 'HH:mm');
}

export function createDateWithTime(date: Date, timeStr: string): Date {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return setMinutes(setHours(date, hours), minutes);
}