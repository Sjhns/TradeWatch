import { 
  PlusIcon, 
  ArrowsUpDownIcon, 
  ChartBarIcon, 
  ArrowTrendingUpIcon, 
  BanknotesIcon, 
  BuildingLibraryIcon,
  ScaleIcon,
  PresentationChartLineIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  FlagIcon,
  ArrowPathRoundedSquareIcon,
  ChartPieIcon,
  CalendarIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';
import { Asset, AssetFilter } from '../types';
import AssetCard from './AssetCard';

interface DashboardProps {
  assets: Asset[];
  filter: AssetFilter;
  onFilterChange: (filter: Partial<AssetFilter>) => void;
  onAddAsset: () => void;
}

const Dashboard = ({ assets, filter, onFilterChange, onAddAsset }: DashboardProps) => {
  const totalValue = assets.reduce((sum, asset) => sum + asset.price, 0);
  const dailyChange = assets.reduce((sum, asset) => sum + asset.change, 0) / (assets.length || 1);
  const stocksValue = assets.filter(a => a.type === 'stock').reduce((sum, asset) => sum + asset.price, 0);
  const fiisValue = assets.filter(a => a.type === 'fii').reduce((sum, asset) => sum + asset.price, 0);

  const bestPerformer = assets.reduce((best, current) => 
    current.change > (best?.change || -Infinity) ? current : best
  );

  const worstPerformer = assets.reduce((worst, current) => 
    current.change < (worst?.change || Infinity) ? current : worst
  );

  const stocksPercentage = (stocksValue / totalValue) * 100 || 0;
  const fiisPercentage = (fiisValue / totalValue) * 100 || 0;

  const sectorDistribution = assets
    .filter(a => a.type === 'stock')
    .reduce((acc, asset) => {
      acc[asset.sector] = (acc[asset.sector] || 0) + asset.price;
      return acc;
    }, {} as Record<string, number>);

  const topSectors = Object.entries(sectorDistribution)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([sector, value]) => ({
      sector,
      percentage: (value / stocksValue) * 100
    }));

  const monthlyPerformance = assets.reduce((sum, asset) => sum + (asset.monthlyChange || 0), 0) / (assets.length || 1);
  const yearlyPerformance = assets.reduce((sum, asset) => sum + (asset.yearlyChange || 0), 0) / (assets.length || 1);
  const totalDividends = assets.reduce((sum, asset) => sum + (asset.lastDividend || 0), 0);
  const averageYield = assets.reduce((sum, asset) => sum + (asset.dividendYield || 0), 0) / (assets.length || 1);

  const volatility = Math.sqrt(
    assets.reduce((sum, asset) => sum + Math.pow(asset.change, 2), 0) / (assets.length || 1)
  );

  const diversificationScore = Math.min(100, (assets.length / 10) * 100);
  const liquidAssets = assets.filter(a => a.volume > 100000).length;
  const liquidityScore = (liquidAssets / assets.length) * 100 || 0;
  const healthScore = (diversificationScore + liquidityScore) / 2;

  const idealStockPercentage = 60;
  const idealFiiPercentage = 40;
  const stocksRebalance = ((idealStockPercentage / 100) * totalValue) - stocksValue;
  const fiisRebalance = ((idealFiiPercentage / 100) * totalValue) - fiisValue;

  // New calculations
  // Correlação entre ativos (simplificada)
  const correlations = assets.map(asset1 => {
    return assets.map(asset2 => {
      if (asset1 === asset2) return 1;
      const correlation = calculateCorrelation(asset1.historicalPrices || [], asset2.historicalPrices || []);
      return correlation;
    });
  });

  // Encontrar pares altamente correlacionados
  const highlyCorrelated = [];
  for (let i = 0; i < assets.length; i++) {
    for (let j = i + 1; j < assets.length; j++) {
      if (Math.abs(correlations[i][j]) > 0.8) {
        highlyCorrelated.push({
          asset1: assets[i],
          asset2: assets[j],
          correlation: correlations[i][j]
        });
      }
    }
  }

  // Projeção de dividendos anual
  const annualDividendProjection = assets.reduce((sum, asset) => {
    const monthlyDividend = asset.lastDividend || 0;
    return sum + (monthlyDividend * 12);
  }, 0);

  // Comparação com índices
  const ibovPerformance = 15.2; // Exemplo: retorno do Ibovespa no período
  const ifix = 12.8; // Exemplo: retorno do IFIX no período
  const portfolioPerformance = yearlyPerformance;

  // Cálculo de métricas de risco adicionais
  const sharpeRatio = (portfolioPerformance - 4.5) / (volatility || 1); // 4.5% como taxa livre de risco
  const maxDrawdown = calculateMaxDrawdown(assets);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card card-hover p-6 bg-gradient-to-br from-primary-500/10 to-primary-600/5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Portfolio Total</h3>
            <BanknotesIcon className="h-6 w-6 text-primary-600" />
          </div>
          <p className="mt-2 text-3xl font-bold text-primary-600">
            R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <div className="mt-2 text-sm text-gray-500">
            {assets.length} ativos monitorados
          </div>
        </div>

        <div className="card card-hover p-6 bg-gradient-to-br from-gray-500/10 to-gray-600/5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Variação Diária</h3>
            <ArrowTrendingUpIcon className={`h-6 w-6 ${dailyChange >= 0 ? 'text-success-500' : 'text-danger-500'}`} />
          </div>
          <p className={`mt-2 text-3xl font-bold ${
            dailyChange >= 0 ? 'text-success-500' : 'text-danger-500'
          }`}>
            {dailyChange >= 0 ? '+' : ''}{dailyChange.toFixed(2)}%
          </p>
          <div className="mt-2 text-sm text-gray-500">
            Média de todos os ativos
          </div>
        </div>

        <div className="card card-hover p-6 bg-gradient-to-br from-indigo-500/10 to-indigo-600/5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Ações</h3>
            <ChartBarIcon className="h-6 w-6 text-indigo-600" />
          </div>
          <p className="mt-2 text-3xl font-bold text-indigo-600">
            R$ {stocksValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <div className="mt-2 text-sm text-gray-500">
            {assets.filter(a => a.type === 'stock').length} ações
          </div>
        </div>

        <div className="card card-hover p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">FIIs</h3>
            <BuildingLibraryIcon className="h-6 w-6 text-emerald-600" />
          </div>
          <p className="mt-2 text-3xl font-bold text-emerald-600">
            R$ {fiisValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <div className="mt-2 text-sm text-gray-500">
            {assets.filter(a => a.type === 'fii').length} fundos
          </div>
        </div>
      </div>

      {/* Portfolio Distribution */}
      {assets.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="card card-hover p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Distribuição da Carteira</h3>
              <ScaleIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Ações</span>
                  <span className="text-sm font-medium text-gray-700">{stocksPercentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${stocksPercentage}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">FIIs</span>
                  <span className="text-sm font-medium text-gray-700">{fiisPercentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${fiisPercentage}%` }}></div>
                </div>
              </div>
              {topSectors.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Principais Setores (Ações)</h4>
                  {topSectors.map(({ sector, percentage }) => (
                    <div key={sector} className="flex justify-between text-sm text-gray-600">
                      <span>{sector}</span>
                      <span>{percentage.toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="card card-hover p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Métricas de Rentabilidade</h3>
              <PresentationChartLineIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Rentabilidade Mensal</h4>
                <p className={`text-xl font-bold ${monthlyPerformance >= 0 ? 'text-success-500' : 'text-danger-500'}`}>
                  {monthlyPerformance >= 0 ? '+' : ''}{monthlyPerformance.toFixed(2)}%
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">Rentabilidade Anual</h4>
                <p className={`text-xl font-bold ${yearlyPerformance >= 0 ? 'text-success-500' : 'text-danger-500'}`}>
                  {yearlyPerformance >= 0 ? '+' : ''}{yearlyPerformance.toFixed(2)}%
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">Total em Dividendos</h4>
                <p className="text-xl font-bold text-gray-900">
                  R$ {totalDividends.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">Yield Médio</h4>
                <p className="text-xl font-bold text-gray-900">{averageYield.toFixed(2)}%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Health */}
      {assets.length > 0 && (
        <div className="card card-hover p-6 bg-gradient-to-br from-teal-500/10 to-teal-600/5 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Saúde da Carteira</h3>
            <ShieldCheckIcon className="h-6 w-6 text-teal-600" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Score Geral</h4>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-gray-900">{healthScore.toFixed(0)}/100</p>
                <p className="text-sm text-gray-500">
                  {healthScore < 50 ? 'Precisa Atenção' : healthScore < 75 ? 'Bom' : 'Excelente'}
                </p>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    healthScore < 50 ? 'bg-danger-500' : 
                    healthScore < 75 ? 'bg-warning-500' : 'bg-success-500'
                  }`}
                  style={{ width: `${healthScore}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Volatilidade</h4>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-gray-900">{volatility.toFixed(2)}%</p>
                <p className="text-sm text-gray-500">
                  {volatility < 15 ? 'Baixa' : volatility < 30 ? 'Média' : 'Alta'}
                </p>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    volatility < 15 ? 'bg-success-500' : 
                    volatility < 30 ? 'bg-warning-500' : 'bg-danger-500'
                  }`}
                  style={{ width: `${Math.min(100, (volatility / 40) * 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Liquidez</h4>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-gray-900">{liquidityScore.toFixed(0)}%</p>
                <p className="text-sm text-gray-500">
                  {liquidityScore < 50 ? 'Baixa' : liquidityScore < 80 ? 'Média' : 'Alta'}
                </p>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    liquidityScore < 50 ? 'bg-danger-500' : 
                    liquidityScore < 80 ? 'bg-warning-500' : 'bg-success-500'
                  }`}
                  style={{ width: `${liquidityScore}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rebalancing Recommendations */}
      {assets.length > 0 && Math.abs(stocksRebalance) + Math.abs(fiisRebalance) > 5000 && (
        <div className="card card-hover p-6 bg-gradient-to-br from-violet-500/10 to-violet-600/5 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Sugestões de Rebalanceamento</h3>
              <p className="text-sm text-gray-500 mt-1">Mantenha sua carteira alinhada com seus objetivos</p>
            </div>
            <ArrowPathRoundedSquareIcon className="h-6 w-6 text-violet-600" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Math.abs(stocksRebalance) > 1000 && (
              <div className="bg-white rounded-lg p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700">Ações ({stocksPercentage.toFixed(1)}%)</h4>
                  <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    Meta: {idealStockPercentage}%
                  </span>
                </div>
                <p className={`text-sm ${stocksRebalance > 0 ? 'text-success-600' : 'text-danger-600'}`}>
                  {stocksRebalance > 0 ? 'Comprar' : 'Vender'} R$ {Math.abs(stocksRebalance).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            )}

            {Math.abs(fiisRebalance) > 1000 && (
              <div className="bg-white rounded-lg p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700">FIIs ({fiisPercentage.toFixed(1)}%)</h4>
                  <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    Meta: {idealFiiPercentage}%
                  </span>
                </div>
                <p className={`text-sm ${fiisRebalance > 0 ? 'text-success-600' : 'text-danger-600'}`}>
                  {fiisRebalance > 0 ? 'Comprar' : 'Vender'} R$ {Math.abs(fiisRebalance).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Performance Highlights */}
      {assets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card card-hover p-6 bg-gradient-to-br from-success-500/10 to-success-600/5">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Melhor Performance</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-semibold text-gray-900">{bestPerformer?.ticker}</p>
                <p className="text-sm text-gray-500">{bestPerformer?.name}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-success-500">+{bestPerformer?.change.toFixed(2)}%</p>
                <p className="text-sm text-gray-500">R$ {bestPerformer?.price.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="card card-hover p-6 bg-gradient-to-br from-danger-500/10 to-danger-600/5">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Pior Performance</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-semibold text-gray-900">{worstPerformer?.ticker}</p>
                <p className="text-sm text-gray-500">{worstPerformer?.name}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-danger-500">{worstPerformer?.change.toFixed(2)}%</p>
                <p className="text-sm text-gray-500">R$ {worstPerformer?.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Insights */}
      {assets.length > 0 && (
        <div className="card card-hover p-6 bg-gradient-to-br from-amber-500/10 to-amber-600/5 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Insights da Carteira</h3>
            <LightBulbIcon className="h-6 w-6 text-amber-600" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Concentração</h4>
              <p className="text-sm text-gray-600">
                {stocksPercentage > 70 ? 
                  'Alta concentração em ações. Considere diversificar com FIIs.' :
                  fiisPercentage > 70 ?
                  'Alta concentração em FIIs. Considere diversificar com ações.' :
                  'Boa distribuição entre ações e FIIs.'}
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Dividendos</h4>
              <p className="text-sm text-gray-600">
                {averageYield < 4 ?
                  'Yield abaixo da média do mercado. Considere ativos com maior distribuição.' :
                  averageYield > 8 ?
                  'Excelente yield! Mantenha o foco em dividendos consistentes.' :
                  'Yield dentro da média do mercado.'}
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Volatilidade</h4>
              <p className="text-sm text-gray-600">
                {Math.abs(dailyChange) > 3 ?
                  'Alta volatilidade detectada. Considere rebalancear a carteira.' :
                  'Volatilidade dentro do esperado.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Nova seção: Análise de Correlação */}
      {assets.length > 1 && highlyCorrelated.length > 0 && (
        <div className="card card-hover p-6 bg-gradient-to-br from-amber-500/10 to-amber-600/5 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Análise de Correlação</h3>
              <p className="text-sm text-gray-500 mt-1">Ativos altamente correlacionados em sua carteira</p>
            </div>
            <ChartPieIcon className="h-6 w-6 text-amber-600" />
          </div>
          <div className="space-y-4">
            {highlyCorrelated.slice(0, 3).map(({ asset1, asset2, correlation }, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{asset1.symbol}</span>
                    <ArrowsUpDownIcon className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{asset2.symbol}</span>
                  </div>
                  <span className={`text-sm font-medium ${
                    correlation > 0 ? 'text-danger-600' : 'text-success-600'
                  }`}>
                    {(correlation * 100).toFixed(1)}% {correlation > 0 ? 'correlação positiva' : 'correlação negativa'}
                  </span>
                </div>
              </div>
            ))}
            {highlyCorrelated.length > 3 && (
              <p className="text-sm text-gray-500 mt-2">
                E mais {highlyCorrelated.length - 3} pares de ativos correlacionados
              </p>
            )}
          </div>
        </div>
      )}

      {/* Nova seção: Projeções e Comparativos */}
      {assets.length > 0 && (
        <div className="card card-hover p-6 bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Projeções e Comparativos</h3>
              <p className="text-sm text-gray-500 mt-1">Análise comparativa e projeções futuras</p>
            </div>
            <CalendarIcon className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Projeção de Dividendos (12 meses)</h4>
              <p className="text-2xl font-bold text-gray-900">
                R$ {annualDividendProjection.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {(annualDividendProjection / totalValue * 100).toFixed(2)}% yield projetado
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Comparativo com Índices</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Sua Carteira</span>
                  <span className={`text-sm font-medium ${
                    portfolioPerformance > 0 ? 'text-success-600' : 'text-danger-600'
                  }`}>
                    {portfolioPerformance.toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">IBOV</span>
                  <span className={`text-sm font-medium ${
                    ibovPerformance > 0 ? 'text-success-600' : 'text-danger-600'
                  }`}>
                    {ibovPerformance.toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">IFIX</span>
                  <span className={`text-sm font-medium ${
                    ifix > 0 ? 'text-success-600' : 'text-danger-600'
                  }`}>
                    {ifix.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Métricas de Risco</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Sharpe Ratio</span>
                  <span className={`text-sm font-medium ${
                    sharpeRatio > 1 ? 'text-success-600' : 'text-gray-600'
                  }`}>
                    {sharpeRatio.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Drawdown Máximo</span>
                  <span className="text-sm font-medium text-danger-600">
                    {maxDrawdown.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onFilterChange({ type: 'all' })}
            className={`btn-secondary ${filter.type === 'all' ? 'bg-primary-100 text-primary-700 ring-2 ring-primary-500' : ''}`}
          >
            Todos
          </button>
          <button
            onClick={() => onFilterChange({ type: 'stock' })}
            className={`btn-secondary ${filter.type === 'stock' ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-500' : ''}`}
          >
            Ações
          </button>
          <button
            onClick={() => onFilterChange({ type: 'fii' })}
            className={`btn-secondary ${filter.type === 'fii' ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-500' : ''}`}
          >
            FIIs
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <ArrowsUpDownIcon className="h-5 w-5 text-gray-500" />
            <select
              value={filter.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as AssetFilter['sortBy'] })}
              className="input-primary py-1"
            >
              <option value="name">Nome</option>
              <option value="price">Preço</option>
              <option value="change">Variação</option>
            </select>
            <button
              onClick={() => onFilterChange({ order: filter.order === 'asc' ? 'desc' : 'asc' })}
              className="btn-secondary py-1"
            >
              {filter.order === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <AssetCard key={asset.id} asset={asset} />
        ))}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={onAddAsset}
        className="fixed bottom-8 right-8 bg-primary-600 text-white rounded-full p-4 shadow-neon 
                 hover:shadow-neon-hover hover:scale-110 transition-all duration-300"
        title="Adicionar novo ativo"
      >
        <PlusIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

// Utility functions
function calculateCorrelation(prices1: number[], prices2: number[]): number {
  if (prices1.length !== prices2.length || prices1.length < 2) return 0;
  
  const n = prices1.length;
  const mean1 = prices1.reduce((a, b) => a + b) / n;
  const mean2 = prices2.reduce((a, b) => a + b) / n;
  
  const variance1 = prices1.reduce((a, b) => a + Math.pow(b - mean1, 2), 0);
  const variance2 = prices2.reduce((a, b) => a + Math.pow(b - mean2, 2), 0);
  
  const covariance = prices1.reduce((a, b, i) => a + (b - mean1) * (prices2[i] - mean2), 0);
  
  return covariance / Math.sqrt(variance1 * variance2);
}

function calculateMaxDrawdown(assets: Asset[]): number {
  const totalValues = assets[0]?.historicalPrices?.map((_, index) => 
    assets.reduce((sum, asset) => sum + (asset.historicalPrices?.[index] || 0), 0)
  ) || [];

  let maxDrawdown = 0;
  let peak = totalValues[0] || 0;

  for (const value of totalValues) {
    if (value > peak) peak = value;
    const drawdown = ((peak - value) / peak) * 100;
    if (drawdown > maxDrawdown) maxDrawdown = drawdown;
  }

  return maxDrawdown;
}

export default Dashboard;
