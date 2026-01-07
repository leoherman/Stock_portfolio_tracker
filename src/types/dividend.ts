export interface Dividend {
    id: string;
    stockId?: string; // Optional if we want to allow ad-hoc dividends, but better to link
    symbol: string;
    amount: number;
    date: string; // ISO date string YYYY-MM-DD
}
