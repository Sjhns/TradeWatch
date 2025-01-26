// import {
//   PlusIcon
// } from '@heroicons/react/24/outline';
// import { Asset, AssetFilter } from '../types';
// import AssetCard from './AssetCard';
// import { useEffect, useState } from 'react';
// import { fetchStockData } from '../services/stock-data';

// interface DashboardProps {
//   // assets: Asset[];
//   // filter: AssetFilter;
//   // onFilterChange: (filter: Partial<AssetFilter>) => void;
//   onAddAsset: () => void;
// }


// const Dashboard = () => {
//   const [assets, setAssets] = useState<Asset[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAssets = async () => {
//       try {
//         setLoading(true);

//         // Fazendo a requisição para o ticket
//         const data = await fetchStockData(['PETR4']);

//         // Mapeando a resposta para o formato do AssetCard
//         const mappedAssets = data.results.map((result) => ({
//           id: result.symbol,
//           name: result.longName,
//           ticker: result.symbol,
//           price: result.regularMarketPrice,
//           change: result.regularMarketChangePercent,
//           type: 'Ação',
//           volume: result.regularMarketVolume,
//           lastUpdate: new Date(result.regularMarketTime),
//         }));

//         setAssets(mappedAssets);
//       } catch (error) {
//         console.error('Erro ao buscar os dados dos ativos:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAssets();
//   }, []);



//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

//       {/* Assets Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {assets.map((asset) => (
//           <AssetCard key={asset.id} asset={asset} />
//         ))}
//       </div>

//       {/* Floating Action Button */}
//       <button
//         // onClick={onAddAsset}
//         className="fixed bottom-8 right-8 bg-primary-600 text-white rounded-full p-4 shadow-neon 
//                  hover:shadow-neon-hover hover:scale-110 transition-all duration-300"
//         title="Adicionar novo ativo"
//       >
//         <PlusIcon className="h-6 w-6" />
//       </button>
//     </div>
//   );
// };

// export default Dashboard;
