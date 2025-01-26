import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (asset: {
    type: 'stock' | 'fii';
    ticker: string;
    quantity: number;
    price: number;
  }) => void;
}

export default function AddAssetModal({ isOpen, onClose, onAdd }: AddAssetModalProps) {
  const [step, setStep] = useState<1 | 2 | 'success'>(1);
  const [formData, setFormData] = useState({
    type: '' as 'stock' | 'fii' | '',
    ticker: '',
    quantity: 0,
    price: 0,
  });

  const resetForm = () => {
    setFormData({
      type: '',
      ticker: '',
      quantity: 0,
      price: 0,
    });
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.type && formData.ticker && formData.quantity > 0 && formData.price > 0) {
      onAdd({
        type: formData.type,
        ticker: formData.ticker.toUpperCase(),
        quantity: formData.quantity,
        price: formData.price,
      });
      setStep('success');
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleAddAnother = () => {
    resetForm();
  };

  const handleTypeSelect = (type: 'stock' | 'fii') => {
    setFormData(prev => ({ ...prev, type }));
    setStep(2);
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

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={handleClose}
                  >
                    <span className="sr-only">Fechar</span>
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900 mb-6">
                      Adicionar Novo Ativo
                    </Dialog.Title>

                    {step === 1 ? (
                      <div className="space-y-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-4">
                          Selecione o tipo de ativo
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            onClick={() => handleTypeSelect('stock')}
                            className={`p-6 rounded-lg border-2 transition-all ${
                              formData.type === 'stock'
                                ? 'border-indigo-600 bg-indigo-50'
                                : 'border-gray-200 hover:border-indigo-200 hover:bg-indigo-50'
                            }`}
                          >
                            <div className="text-lg font-semibold text-gray-900">Ação</div>
                            <p className="mt-2 text-sm text-gray-500">
                              Empresas listadas na B3
                            </p>
                          </button>
                          <button
                            onClick={() => handleTypeSelect('fii')}
                            className={`p-6 rounded-lg border-2 transition-all ${
                              formData.type === 'fii'
                                ? 'border-indigo-600 bg-indigo-50'
                                : 'border-gray-200 hover:border-indigo-200 hover:bg-indigo-50'
                            }`}
                          >
                            <div className="text-lg font-semibold text-gray-900">FII</div>
                            <p className="mt-2 text-sm text-gray-500">
                              Fundos Imobiliários
                            </p>
                          </button>
                        </div>
                      </div>
                    ) : step === 'success' ? (
                      <div className="text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Ativo adicionado com sucesso!
                        </h3>
                        <p className="text-sm text-gray-500 mb-6">
                          Deseja adicionar outro ativo?
                        </p>
                        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
                          <button
                            type="button"
                            className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all sm:w-auto"
                            onClick={handleClose}
                          >
                            Não, fechar
                          </button>
                          <button
                            type="button"
                            className="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-base font-medium text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all sm:w-auto"
                            onClick={handleAddAnother}
                          >
                            Sim, adicionar outro
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                          <label htmlFor="ticker" className="block text-base font-medium text-gray-700 mb-2">
                            Ticker
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="ticker"
                              value={formData.ticker}
                              onChange={(e) => setFormData(prev => ({ ...prev, ticker: e.target.value }))}
                              className="block w-full rounded-lg border-gray-300 px-4 py-3 text-base placeholder:text-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                              placeholder={formData.type === 'stock' ? 'Ex: PETR4' : 'Ex: HGLG11'}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="quantity" className="block text-base font-medium text-gray-700 mb-2">
                            Quantidade
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              id="quantity"
                              min="0"
                              step="1"
                              value={formData.quantity || ''}
                              onChange={(e) => setFormData(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                              className="block w-full rounded-lg border-gray-300 px-4 py-3 text-base shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="price" className="block text-base font-medium text-gray-700 mb-2">
                            Preço Atual (R$)
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              id="price"
                              min="0"
                              step="0.01"
                              value={formData.price || ''}
                              onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                              className="block w-full rounded-lg border-gray-300 px-4 py-3 text-base shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                              required
                            />
                          </div>
                        </div>

                        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                          <button
                            type="button"
                            className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all sm:w-auto"
                            onClick={() => setStep(1)}
                          >
                            Voltar
                          </button>
                          <button
                            type="submit"
                            className="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-base font-medium text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all sm:w-auto"
                          >
                            Adicionar
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
