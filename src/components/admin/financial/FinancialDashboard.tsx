import React from 'react';
import { FinancialStats } from './FinancialStats';
import { FinancialTransactions } from './FinancialTransactions';
import { useStore } from '../../../store/useStore';

export function FinancialDashboard() {
  const { appointments } = useStore();
  
  const completedAppointments = appointments.filter(
    (apt) => apt.status === 'completed'
  );

  return (
    <div className="space-y-6">
      <FinancialStats appointments={completedAppointments} />
      <FinancialTransactions appointments={completedAppointments} />
    </div>
  );
}