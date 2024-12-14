import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ProfessionalCard } from '../components/ProfessionalCard';
import { useStore } from '../store/useStore';
import { Professional, Service } from '../types';
import { Card } from '../components/ui/Card';

export function Professionals() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedServiceId, setSelectedServiceId] = React.useState<string | null>(
    searchParams.get('serviceId')
  );
  
  const professionals = useStore((state) => state.professionals);
  const services = useStore((state) => state.services);

  const filteredProfessionals = selectedServiceId
    ? professionals.filter((prof) => prof.services.includes(selectedServiceId))
    : professionals;

  const selectedService = selectedServiceId
    ? services.find((service) => service.id === selectedServiceId)
    : null;

  const handleSelectProfessional = (professional: Professional) => {
    if (!selectedServiceId) {
      return;
    }
    navigate(`/booking?serviceId=${selectedServiceId}&professionalId=${professional.id}`);
  };

  const handleServiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newServiceId = event.target.value;
    setSelectedServiceId(newServiceId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto mb-8">
        <h2 className="text-3xl font-bold mb-6">Nossos Profissionais</h2>
        
        <Card className="p-6">
          <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
            Selecione o serviço desejado
          </label>
          <select
            id="service"
            value={selectedServiceId || ''}
            onChange={handleServiceChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 p-2"
          >
            <option value="">Selecione um serviço</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} - R$ {service.price}
              </option>
            ))}
          </select>
        </Card>
      </div>

      {!selectedServiceId && (
        <p className="text-center text-gray-600 mb-8">
          Por favor, selecione um serviço para ver os profissionais disponíveis.
        </p>
      )}

      {selectedServiceId && (
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

      {selectedServiceId && filteredProfessionals.length === 0 && (
        <p className="text-center text-gray-600">
          Nenhum profissional disponível para o serviço selecionado.
        </p>
      )}
    </div>
  );
}