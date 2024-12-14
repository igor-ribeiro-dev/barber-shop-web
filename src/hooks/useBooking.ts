import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Service, Professional } from '../types';
import { useStore } from '../store/useStore';
import { generateTimeSlots } from '../utils/date';

export function useBooking(service: Service, professional: Professional) {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedSlot, setSelectedSlot] = useState<Date>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { appointments, addAppointment, user } = useStore();

  const timeSlots = selectedDate
    ? generateTimeSlots(selectedDate, professional, service)
    : [];

  const bookedSlots = appointments
    .filter(
      (apt) =>
        apt.professionalId === professional.id &&
        apt.date.getDate() === selectedDate?.getDate() &&
        apt.date.getMonth() === selectedDate?.getMonth() &&
        apt.date.getFullYear() === selectedDate?.getFullYear()
    )
    .map((apt) => apt.date.getTime());

  const availableSlots = timeSlots.filter(
    (slot) => !bookedSlots.includes(slot.getTime())
  );

  const handleConfirmBooking = async () => {
    if (!selectedSlot || !user) return;

    setIsLoading(true);
    try {
      const newAppointment = {
        id: Math.random().toString(36).substr(2, 9),
        customerId: user.id,
        professionalId: professional.id,
        serviceId: service.id,
        date: selectedSlot,
        status: 'scheduled' as const,
        price: service.price,
      };

      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      addAppointment(newAppointment);
      toast.success('Agendamento realizado com sucesso!');
      navigate('/appointments');
    } catch (error) {
      toast.error('Erro ao realizar agendamento. Tente novamente.');
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  return {
    selectedDate,
    setSelectedDate,
    selectedSlot,
    setSelectedSlot,
    isModalOpen,
    setIsModalOpen,
    isLoading,
    availableSlots,
    handleConfirmBooking,
  };
}