import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiceCard } from '../components/ServiceCard';
import { useStore } from '../store/useStore';
import { Service } from '../types';

export function Services() {
  const navigate = useNavigate();
  const services = useStore((state) => state.services);
  const [selectedCategory, setSelectedCategory] = React.useState<Service['category'] | 'all'>('all');

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'hair', label: 'Cabelo' },
    { id: 'beard', label: 'Barba' },
    { id: 'combo', label: 'Combos' },
    { id: 'treatment', label: 'Tratamentos' },
  ];

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter((service) => service.category === selectedCategory);

  const handleSelectService = (service: Service) => {
    navigate(`/professionals?serviceId=${service.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Nossos Serviços</h2>
      
      <div className="flex overflow-x-auto space-x-4 mb-8 pb-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id as Service['category'] | 'all')}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onSelect={handleSelectService}
          />
        ))}
      </div>
    </div>
  );
}