import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ProfessionalCard } from '../components/professional/ProfessionalCard';
import { useStore } from '../store/useStore';
import { Professional } from '../types';
import { Card } from '../components/ui/Card';

export function Professionals() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get('serviceId');
  
  const { professionals, services } = useStore();

  const filteredProfessionals = serviceId
    ? professionals.filter((prof) => prof.services.includes(serviceId))
    : professionals;

  const selectedService = serviceId
    ? services.find((service) => service.id === serviceId)
    : null;

  const handleSelectProfessional = (professional: Professional) => {
    if (serviceId) {
      navigate(`/booking?serviceId=${serviceId}&professionalId=${professional.id}`);
    } else {
      navigate(`/booking?professionalId=${professional.id}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Nossos Profissionais</h2>
        
        {selectedService && (
          <Card className="p-6 mb-8">
            <p className="text-lg">
              Profissionais disponíveis para{' '}
              <span className="font-semibold">{selectedService.name}</span>
            </p>
          </Card>
        )}

        {filteredProfessionals.length === 0 ? (
          <Card className="p-6">
            <p className="text-center text-gray-600">
              Nenhum profissional disponível{selectedService ? ' para este serviço' : ''}.
            </p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.map((professional) => (
              <ProfessionalCard
                key={professional.id}
                professional={professional}
                onSelect={handleSelectProfessional}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}