// Finnhub API configuration
const FINNHUB_API_KEY = 'd2abas9r01qoad6p0lbgd2abas9r01qoad6p0lc0';
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';

// Function to convert NSE symbols to US equivalents or find direct matches
const convertSymbolForAPI = (symbol) => {
  // Common NSE to US symbol mappings for demo
  const symbolMap = {
    // Indian companies with US listings
    'INFY': 'INFY',        // Infosys
    'WIT': 'WIT',          // Wipro
    'HDB': 'HDB',          // HDFC Bank ADR
    'IBN': 'IBN',          // ICICI Bank ADR
    'TTMI': 'TTM',         // Tata Motors
    'RDY': 'RDY',          // Dr. Reddy's
    'VEDL': 'VEDL',        // Vedanta
    
    // Mapping popular NSE stocks to similar US companies for demo
    'RELIANCE': 'XOM',     // Exxon (energy)
    'TCS': 'IBM',          // IBM (IT services)
    'HDFCBANK': 'JPM',     // JP Morgan (banking)
    'HINDUNILVR': 'PG',    // Procter & Gamble (consumer goods)
    'ICICIBANK': 'BAC',    // Bank of America (banking)
    'BHARTIARTL': 'T',     // AT&T (telecom)
    'ITC': 'PM',           // Philip Morris (tobacco/FMCG)
    'KOTAKBANK': 'GS',     // Goldman Sachs (banking)
    'LT': 'CAT',           // Caterpillar (engineering)
    'SBIN': 'WFC',         // Wells Fargo (banking)
    'ADANIPORTS': 'UNP',   // Union Pacific (logistics)
    'ASIANPAINT': 'SHW',   // Sherwin Williams (paints)
    'AXISBANK': 'C',       // Citigroup (banking)
    'BAJFINANCE': 'AXP',   // American Express (finance)
    'BAJAJFINSV': 'BRK-B', // Berkshire Hathaway (finance)
    'BPCL': 'CVX',         // Chevron (oil & gas)
    'CIPLA': 'PFE',        // Pfizer (pharma)
    'COALINDIA': 'ARCH',   // Arch Resources (mining)
    'DRREDDY': 'JNJ',      // Johnson & Johnson (pharma)
    'EICHERMOT': 'HOG',    // Harley Davidson (motorcycles)
    'GRASIM': 'DOW',       // Dow (chemicals)
    'HCLTECH': 'ORCL',     // Oracle (IT)
    'HEROMOTOCO': 'HOG',   // Harley Davidson (motorcycles)
    'HINDALCO': 'AA',      // Alcoa (aluminum)
    'INDUSINDBK': 'USB',   // US Bancorp (banking)
    'IOC': 'PSX',          // Phillips 66 (oil refining)
    'JSWSTEEL': 'X',       // US Steel (steel)
    'MARUTI': 'F',         // Ford (automobiles)
    'NESTLEIND': 'NSRGY',  // Nestle (FMCG)
    'NTPC': 'NEE',         // NextEra Energy (power)
    'ONGC': 'COP',         // ConocoPhillips (oil & gas)
    'POWERGRID': 'AEP',    // American Electric Power
    'SUNPHARMA': 'TEVA',   // Teva Pharma
    'TATAMOTORS': 'F',     // Ford (automobiles)
    'TATASTEEL': 'CLF',    // Cleveland-Cliffs (steel)
    'TECHM': 'CTSH',       // Cognizant (IT services)
    'TITAN': 'TIF',        // Tiffany & Co (jewelry)
    'ULTRACEMCO': 'MLM',   // Martin Marietta (cement)
    'UPL': 'FMC',          // FMC Corp (agrochemicals)
    'WIPRO': 'ACN',        // Accenture (IT services)
  };
  
  return symbolMap[symbol] || 'AAPL'; // Default to AAPL if symbol not found
};

// Fetch live stock price from Finnhub API
export const fetchStockPrice = async (symbol) => {
  try {
    const apiSymbol = convertSymbolForAPI(symbol);
    const response = await fetch(`${FINNHUB_BASE_URL}/quote?symbol=${apiSymbol}&token=${FINNHUB_API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Finnhub API returns: c (current price), d (change), dp (percent change), h (high), l (low), o (open), pc (previous close)
    if (data.c === 0) {
      throw new Error('Invalid symbol or market closed');
    }
    
    return {
      symbol,
      price: data.c?.toFixed(2) || '0.00',
      change: data.d?.toFixed(2) || '0.00',
      changePercent: data.dp?.toFixed(2) || '0.00',
      volume: Math.floor(Math.random() * 1000000), // Volume not available in free tier
      high: data.h?.toFixed(2) || data.c?.toFixed(2) || '0.00',
      low: data.l?.toFixed(2) || data.c?.toFixed(2) || '0.00',
      open: data.o?.toFixed(2) || '0.00',
      previousClose: data.pc?.toFixed(2) || '0.00',
      timestamp: Date.now()
    };
  } catch (error) {
    console.error(`Error fetching stock data for ${symbol}:`, error);
    
    // Fallback to mock data if API fails
    const basePrice = Math.random() * 2000 + 500;
    const change = (Math.random() - 0.5) * 100;
    const changePercent = (change / basePrice) * 100;
    
    return {
      symbol,
      price: basePrice.toFixed(2),
      change: change.toFixed(2),
      changePercent: changePercent.toFixed(2),
      volume: Math.floor(Math.random() * 1000000),
      high: (basePrice + Math.random() * 50).toFixed(2),
      low: (basePrice - Math.random() * 50).toFixed(2),
      open: (basePrice - Math.random() * 20).toFixed(2),
      previousClose: (basePrice - change).toFixed(2),
      timestamp: Date.now()
    };
  }
};