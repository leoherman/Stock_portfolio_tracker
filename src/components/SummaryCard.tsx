import { Stock } from "@/types/stock";
import { DollarSign, TrendingUp } from "lucide-react";
import styles from "./SummaryCard.module.css";

interface SummaryCardProps {
    stocks: Stock[];
}

export default function SummaryCard({ stocks }: SummaryCardProps) {
    const totalValue = stocks.reduce((sum, stock) => sum + stock.value, 0);

    const weightedYield = totalValue > 0
        ? stocks.reduce((sum, stock) => sum + (stock.value * stock.yield), 0) / totalValue
        : 0;

    return (
        <div className={`glass-panel ${styles.card}`}>
            <div className={styles.metric}>
                <div className={styles.iconWrapper}>
                    <DollarSign className={styles.icon} size={24} />
                </div>
                <div>
                    <p className={styles.label}>Total Portfolio Value</p>
                    <h2 className={styles.value}>${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.metric}>
                <div className={styles.iconWrapper} style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
                    <TrendingUp className={styles.icon} size={24} />
                </div>
                <div>
                    <p className={styles.label}>Weighted Avg. Yield</p>
                    <h2 className={styles.value} style={{ color: 'var(--success)' }}>
                        {weightedYield.toFixed(2)}%
                    </h2>
                </div>
            </div>
        </div>
    );
}
