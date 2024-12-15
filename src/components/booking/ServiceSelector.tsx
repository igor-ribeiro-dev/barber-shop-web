import React from 'react';
import { Service } from '../../types';
import { Card } from '../ui/Card';

interface ServiceSelectorProps {
  services: Service[];
  selectedService?: Service;
  onSelectService: (service: Service) => void;
  professionalServices?: string[];
}

export function ServiceSelector({ 
  services, 
  selectedService, 
  onSelectService,
  professionalServices 
}: ServiceSelectorProps) {
  const availableServices = professionalServices
    ? services.filter(service => professionalServices.includes(service.id))
    : services;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Selecione o Serviço</h3>
      <div className="space-y-4">
        {availableServices.map((service) => (
          <div
            key={service.id}
            className={`p-4 rounded-lg cursor-pointer transition-colors ${
              selectedService?.id === service.id
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => onSelectService(service)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">{service.name}</h4>
                <p className={`text-sm ${
                  selectedService?.id === service.id ? 'text-gray-200' : 'text-gray-600'
                }`}>
                  {service.duration} minutos
                </p>
              </div>
              <span className="font-semibold">R$ {service.price}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}