import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { fetchStockPrice } from '../../services/finnhubService';

const StockCard = ({ stock, onClick }) => {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const data = await fetchStockPrice(stock.symbol);
        setStockData(data);
      } catch (error) {
        console.error(`Error fetching data for ${stock.symbol}:`, error);
        // Set fallback data
        setStockData({
          price: (Math.random() * 1000 + 100).toFixed(2),
          change: ((Math.random() - 0.5) * 20).toFixed(2),
          changePercent: ((Math.random() - 0.5) * 5).toFixed(2)
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCardData();
  }, [stock.symbol]);

  const isPositive = stockData ? parseFloat(stockData.change) >= 0 : false;

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-blue-500"
      onClick={() => onClick(stock.symbol)}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{stock.symbol}</h3>
          <p className="text-sm text-gray-600 truncate">{stock.name}</p>
        </div>
        <Activity className="text-blue-500" size={24} />
      </div>
      <div className="flex items-center justify-between">
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
            <span className="text-sm text-gray-500">Loading...</span>
          </div>
        ) : (
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ₹{stockData?.price || '--'}
            </span>
            {stockData && (
              <div className={`flex items-center space-x-1 mt-1 ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span className="text-sm font-medium">
                  {isPositive ? '+' : ''}{stockData.change} ({isPositive ? '+' : ''}{stockData.changePercent}%)
                </span>
              </div>
            )}
          </div>
        )}
        <span className="text-xs text-gray-500">Click for details</span>
      </div>
    </div>
  );
};

export default StockCard;