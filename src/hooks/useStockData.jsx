import { useNseStocks } from './useNseStocks';

export const useStockData = () => {
  // Use the specialized NSE stocks hook
  return useNseStocks();
};