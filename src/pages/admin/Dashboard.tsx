import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AppointmentsDashboard } from '../../components/admin/appointments/AppointmentsDashboard';
import { FinancialDashboard } from '../../components/admin/financial/FinancialDashboard';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = React.useState<'appointments' | 'financial'>('appointments');

  return (
    <AdminLayout>
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'appointments'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Agendamentos
            </button>
            <button
              onClick={() => setActiveTab('financial')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'financial'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Financeiro
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'appointments' ? (
        <AppointmentsDashboard />
      ) : (
        <FinancialDashboard />
      )}
    </AdminLayout>
  );
}