import React from 'react';
import { Calendar, CheckCircle, XCircle } from 'lucide-react';
import { Appointment } from '../../../types';
import { Card } from '../../ui/Card';

interface AppointmentsStatsProps {
  appointments: Appointment[];
}

export function AppointmentsStats({ appointments }: AppointmentsStatsProps) {
  const stats = {
    total: appointments.length,
    completed: appointments.filter((apt) => apt.status === 'completed').length,
    cancelled: appointments.filter((apt) => apt.status === 'cancelled').length,
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="p-4">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Concluídos</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.completed}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center">
          <div className="p-2 bg-red-100 rounded-lg">
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Cancelados</p>
            <p className="text-2xl font-semibold text-gray-900">{stats.cancelled}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}