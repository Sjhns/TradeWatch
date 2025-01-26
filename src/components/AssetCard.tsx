import { BellIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { Asset } from "../types";
import { formatTimestamp } from "../utils/formatTimestamp";

interface AssetCardProps {
  asset: Asset;
}

const AssetCard = ({ asset }: AssetCardProps) => {
  return (
    <div className="card overflow-hidden group">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              {asset.name}
            </h3>
            <p className="text-sm text-gray-500">{asset.ticker}</p>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
              <BellIcon className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
              <ChartBarIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              R${" "}
              {asset.price.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </p>
            <div
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                asset.change >= 0 ? "badge-success" : "badge-danger"
              }`}
            >
              {asset.change >= 0 ? "+" : ""}
              {asset.change.toFixed(2)}%
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm font-medium text-gray-500 capitalize">
              {asset.type}
            </span>

            {!!asset.volume && (
              <p className="text-xs text-gray-400">
                Vol: {(asset.volume / 1000).toFixed(1)}K
              </p>
            )}
          </div>
        </div>

        {/* Last update timestamp */}
        {asset.lastUpdate && (
          <div className="mt-4 text-xs text-gray-400">
            Última atualização: {formatTimestamp(asset.lastUpdate)}
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-100">
        <div
          className={`h-full transition-all duration-500 ${
            asset.change >= 0 ? "bg-success-500" : "bg-danger-500"
          }`}
          style={{ width: `${Math.min(Math.abs(asset.change) * 10, 100)}%` }}
        />
      </div>
    </div>
  );
};

export default AssetCard;
