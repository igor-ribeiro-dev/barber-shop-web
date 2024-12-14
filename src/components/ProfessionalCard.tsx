import React from 'react';
import { Star } from 'lucide-react';
import { Professional } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface ProfessionalCardProps {
  professional: Professional;
  onSelect: (professional: Professional) => void;
}

export function ProfessionalCard({ professional, onSelect }: ProfessionalCardProps) {
  return (
    <Card className="p-6">
      <div className="relative mb-4">
        <img
          src={professional.avatar}
          alt={professional.name}
          className="w-32 h-32 rounded-full mx-auto object-cover"
        />
        <div className="absolute bottom-0 right-1/3 bg-white rounded-full px-2 py-1 flex items-center shadow-md">
          <Star className="w-4 h-4 text-yellow-400 mr-1" />
          <span className="text-sm font-medium">{professional.rating}</span>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-center mb-2">{professional.name}</h3>
      <p className="text-gray-600 text-center mb-4">{professional.bio}</p>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Especialidades:</h4>
        <div className="flex flex-wrap gap-2">
          {professional.specialties.map((specialty) => (
            <span
              key={specialty}
              className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>
      
      <Button
        variant="primary"
        className="w-full"
        onClick={() => onSelect(professional)}
      >
        Selecionar
      </Button>
    </Card>
  );
}