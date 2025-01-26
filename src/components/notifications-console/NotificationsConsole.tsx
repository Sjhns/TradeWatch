import { Fragment, useState } from "react";
import { Dialog, Transition, Menu } from "@headlessui/react";
import {
  XMarkIcon,
  BellIcon,
  CheckCircleIcon,
  XCircleIcon,
  FunnelIcon,
  ClockIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  ArchiveBoxIcon,
  EyeIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { Alert } from "../../types";
import { filterAlertsByTimeRange } from "./filterAlertsByTimeRange ";
import { formatTimestamp } from "../../utils/formatTimestamp";

interface NotificationsConsoleProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: Alert[];
}

const NotificationsConsole = ({
  isOpen,
  onClose,
  alerts,
}: NotificationsConsoleProps) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h");

  const filteredAlerts = filterAlertsByTimeRange(alerts, selectedTimeRange);

  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircleIcon className="h-6 w-6 text-success-500" />;
      case "error":
        return <XCircleIcon className="h-6 w-6 text-danger-500" />;
    }
  };

  const getAlertStyles = (type: Alert["type"]) => {
    switch (type) {
      case "success":
        return "bg-success-50 border-l-4 border-success-500";
      case "error":
        return "bg-danger-50 border-l-4 border-danger-500";
    }
  };

 

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="flex min-h-full items-center justify-center p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform bg-white shadow-xl transition-all sm:w-screen sm:h-screen w-full h-screen flex flex-col">
                {/* Header */}
                <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-gray-200 bg-white">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-4">
                      <BellIcon className="h-6 w-6 sm:h-8 sm:w-8 text-primary-600" />
                      <div>
                        <Dialog.Title className="text-xl sm:text-2xl font-semibold text-gray-900">
                          Console de Notificações
                        </Dialog.Title>
                        <p className="mt-1 text-sm text-gray-500 hidden sm:block">
                          Monitore e gerencie todas as suas notificações em
                          tempo real
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end sm:space-x-4 w-full sm:w-auto">
                      {/* Mobile: Close button aligned to the right */}
                      <button
                        type="button"
                        className="sm:hidden rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                        onClick={onClose}
                      >
                        <span className="sr-only">Fechar</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Filter and Time Range in a scrollable container for mobile */}
                      <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto hide-scrollbar">
                        {/* Filter Dropdown */}
                        <Menu as="div" className="relative">
                          <Menu.Button
                            className="inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            onClick={() => setSelectedFilter("all")}
                            // onClick={

                            // }
                          >
                            <FunnelIcon className="h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline">Filtrar</span>
                            <ChevronDownIcon className="h-4 w-4 ml-1 sm:ml-2" />
                          </Menu.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      className={`${
                                        active ? "bg-gray-100" : ""
                                      } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                                      onClick={() => setSelectedFilter("all")}
                                    >
                                      {selectedFilter === "all" && (
                                        <CheckIcon className="h-4 w-4 mr-2 text-primary-600" />
                                      )}
                                      <span
                                        className={
                                          selectedFilter === "all" ? "ml-6" : ""
                                        }
                                      >
                                        Todas as notificações
                                      </span>
                                    </button>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      className={`${
                                        active ? "bg-gray-100" : ""
                                      } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                                      onClick={() =>
                                        setSelectedFilter("unread")
                                      }
                                    >
                                      {selectedFilter === "unread" && (
                                        <CheckIcon className="h-4 w-4 mr-2 text-primary-600" />
                                      )}
                                      <span
                                        className={
                                          selectedFilter === "unread"
                                            ? "ml-6"
                                            : ""
                                        }
                                      >
                                        Não lidas
                                      </span>
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>

                        {/* Time Range Dropdown */}
                        <Menu as="div" className="relative">
                          <Menu.Button className="inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            <ClockIcon className="h-4 w-4 sm:mr-2" />
                            <span className="hidden sm:inline">Período</span>
                            <ChevronDownIcon className="h-4 w-4 ml-1 sm:ml-2" />
                          </Menu.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                              <div className="py-1">
                                {["1h", "24h", "7d", "30d", "all"].map(
                                  (range) => (
                                    <Menu.Item key={range}>
                                      {({ active }) => (
                                        <button
                                          className={`${
                                            active ? "bg-gray-100" : ""
                                          } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                                          onClick={() =>
                                            setSelectedTimeRange(range)
                                          }
                                        >
                                          {selectedTimeRange === range && (
                                            <CheckIcon className="h-4 w-4 mr-2 text-primary-600" />
                                          )}
                                          <span
                                            className={
                                              selectedTimeRange === range
                                                ? "ml-6"
                                                : ""
                                            }
                                          >
                                            {range === "1h" && "Última hora"}
                                            {range === "24h" &&
                                              "Últimas 24 horas"}
                                            {range === "7d" && "Últimos 7 dias"}
                                            {range === "30d" &&
                                              "Últimos 30 dias"}
                                            {range === "all" && "Todo período"}
                                          </span>
                                        </button>
                                      )}
                                    </Menu.Item>
                                  )
                                )}
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>

                        <button className="inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                          <ArrowPathIcon className="h-4 w-4 sm:mr-2" />
                          <span className="hidden sm:inline">Atualizar</span>
                        </button>

                        {/* Desktop: Close button */}
                        <button
                          type="button"
                          className="hidden sm:block rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                          onClick={onClose}
                        >
                          <span className="sr-only">Fechar</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-8">
                  <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                      <div className="divide-y divide-gray-200">
                        {filteredAlerts.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-8 sm:py-12">
                            <BellIcon className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">
                              Nenhuma notificação
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Você não tem nenhuma notificação no momento.
                            </p>
                          </div>
                        ) : (
                          filteredAlerts.map((alert) => (
                            <div
                              key={alert.id}
                              className={`p-4 sm:p-6 ${getAlertStyles(
                                alert.type
                              )} hover:bg-opacity-80 transition-colors`}
                            >
                              <div className="flex items-start space-x-3 sm:space-x-4">
                                <div className="flex-shrink-0 pt-1">
                                  {getAlertIcon(alert.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                                    <div>
                                      <p className="text-base sm:text-lg font-medium text-gray-900">
                                        {alert.ticker}
                                      </p>
                                      <p className="mt-1 text-sm text-gray-600">
                                        {alert.message}
                                      </p>
                                      <p className="mt-1 text-xs text-gray-500">
                                        {formatTimestamp(alert.timestamp)}
                                      </p>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                                      <button className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                                        <EyeIcon className="h-4 w-4 mr-1" />
                                        Marcar como lida
                                      </button>
                                      <button className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                                        <ArchiveBoxIcon className="h-4 w-4 mr-1" />
                                        Arquivar
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="hidden sm:block px-4 sm:px-8 py-4 border-t border-gray-200 bg-white">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">
                        {filteredAlerts.length} notificações no total
                      </span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">
                        {
                          filteredAlerts.filter((a) => a.type === "success")
                            .length
                        }{" "}
                        sucessos
                      </span>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">
                        {
                          filteredAlerts.filter((a) => a.type === "error")
                            .length
                        }{" "}
                        erros
                      </span>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none"
                      >
                        Marcar todas como lidas
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default NotificationsConsole;
