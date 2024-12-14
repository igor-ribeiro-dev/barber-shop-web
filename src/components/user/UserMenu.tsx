import React from 'react';
import { User, LogOut } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { UserProfileModal } from './UserProfileModal';

export function UserMenu() {
  const { user, logout } = useStore();
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  if (!user) return null;

  return (
    <>
      <div className="relative group">
        <button
          onClick={() => setIsProfileOpen(true)}
          className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
        >
          <User className="w-4 h-4" />
          <span>{user.name}</span>
        </button>
      </div>

      <button
        onClick={logout}
        className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        <span>Sair</span>
      </button>

      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </>
  );
}