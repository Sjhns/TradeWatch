import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Alert {
  type: 'success' | 'error';
  message: string;
  timestamp: Date;
}

interface NotificationsPanelProps {
  alerts: Alert[];
}

export default function NotificationsPanel({ alerts }: NotificationsPanelProps) {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'success':
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
            <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
            <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
              ${open ? 'bg-gray-100' : ''}
              group inline-flex items-center rounded-md p-1.5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
            `}
          >
            <BellIcon
              className={`${open ? 'text-gray-600' : 'text-gray-400'} h-6 w-6 group-hover:text-gray-500`}
              aria-hidden="true"
            />
            {alerts.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                {alerts.length}
              </span>
            )}
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-50 mt-3 w-screen max-w-sm transform">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative bg-white p-6">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Notificações</h3>
                    {alerts.length > 0 && (
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800">
                        {alerts.length} nova{alerts.length === 1 ? '' : 's'}
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    {alerts.length === 0 ? (
                      <div className="text-center py-6">
                        <p className="text-sm text-gray-500">Nenhuma notificação no momento</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {alerts.map((alert, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-4 rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100"
                          >
                            {getAlertIcon(alert.type)}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">
                                {alert.message}
                              </p>
                              <p className="mt-1 text-xs text-gray-500">
                                {format(alert.timestamp, "d 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
