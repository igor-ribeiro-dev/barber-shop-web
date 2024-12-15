import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useBooking } from '../hooks/useBooking';
import { Service } from '../types';
import { BookingHeader } from '../components/booking/BookingHeader';
import { BookingContent } from '../components/booking/BookingContent';
import { BookingConfirmationModal } from '../components/booking/BookingConfirmationModal';

export function Booking() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get('serviceId');
  const professionalId = searchParams.get('professionalId');

  const { services, professionals } = useStore();
  const [selectedService, setSelectedService] = React.useState<Service | undefined>(
    serviceId ? services.find(s => s.id === serviceId) : undefined
  );

  const professional = professionals.find(p => p.id === professionalId);

  if (!professional) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Profissional não encontrado.</p>
      </div>
    );
  }

  if (!selectedService && !professional.services.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">
          Este profissional não possui serviços disponíveis.
        </p>
      </div>
    );
  }

  const {
    selectedDate,
    setSelectedDate,
    selectedSlot,
    setSelectedSlot,
    isModalOpen,
    setIsModalOpen,
    isLoading,
    availableSlots,
    handleConfirmBooking,
  } = useBooking(selectedService!, professional);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <BookingHeader selectedService={selectedService} />
        
        <BookingContent
          services={services}
          selectedService={selectedService}
          onSelectService={setSelectedService}
          professional={professional}
          selectedDate={selectedDate}
          selectedSlot={selectedSlot}
          availableSlots={availableSlots}
          onSelectDate={setSelectedDate}
          onSelectSlot={setSelectedSlot}
          onConfirm={() => setIsModalOpen(true)}
        />

        {selectedService && selectedSlot && (
          <BookingConfirmationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirmBooking}
            service={selectedService}
            professional={professional}
            date={selectedSlot}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}