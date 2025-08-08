// NSE to US symbol mappings for API calls
export const NSE_TO_US_SYMBOL_MAP = {
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

// Default symbol if mapping not found
export const DEFAULT_SYMBOL = 'AAPL';