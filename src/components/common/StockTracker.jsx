import React, { useState, useEffect } from 'react';
import { Search, Activity } from 'lucide-react';
import StockCard from './StockCard';
import StockDetail from './StockDetail';
import { useStockData } from '../../hooks/useStockData';

export default function StockTracker() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState(null);
  const { stocks, loading, error } = useStockData();

  // Filter stocks based on search
  const filteredStocks = stocks.filter(stock =>
    stock.symbol?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStockClick = (symbol) => {
    setSelectedStock(symbol);
  };

  const handleBackToDashboard = () => {
    setSelectedStock(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading stock data...</p>
        </div>
      </div>
    );
  }

  if (selectedStock) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <StockDetail symbol={selectedStock} onBack={handleBackToDashboard} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Activity className="text-blue-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-900">Stock Tracker</h1>
            </div>
            <div className="text-sm text-gray-600">
              Live NSE Stock Prices with Interactive Charts
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={`Search from ${stocks.length} stocks...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {error && (
            <div className="mt-2 text-center text-sm text-orange-600">
              {error} - Using fallback data
            </div>
          )}
        </div>

        {/* Stock Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStocks.length > 0 ? (
            filteredStocks.map((stock) => (
              <StockCard
                key={stock.symbol}
                stock={stock}
                onClick={handleStockClick}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Search className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No stocks found</h3>
              <p className="text-gray-600">Try searching with a different term</p>
            </div>
          )}
        </div>

        {/* Info Banner */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Activity className="text-blue-600" size={24} />
            <h3 className="text-lg font-semibold text-blue-900">Enhanced Stock Tracker with Interactive Charts</h3>
          </div>
          <p className="text-blue-800">
            Real-time stock prices powered by Finnhub API with multiple chart types (Line, Area, Bar) and time periods (1D, 1W, 1M, 3M). 
            Click on any stock card to view detailed information including live prices, interactive charts, and key metrics. 
            Data refreshes automatically every 5 seconds when viewing details. Note: NSE symbols are mapped to US equivalents for demo purposes.
          </p>
        </div>
      </main>
    </div>
  );
}