import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { ChartBarIcon, BellIcon, UserCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import NotificationsConsole from './notifications-console/NotificationsConsole';
import { Alert } from '../types';

interface NavbarProps {
  alerts: Alert[];
}

const Navbar = ({ alerts }: NavbarProps) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const unreadCount = alerts.length; // You might want to track read/unread status in the future

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = () => {
    signOut();
    setIsUserMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-md'
          : 'bg-white shadow-lg'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <ChartBarIcon className="h-8 w-8 text-primary-600 animate-pulse-slow" />
                <span className="ml-2 text-xl font-bold text-primary-600 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                  TradeWatch
                </span>
              </Link>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-4">
              {/* Notifications Button */}
              <button
                type="button"
                onClick={() => setIsConsoleOpen(true)}
                className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none"
              >
                <BellIcon className="h-6 w-6 text-gray-500" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs font-medium text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* User Menu */}
              <Menu as="div" className="relative">
                <Menu.Button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:text-primary-600 transition-colors focus:outline-none"
                >
                  <UserCircleIcon className="h-6 w-6" />
                  <span className="text-sm font-medium hidden sm:block">{user?.name || 'Usuário'}</span>
                </Menu.Button>

                {/* Dropdown Menu */}
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className={`text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm flex items-center ${
                            active ? 'bg-gray-100' : ''
                          }`}
                        >
                          <UserCircleIcon className="w-5 h-5 mr-1" />
                          Perfil
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/settings"
                          className={`text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm flex items-center ${
                            active ? 'bg-gray-100' : ''
                          }`}
                        >
                          <Cog6ToothIcon className="w-5 h-5 mr-1" />
                          Configurações
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleSignOut}
                          className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                            active ? 'bg-gray-100' : ''
                          }`}
                        >
                          Sair
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </nav>

      <div className="h-16" />

      <NotificationsConsole
        isOpen={isConsoleOpen}
        onClose={() => setIsConsoleOpen(false)}
        alerts={alerts}
      />
    </>
  );
};

export default Navbar;
