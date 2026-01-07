import { useState, useEffect } from "react";
import { Plus, Calendar, DollarSign, Type, Save, X } from "lucide-react";
import styles from "./AddStockForm.module.css"; // Reuse existing form styles for consistency
import { Dividend } from "@/types/dividend";
import { Stock } from "@/types/stock";

// Generate ID helper
const generateId = () => typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();

interface AddDividendFormProps {
    stocks: Stock[];
    onAdd: (dividend: Dividend) => void;
    // Edit props
    editingDividend?: Dividend | null;
    onUpdate?: (dividend: Dividend) => void;
    onCancel?: () => void;
}

export default function AddDividendForm({ stocks, onAdd, editingDividend, onUpdate, onCancel }: AddDividendFormProps) {
    const [symbol, setSymbol] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    // Populate form when editing
    useEffect(() => {
        if (editingDividend) {
            setSymbol(editingDividend.symbol);
            setAmount(editingDividend.amount.toString());
            setDate(editingDividend.date);
        } else {
            setSymbol("");
            setAmount("");
            setDate(new Date().toISOString().split('T')[0]);
        }
    }, [editingDividend]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!symbol || !amount || !date) return;

        if (editingDividend && onUpdate) {
            onUpdate({
                ...editingDividend,
                symbol: symbol.toUpperCase(),
                amount: parseFloat(amount),
                date,
                stockId: stocks.find(s => s.symbol === symbol.toUpperCase())?.id
            });
        } else {
            onAdd({
                id: generateId(),
                symbol: symbol.toUpperCase(),
                amount: parseFloat(amount),
                date,
                stockId: stocks.find(s => s.symbol === symbol.toUpperCase())?.id
            });
        }

        if (!editingDividend) {
            setSymbol("");
            setAmount("");
            setDate(new Date().toISOString().split('T')[0]);
        }
    };

    const isEditing = !!editingDividend;

    return (
        <form onSubmit={handleSubmit} className={`glass-panel ${styles.form}`}>
            <h3 className={styles.title}>{isEditing ? 'Edit Dividend' : 'Log Dividend'}</h3>

            <div className={styles.grid}>
                <div className={styles.field}>
                    <label htmlFor="div-symbol" className={styles.label}>Symbol</label>
                    <div className={styles.inputWrapper}>
                        <Type size={18} className={styles.icon} />
                        <input
                            id="div-symbol"
                            list="stock-symbols"
                            type="text"
                            value={symbol}
                            onChange={(e) => setSymbol(e.target.value)}
                            placeholder="AAPL"
                            className={styles.input}
                            required
                        />
                        <datalist id="stock-symbols">
                            {stocks.map(s => (
                                <option key={s.id} value={s.symbol} />
                            ))}
                        </datalist>
                    </div>
                </div>

                <div className={styles.field}>
                    <label htmlFor="div-amount" className={styles.label}>Amount Received</label>
                    <div className={styles.inputWrapper}>
                        <DollarSign size={18} className={styles.icon} />
                        <input
                            id="div-amount"
                            type="number"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className={styles.input}
                            required
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <label htmlFor="div-date" className={styles.label}>Date</label>
                    <div className={styles.inputWrapper}>
                        <Calendar size={18} className={styles.icon} />
                        <input
                            id="div-date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>
                </div>

                <div className={styles.action}>
                    <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                        {isEditing && (
                            <button
                                type="button"
                                onClick={onCancel}
                                className={styles.button}
                                style={{ background: 'transparent', border: '1px solid var(--glass-border)', boxShadow: 'none' }}
                            >
                                <X size={20} />
                                Cancel
                            </button>
                        )}
                        <button type="submit" className={styles.button} style={{ background: isEditing ? undefined : 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                            {isEditing ? <Save size={20} /> : <Plus size={20} />}
                            {isEditing ? 'Update' : 'Log Dividend'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
