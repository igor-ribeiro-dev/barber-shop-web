import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Calendar, Clock, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Agende seu horário com estilo
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Os melhores profissionais à sua disposição
          </p>
          <Link to="/services">
            <Button variant="outline" size="lg" className="text-white border-white">
              Agendar agora
            </Button>
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-900" />
            <h3 className="text-xl font-semibold mb-2">Agendamento Online</h3>
            <p className="text-gray-600">
              Marque seu horário de forma rápida e fácil, 24 horas por dia
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <Users className="w-12 h-12 mx-auto mb-4 text-gray-900" />
            <h3 className="text-xl font-semibold mb-2">Profissionais Qualificados</h3>
            <p className="text-gray-600">
              Equipe experiente e especializada em diversos serviços
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <Clock className="w-12 h-12 mx-auto mb-4 text-gray-900" />
            <h3 className="text-xl font-semibold mb-2">Horários Flexíveis</h3>
            <p className="text-gray-600">
              Encontre o melhor horário que se adapte à sua rotina
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}