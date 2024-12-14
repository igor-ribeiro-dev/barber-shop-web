import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scissors, Menu, X } from 'lucide-react';
import { Button } from './ui/Button';
import { useStore } from '../store/useStore';
import { UserMenu } from './user/UserMenu';

export function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isAuthenticated } = useStore();

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Scissors className="h-8 w-8" />
            <span className="text-xl font-bold">Lourival Cabelereiros</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-gray-300 transition-colors">
              Início
            </Link>
            <Link to="/services" className="hover:text-gray-300 transition-colors">
              Serviços
            </Link>
            <Link to="/professionals" className="hover:text-gray-300 transition-colors">
              Profissionais
            </Link>
            {isAuthenticated && (
              <Link to="/appointments" className="hover:text-gray-300 transition-colors">
                Agendamentos
              </Link>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="text-white border-white"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              to="/services"
              className="block px-3 py-2 rounded-md hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Serviços
            </Link>
            <Link
              to="/professionals"
              className="block px-3 py-2 rounded-md hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Profissionais
            </Link>
            {isAuthenticated && (
              <Link
                to="/appointments"
                className="block px-3 py-2 rounded-md hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Agendamentos
              </Link>
            )}
            {isAuthenticated ? (
              <div className="px-3 py-2 space-y-2">
                <UserMenu />
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="w-full text-white border-white mt-4"
                onClick={() => {
                  navigate('/login');
                  setIsMenuOpen(false);
                }}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}