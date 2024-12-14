import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookingDetails } from '../components/booking/BookingDetails';
import { BookingCalendar } from '../components/booking/BookingCalendar';
import { BookingConfirmationModal } from '../components/BookingConfirmationModal';
import { Button } from '../components/ui/Button';
import { useStore } from '../store/useStore';
import { useBooking } from '../hooks/useBooking';

export function Booking() {
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get('serviceId');
  const professionalId = searchParams.get('professionalId');

  const { services, professionals } = useStore();

  const service = services.find((s) => s.id === serviceId);
  const professional = professionals.find((p) => p.id === professionalId);

  if (!service || !professional) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Serviço ou profissional não encontrado.</p>
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
  } = useBooking(service, professional);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Agendar Horário</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <BookingDetails service={service} professional={professional} />
          </div>

          <div className="space-y-6">
            <BookingCalendar
              professional={professional}
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              availableSlots={availableSlots}
              onSelectDate={(date) => {
                setSelectedDate(date);
                setSelectedSlot(undefined);
              }}
              onSelectSlot={setSelectedSlot}
            />

            {selectedSlot && (
              <Button
                variant="primary"
                className="w-full"
                onClick={() => setIsModalOpen(true)}
              >
                Confirmar Agendamento
              </Button>
            )}
          </div>
        </div>

        <BookingConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmBooking}
          service={service}
          professional={professional}
          date={selectedSlot!}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}