export interface Stock {
  id: string;
  symbol: string;
  value: number; // Investment amount in dollars
  yield: number; // Percentage yield (e.g., 5.5 for 5.5%)
}
