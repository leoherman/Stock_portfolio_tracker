"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Stock } from "@/types/stock";
import styles from "../styles/PortfolioPieChart.module.css";

interface PortfolioPieChartProps {
    stocks: Stock[];
}

const COLORS = [
    "#6366f1", // Indigo
    "#8b5cf6", // Violet
    "#ec4899", // Pink
    "#10b981", // Emerald
    "#f59e0b", // Amber
    "#0ea5e9", // Sky
    "#ffffff", // White
    "#a1a1aa", // Zinc
];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className={styles.tooltip}>
                <p className={styles.tooltipLabel}>{data.symbol}</p>
                <p className={styles.tooltipValue}>
                    ${data.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
                <p className={styles.tooltipPercent}>
                    {((data.value / data.total) * 100).toFixed(1)}%
                </p>
            </div>
        );
    }
    return null;
};

export default function PortfolioPieChart({ stocks }: PortfolioPieChartProps) {
    const totalValue = stocks.reduce((sum, stock) => sum + stock.value, 0);

    const data = stocks.map(stock => ({
        ...stock,
        total: totalValue
    }));

    if (stocks.length === 0) {
        return (
            <div className={`glass-panel ${styles.emptyContainer}`}>
                <div className={styles.emptyCircle} />
                <p className={styles.emptyText}>Add assets to see breakdown</p>
            </div>
        );
    }

    return (
        <div className={`glass-panel ${styles.container}`}>
            <h3 className={styles.title}>Allocation</h3>
            <div className={styles.chartWrapper}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center Text */}
                <div className={styles.centerText}>
                    <span className={styles.centerLabel}>Total</span>
                    <span className={styles.centerValue}>
                        ${(totalValue / 1000).toFixed(1)}k
                    </span>
                </div>
            </div>

            {/* Legend */}
            <div className={styles.legend}>
                {data.slice(0, 4).map((entry, index) => (
                    <div key={entry.id} className={styles.legendItem}>
                        <div
                            className={styles.legendDot}
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className={styles.legendSymbol}>{entry.symbol}</span>
                        <span className={styles.legendPercent}>
                            {((entry.value / totalValue) * 100).toFixed(0)}%
                        </span>
                    </div>
                ))}
                {data.length > 4 && (
                    <div className={styles.legendItem}>
                        <span className={styles.legendMore}>+ {data.length - 4} more</span>
                    </div>
                )}
            </div>
        </div>
    );
}
