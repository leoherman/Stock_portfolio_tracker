import { Dividend } from "@/types/dividend";
import { Trash2, Edit2 } from "lucide-react";
import styles from "./StockList.module.css"; // Reuse existing list styles

interface DividendListProps {
    dividends: Dividend[];
    onDelete: (id: string) => void;
    onEdit: (dividend: Dividend) => void;
}

export default function DividendList({ dividends, onDelete, onEdit }: DividendListProps) {
    if (dividends.length === 0) {
        return (
            <div className={`glass-panel ${styles.emptyState}`}>
                <p>No dividends logged yet.</p>
            </div>
        );
    }

    // Sort by date desc
    const sortedDividends = [...dividends].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className={styles.list}>
            <div className={styles.header} style={{ gridTemplateColumns: '1fr 1fr 1fr 48px' }}>
                <span>Date</span>
                <span>Symbol</span>
                <span>Amount</span>
                <span className={styles.actionHeader}></span>
            </div>

            {sortedDividends.map((div) => (
                <div key={div.id} className={`${styles.item} animate-enter`} style={{ gridTemplateColumns: '1fr 1fr 1fr 48px' }}>
                    <div className={styles.colValue} style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                        {new Date(div.date).toLocaleDateString()}
                    </div>

                    <div className={styles.colSymbol}>
                        <span className={styles.symbol}>{div.symbol}</span>
                    </div>

                    <div className={styles.colYieldVal}>
                        +${div.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>

                    <div className={styles.colAction} style={{ display: 'flex', gap: '8px' }}>
                        <button
                            onClick={() => onEdit(div)}
                            className={styles.deleteButton}
                            aria-label="Edit dividend"
                            style={{ color: 'var(--primary)' }}
                        >
                            <Edit2 size={16} />
                        </button>
                        <button
                            onClick={() => onDelete(div.id)}
                            className={styles.deleteButton}
                            aria-label="Delete dividend"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
