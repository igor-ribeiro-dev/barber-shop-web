import React from 'react';
import { Clock, DollarSign } from 'lucide-react';
import { Service } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface ServiceCardProps {
  service: Service;
  onSelect: (service: Service) => void;
}

export function ServiceCard({ service, onSelect }: ServiceCardProps) {
  return (
    <Card className="overflow-hidden">
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
        <p className="text-gray-600 mb-4">{service.description}</p>
        
        <div className="flex items-center justify-between text-gray-700 mb-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{service.duration} min</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 mr-1" />
            <span>R$ {service.price}</span>
          </div>
        </div>
        
        <Button
          variant="primary"
          className="w-full"
          onClick={() => onSelect(service)}
        >
          Agendar
        </Button>
      </div>
    </Card>
  );
}