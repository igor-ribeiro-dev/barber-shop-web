import React from 'react';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { Appointment } from '../../../types';
import { Card } from '../../ui/Card';

interface FinancialStatsProps {
  appointments: Appointment[];
}

export function FinancialStats({ appointments }: FinancialStatsProps) {
  const totalRevenue = appointments.reduce((sum, apt) => sum + apt.price, 0);
  
  const today = new Date();
  const dailyRevenue = appointments
    .filter(apt => 
      apt.date.getDate() === today.getDate() &&
      apt.date.getMonth() === today.getMonth() &&
      apt.date.getFullYear() === today.getFullYear()
    )
    .reduce((sum, apt) => sum + apt.price, 0);

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="p-4">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Receita Total</p>
            <p className="text-2xl font-semibold text-gray-900">
              R$ {totalRevenue.toFixed(2)}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Receita Diária</p>
            <p className="text-2xl font-semibold text-gray-900">
              R$ {dailyRevenue.toFixed(2)}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center">
          <div className="p-2 bg-purple-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Ticket Médio</p>
            <p className="text-2xl font-semibold text-gray-900">
              R$ {(totalRevenue / appointments.length || 0).toFixed(2)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}