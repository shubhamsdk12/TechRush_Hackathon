// Generate mock historical data with different time periods
export const generateHistoricalData = (currentPrice, period = '1D') => {
  const data = [];
  const basePrice = parseFloat(currentPrice);
  let intervals, timeFormat, labelFormat;
  
  switch (period) {
    case '1D':
      intervals = 30;
      timeFormat = (i) => new Date(Date.now() - i * 5 * 60 * 1000);
      labelFormat = (date) => date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
      break;
    case '1W':
      intervals = 7;
      timeFormat = (i) => new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      labelFormat = (date) => date.toLocaleDateString('en-US', { weekday: 'short' });
      break;
    case '1M':
      intervals = 30;
      timeFormat = (i) => new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      labelFormat = (date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      break;
    case '3M':
      intervals = 90;
      timeFormat = (i) => new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      labelFormat = (date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      break;
    default:
      intervals = 30;
      timeFormat = (i) => new Date(Date.now() - i * 5 * 60 * 1000);
      labelFormat = (date) => date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
  }
  
  for (let i = intervals - 1; i >= 0; i--) {
    const date = timeFormat(i);
    const variation = (Math.random() - 0.5) * basePrice * (period === '1D' ? 0.02 : 0.05);
    data.push({
      time: labelFormat(date),
      price: parseFloat((basePrice + variation).toFixed(2)),
      volume: Math.floor(Math.random() * 1000000) + 500000
    });
  }
  
  return data;
};