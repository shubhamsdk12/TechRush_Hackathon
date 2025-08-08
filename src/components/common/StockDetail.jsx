import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3, RefreshCw, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { fetchStockPrice } from '../../services/finnhubService';
import { generateHistoricalData } from '../../utils/chartHelper';

const StockDetail = ({ symbol, onBack }) => {
  const [stockData, setStockData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [chartPeriod, setChartPeriod] = useState('1D');
  const [chartType, setChartType] = useState('line');

  const fetchData = async () => {
    try {
      const data = await fetchStockPrice(symbol);
      setStockData(data);
      setChartData(generateHistoricalData(data.price, chartPeriod));
    } catch (error) {
      console.error('Error fetching stock data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    let interval;
    if (autoRefresh) {
      interval = setInterval(fetchData, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [symbol, autoRefresh]);

  useEffect(() => {
    if (stockData) {
      setChartData(generateHistoricalData(stockData.price, chartPeriod));
    }
  }, [chartPeriod, stockData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const isPositive = parseFloat(stockData.change) >= 0;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-medium">{`Time: ${label}`}</p>
          <p className="text-blue-600">
            {`Price: ₹${payload[0].value}`}
          </p>
          {payload[0].payload.volume && (
            <p className="text-gray-600">
              {`Volume: ${payload[0].payload.volume.toLocaleString()}`}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (chartType) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="time" 
                stroke="#666"
                fontSize={12}
                interval="preserveStartEnd"
              />
              <YAxis 
                stroke="#666"
                fontSize={12}
                domain={['dataMin - 10', 'dataMax + 10']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="price"
                stroke={isPositive ? '#10B981' : '#EF4444'}
                fill={isPositive ? '#10B98140' : '#EF444440'}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="time" 
                stroke="#666"
                fontSize={12}
                interval="preserveStartEnd"
              />
              <YAxis 
                stroke="#666"
                fontSize={12}
                domain={['dataMin - 10', 'dataMax + 10']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="price"
                fill={isPositive ? '#10B981' : '#EF4444'}
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      
      default: // line
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="time" 
                stroke="#666"
                fontSize={12}
                interval="preserveStartEnd"
              />
              <YAxis 
                stroke="#666"
                fontSize={12}
                domain={['dataMin - 10', 'dataMax + 10']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="price"
                stroke={isPositive ? '#10B981' : '#EF4444'}
                strokeWidth={2}
                dot={{ fill: isPositive ? '#10B981' : '#EF4444', strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
        >
          <span>←</span>
          <span>Back to Dashboard</span>
        </button>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              autoRefresh ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
            }`}
          >
            <RefreshCw size={16} />
            <span>{autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}</span>
          </button>
        </div>
      </div>

      {/* Stock Info */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{symbol}</h1>
            <p className="text-lg text-gray-600">NSE Stock</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-gray-900">₹{stockData.price}</div>
            <div className={`flex items-center justify-end space-x-2 ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
              <span className="text-lg font-semibold">
                {isPositive ? '+' : ''}{stockData.change} ({isPositive ? '+' : ''}{stockData.changePercent}%)
              </span>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Last updated: {new Date(stockData.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="text-green-500" size={20} />
              <span className="text-sm font-medium text-gray-600">High</span>
            </div>
            <div className="text-xl font-bold text-gray-900">₹{stockData.high}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingDown className="text-red-500" size={20} />
              <span className="text-sm font-medium text-gray-600">Low</span>
            </div>
            <div className="text-xl font-bold text-gray-900">₹{stockData.low}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="text-blue-500" size={20} />
              <span className="text-sm font-medium text-gray-600">Open</span>
            </div>
            <div className="text-xl font-bold text-gray-900">₹{stockData.open}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <BarChart3 className="text-orange-500" size={20} />
              <span className="text-sm font-medium text-gray-600">Prev Close</span>
            </div>
            <div className="text-xl font-bold text-gray-900">₹{stockData.previousClose}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="text-purple-500" size={20} />
              <span className="text-sm font-medium text-gray-600">Volume</span>
            </div>
            <div className="text-xl font-bold text-gray-900">{stockData.volume.toLocaleString()}</div>
          </div>
        </div>

        {/* Chart Controls */}
        <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="text-gray-500" size={20} />
              <span className="text-sm font-medium text-gray-700">Time Period:</span>
              <div className="flex space-x-1">
                {['1D', '1W', '1M', '3M'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setChartPeriod(period)}
                    className={`px-3 py-1 text-sm rounded ${
                      chartPeriod === period
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <BarChart3 className="text-gray-500" size={20} />
            <span className="text-sm font-medium text-gray-700">Chart Type:</span>
            <div className="flex space-x-1">
              {[
                { key: 'line', label: 'Line' },
                { key: 'area', label: 'Area' },
                { key: 'bar', label: 'Bar' }
              ].map((type) => (
                <button
                  key={type.key}
                  onClick={() => setChartType(type.key)}
                  className={`px-3 py-1 text-sm rounded ${
                    chartType === type.key
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Price Chart ({chartPeriod} - {chartType.charAt(0).toUpperCase() + chartType.slice(1)})
          </h3>
          {renderChart()}
        </div>
      </div>
    </div>
  );
};

export default StockDetail;