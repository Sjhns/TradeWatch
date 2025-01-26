import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { Alert } from '../types';

interface AlertsListProps {
  alerts: Alert[];
}

const AlertsList = ({ alerts }: AlertsListProps) => {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="h-6 w-6 text-success-500" />;
      case 'error':
        return <XCircleIcon className="h-6 w-6 text-danger-500" />;
    }
  };

  const getAlertStyles = (type: Alert['type']) => {
    switch (type) {
      case 'success':
        return 'bg-success-50 border-l-4 border-success-500';
      case 'error':
        return 'bg-danger-50 border-l-4 border-danger-500';
    }
  };

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  if (alerts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">Nenhuma notificação recente</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Console de Notificações</h3>
        <p className="mt-1 text-sm text-gray-500">
          Últimas {alerts.length} notificações
        </p>
      </div>
      <div className="divide-y divide-gray-200">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 ${getAlertStyles(alert.type)} hover:bg-opacity-80 transition-colors`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 pt-1">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-gray-900">
                    {alert.ticker}
                  </p>
                  <span className="text-xs text-gray-500">
                    {formatTimestamp(alert.timestamp)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  {alert.message}
                </p>
                <div className="mt-2 flex space-x-2">
                  <button className="text-xs text-primary-600 hover:text-primary-700 font-medium">
                    Ver detalhes
                  </button>
                  <button className="text-xs text-gray-500 hover:text-gray-700">
                    Marcar como lida
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsList;
