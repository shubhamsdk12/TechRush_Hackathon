import { useState, useEffect } from 'react';

export const useNseStocks = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNseStocks = async () => {
      try {
        // Try to load from nsestocks.json file if available
        if (window.fs && window.fs.readFile) {
          try {
            const response = await window.fs.readFile('nsestocks.json', { encoding: 'utf8' });
            const stocksData = JSON.parse(response);
            setStocks(stocksData);
            setLoading(false);
            return;
          } catch (fileError) {
            console.warn('Could not load nsestocks.json, using fallback data:', fileError);
          }
        }

        // Fallback to comprehensive NSE stock data
        const nseStocks = [
          // Nifty 50 Stocks
          { symbol: 'ADANIPORTS', name: 'Adani Ports and Special Economic Zone Limited', sector: 'Infrastructure' },
          { symbol: 'ASIANPAINT', name: 'Asian Paints Limited', sector: 'Consumer Goods' },
          { symbol: 'AXISBANK', name: 'Axis Bank Limited', sector: 'Banking' },
          { symbol: 'BAJAJ-AUTO', name: 'Bajaj Auto Limited', sector: 'Automotive' },
          { symbol: 'BAJFINANCE', name: 'Bajaj Finance Limited', sector: 'Financial Services' },
          { symbol: 'BAJAJFINSV', name: 'Bajaj Finserv Limited', sector: 'Financial Services' },
          { symbol: 'BPCL', name: 'Bharat Petroleum Corporation Limited', sector: 'Oil & Gas' },
          { symbol: 'BHARTIARTL', name: 'Bharti Airtel Limited', sector: 'Telecom' },
          { symbol: 'BRITANNIA', name: 'Britannia Industries Limited', sector: 'FMCG' },
          { symbol: 'CIPLA', name: 'Cipla Limited', sector: 'Pharmaceuticals' },
          { symbol: 'COALINDIA', name: 'Coal India Limited', sector: 'Mining' },
          { symbol: 'DIVISLAB', name: 'Divi\'s Laboratories Limited', sector: 'Pharmaceuticals' },
          { symbol: 'DRREDDY', name: 'Dr. Reddy\'s Laboratories Limited', sector: 'Pharmaceuticals' },
          { symbol: 'EICHERMOT', name: 'Eicher Motors Limited', sector: 'Automotive' },
          { symbol: 'GRASIM', name: 'Grasim Industries Limited', sector: 'Cement & Construction' },
          { symbol: 'HCLTECH', name: 'HCL Technologies Limited', sector: 'IT Services' },
          { symbol: 'HDFCBANK', name: 'HDFC Bank Limited', sector: 'Banking' },
          { symbol: 'HDFCLIFE', name: 'HDFC Life Insurance Company Limited', sector: 'Insurance' },
          { symbol: 'HEROMOTOCO', name: 'Hero MotoCorp Limited', sector: 'Automotive' },
          { symbol: 'HINDALCO', name: 'Hindalco Industries Limited', sector: 'Metals & Mining' },
          { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Limited', sector: 'FMCG' },
          { symbol: 'ICICIBANK', name: 'ICICI Bank Limited', sector: 'Banking' },
          { symbol: 'ITC', name: 'ITC Limited', sector: 'FMCG' },
          { symbol: 'INDUSINDBK', name: 'IndusInd Bank Limited', sector: 'Banking' },
          { symbol: 'INFY', name: 'Infosys Limited', sector: 'IT Services' },
          { symbol: 'IOC', name: 'Indian Oil Corporation Limited', sector: 'Oil & Gas' },
          { symbol: 'JSWSTEEL', name: 'JSW Steel Limited', sector: 'Metals & Mining' },
          { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank Limited', sector: 'Banking' },
          { symbol: 'LT', name: 'Larsen & Toubro Limited', sector: 'Engineering & Construction' },
          { symbol: 'M&M', name: 'Mahindra & Mahindra Limited', sector: 'Automotive' },
          { symbol: 'MARUTI', name: 'Maruti Suzuki India Limited', sector: 'Automotive' },
          { symbol: 'NESTLEIND', name: 'Nestle India Limited', sector: 'FMCG' },
          { symbol: 'NTPC', name: 'NTPC Limited', sector: 'Power' },
          { symbol: 'ONGC', name: 'Oil and Natural Gas Corporation Limited', sector: 'Oil & Gas' },
          { symbol: 'POWERGRID', name: 'Power Grid Corporation of India Limited', sector: 'Power' },
          { symbol: 'RELIANCE', name: 'Reliance Industries Limited', sector: 'Oil & Gas' },
          { symbol: 'SBILIFE', name: 'SBI Life Insurance Company Limited', sector: 'Insurance' },
          { symbol: 'SBIN', name: 'State Bank of India', sector: 'Banking' },
          { symbol: 'SUNPHARMA', name: 'Sun Pharmaceutical Industries Limited', sector: 'Pharmaceuticals' },
          { symbol: 'TCS', name: 'Tata Consultancy Services Limited', sector: 'IT Services' },
          { symbol: 'TATACONSUM', name: 'Tata Consumer Products Limited', sector: 'FMCG' },
          { symbol: 'TATAMOTORS', name: 'Tata Motors Limited', sector: 'Automotive' },
          { symbol: 'TATASTEEL', name: 'Tata Steel Limited', sector: 'Metals & Mining' },
          { symbol: 'TECHM', name: 'Tech Mahindra Limited', sector: 'IT Services' },
          { symbol: 'TITAN', name: 'Titan Company Limited', sector: 'Consumer Goods' },
          { symbol: 'ULTRACEMCO', name: 'UltraTech Cement Limited', sector: 'Cement & Construction' },
          { symbol: 'UPL', name: 'UPL Limited', sector: 'Agrochemicals' },
          { symbol: 'WIPRO', name: 'Wipro Limited', sector: 'IT Services' },
          
          // Additional Popular NSE Stocks
          { symbol: 'ADANIGREEN', name: 'Adani Green Energy Limited', sector: 'Power' },
          { symbol: 'ADANITRANS', name: 'Adani Transmission Limited', sector: 'Power' },
          { symbol: 'APOLLOHOSP', name: 'Apollo Hospitals Enterprise Limited', sector: 'Healthcare' },
          { symbol: 'BANDHANBNK', name: 'Bandhan Bank Limited', sector: 'Banking' },
          { symbol: 'BERGEPAINT', name: 'Berger Paints India Limited', sector: 'Consumer Goods' },
          { symbol: 'BIOCON', name: 'Biocon Limited', sector: 'Pharmaceuticals' },
          { symbol: 'BOSCHLTD', name: 'Bosch Limited', sector: 'Automotive' },
          { symbol: 'CADILAHC', name: 'Cadila Healthcare Limited', sector: 'Pharmaceuticals' },
          { symbol: 'CHOLAFIN', name: 'Cholamandalam Investment and Finance Company Limited', sector: 'Financial Services' },
          { symbol: 'COLPAL', name: 'Colgate Palmolive (India) Limited', sector: 'FMCG' },
          { symbol: 'DABUR', name: 'Dabur India Limited', sector: 'FMCG' },
          { symbol: 'GODREJCP', name: 'Godrej Consumer Products Limited', sector: 'FMCG' },
          { symbol: 'HAVELLS', name: 'Havells India Limited', sector: 'Consumer Goods' },
          { symbol: 'HDFC', name: 'Housing Development Finance Corporation Limited', sector: 'Financial Services' },
          { symbol: 'HDFCAMC', name: 'HDFC Asset Management Company Limited', sector: 'Financial Services' },
          { symbol: 'INDUSTOWER', name: 'Indus Towers Limited', sector: 'Telecom' },
          { symbol: 'LUPIN', name: 'Lupin Limited', sector: 'Pharmaceuticals' },
          { symbol: 'MARICO', name: 'Marico Limited', sector: 'FMCG' },
          { symbol: 'MOTHERSUMI', name: 'Motherson Sumi Systems Limited', sector: 'Automotive' },
          { symbol: 'MPHASIS', name: 'Mphasis Limited', sector: 'IT Services' },
          { symbol: 'MRF', name: 'MRF Limited', sector: 'Automotive' },
          { symbol: 'NAUKRI', name: 'Info Edge (India) Limited', sector: 'Internet & Software' },
          { symbol: 'PAGEIND', name: 'Page Industries Limited', sector: 'Textiles' },
          { symbol: 'PIDILITIND', name: 'Pidilite Industries Limited', sector: 'Chemicals' },
          { symbol: 'PNB', name: 'Punjab National Bank', sector: 'Banking' },
          { symbol: 'SAIL', name: 'Steel Authority of India Limited', sector: 'Metals & Mining' },
          { symbol: 'SHREECEM', name: 'Shree Cement Limited', sector: 'Cement & Construction' },
          { symbol: 'SIEMENS', name: 'Siemens Limited', sector: 'Industrial Manufacturing' },
          { symbol: 'TORNTPHARM', name: 'Torrent Pharmaceuticals Limited', sector: 'Pharmaceuticals' },
          { symbol: 'TVSMOTOR', name: 'TVS Motor Company Limited', sector: 'Automotive' },
          { symbol: 'VEDL', name: 'Vedanta Limited', sector: 'Metals & Mining' },
          { symbol: 'VOLTAS', name: 'Voltas Limited', sector: 'Consumer Goods' },
          { symbol: 'ZEEL', name: 'Zee Entertainment Enterprises Limited', sector: 'Media & Entertainment' }
        ];

        setStocks(nseStocks);
        setLoading(false);
      } catch (err) {
        console.error('Error loading NSE stocks:', err);
        setError('Failed to load NSE stock data');
        setLoading(false);
      }
    };

    loadNseStocks();
  }, []);

  // Filter stocks by sector
  const getStocksBySector = (sector) => {
    return stocks.filter(stock => stock.sector === sector);
  };

  // Get all unique sectors
  const getSectors = () => {
    return [...new Set(stocks.map(stock => stock.sector))].sort();
  };

  // Search stocks by symbol or name
  const searchStocks = (query) => {
    if (!query) return stocks;
    
    const searchTerm = query.toLowerCase();
    return stocks.filter(stock => 
      stock.symbol.toLowerCase().includes(searchTerm) ||
      stock.name.toLowerCase().includes(searchTerm) ||
      stock.sector.toLowerCase().includes(searchTerm)
    );
  };

  return {
    stocks,
    loading,
    error,
    getStocksBySector,
    getSectors,
    searchStocks
  };
};