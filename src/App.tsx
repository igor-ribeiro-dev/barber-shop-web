import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Professionals } from './pages/Professionals';
import { Booking } from './pages/Booking';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Appointments } from './pages/Appointments';
import { AdminDashboard } from './pages/admin/Dashboard';
import { PrivateRoute } from './components/PrivateRoute';

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/services" element={<Services />} />
            <Route path="/professionals" element={<Professionals />} />
            <Route 
              path="/booking" 
              element={
                <PrivateRoute>
                  <Booking />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/appointments" 
              element={
                <PrivateRoute>
                  <Appointments />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              } 
            />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
  );
}