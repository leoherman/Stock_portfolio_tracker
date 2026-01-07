import { Stock } from "@/types/stock";
import { Trash2, Edit2 } from "lucide-react";
import styles from "./StockList.module.css";

interface StockListProps {
    stocks: Stock[];
    onDelete: (id: string) => void;
    onEdit: (stock: Stock) => void;
}

export default function StockList({ stocks, onDelete, onEdit }: StockListProps) {
    if (stocks.length === 0) {
        return (
            <div className={`glass-panel ${styles.emptyState}`}>
                <p>No stocks added yet. Start by adding an asset above.</p>
            </div>
        );
    }

    return (
        <div className={styles.list}>
            <div className={styles.header}>
                <span>Asset</span>
                <span>Value</span>
                <span>Yield</span>
                <span>Dividend Return Annually</span>
                <span className={styles.actionHeader}></span>
            </div>

            {stocks.map((stock) => (
                <div key={stock.id} className={`${styles.item} animate-enter`}>
                    <div className={styles.colSymbol}>
                        <span className={styles.symbol}>{stock.symbol}</span>
                    </div>

                    <div className={styles.colValue}>
                        ${stock.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>

                    <div className={styles.colYield}>
                        <span className={styles.badge}>{stock.yield.toFixed(2)}%</span>
                    </div>

                    <div className={styles.colYieldVal}>
                        ${((stock.value * stock.yield) / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>

                    <div className={styles.colAction} style={{ display: 'flex', gap: '8px' }}>
                        <button
                            onClick={() => onEdit(stock)}
                            className={styles.deleteButton}
                            aria-label="Edit stock"
                            style={{ color: 'var(--primary)' }}
                        >
                            <Edit2 size={16} />
                        </button>
                        <button
                            onClick={() => onDelete(stock.id)}
                            className={styles.deleteButton}
                            aria-label="Delete stock"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
