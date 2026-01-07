"use client";

import { useState, useEffect } from "react";
import { DollarSign, TrendingUp, Calendar, Calculator as CalcIcon } from "lucide-react";
import styles from "../styles/Calculator.module.css";

export default function Calculator() {
    const [initial, setInitial] = useState(1000);
    const [monthly, setMonthly] = useState(500);
    const [rate, setRate] = useState(7);
    const [years, setYears] = useState(10);
    const [result, setResult] = useState(0);
    const [totalContrib, setTotalContrib] = useState(0);

    useEffect(() => {
        // Compound interest calculation:
        // FV = P * (1 + r/n)^(nt) + PMT * ((1 + r/n)^(nt) - 1) / (r/n)
        // Assuming monthly compounding (n=12)
        const r = rate / 100;
        const n = 12;
        const t = years;

        const futureValuePrincipal = initial * Math.pow(1 + r / n, n * t);
        const futureValueSeries = monthly * (Math.pow(1 + r / n, n * t) - 1) / (r / n);

        setResult(futureValuePrincipal + futureValueSeries);
        setTotalContrib(initial + (monthly * 12 * years));
    }, [initial, monthly, rate, years]);

    return (
        <div className={`glass-panel ${styles.container}`}>
            <div className={styles.header}>
                <CalcIcon size={20} className={styles.headerIcon} />
                <h3>Compound Calculator</h3>
            </div>

            <div className={styles.grid}>
                <div className={styles.field}>
                    <label>Initial Investment</label>
                    <div className={styles.inputWrapper}>
                        <DollarSign size={16} />
                        <input
                            type="number"
                            value={initial}
                            onChange={e => setInitial(Number(e.target.value))}
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <label>Monthly Contribution</label>
                    <div className={styles.inputWrapper}>
                        <DollarSign size={16} />
                        <input
                            type="number"
                            value={monthly}
                            onChange={e => setMonthly(Number(e.target.value))}
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <label>Annual Return (%)</label>
                    <div className={styles.inputWrapper}>
                        <TrendingUp size={16} />
                        <input
                            type="number"
                            value={rate}
                            onChange={e => setRate(Number(e.target.value))}
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <label>Years to Grow</label>
                    <div className={styles.inputWrapper}>
                        <Calendar size={16} />
                        <input
                            type="number"
                            value={years}
                            onChange={e => setYears(Number(e.target.value))}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.result}>
                <div className={styles.row}>
                    <span>Total Invested</span>
                    <span className={styles.valueSub}>${totalContrib.toLocaleString()}</span>
                </div>
                <div className={styles.row}>
                    <span>Interest Earned</span>
                    <span className={styles.valueSuccess}>+${(result - totalContrib).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className={styles.divider} />
                <div className={styles.totalRow}>
                    <span>Future Value</span>
                    <span className={styles.totalValue}>${result.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
            </div>
        </div>
    );
}
