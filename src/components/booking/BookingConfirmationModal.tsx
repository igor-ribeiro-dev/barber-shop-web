import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { X } from 'lucide-react';
import { Service, Professional } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  service: Service;
  professional: Professional;
  date: Date;
  isLoading?: boolean;
}

export function BookingConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  service,
  professional,
  date,
  isLoading
}: BookingConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Confirmar Agendamento</h3>

          <div className="space-y-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Serviço</p>
              <p className="font-medium">{service.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Profissional</p>
              <p className="font-medium">{professional.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Data e Horário</p>
              <p className="font-medium">
                {format(date, "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Valor</p>
              <p className="font-medium">R$ {service.price}</p>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? 'Confirmando...' : 'Confirmar'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}