import { useState, useEffect } from "react";
import { Plus, Percent, DollarSign, Type, Save, X } from "lucide-react";
import styles from "../styles/AddStockForm.module.css";
import { Stock } from "@/types/stock";

// Generate ID helper
const generateId = () => typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();

interface AddStockFormProps {
    onAdd: (stock: Stock) => void;
    // Edit props
    editingStock?: Stock | null;
    onUpdate?: (stock: Stock) => void;
    onCancel?: () => void;
}

export default function AddStockForm({ onAdd, editingStock, onUpdate, onCancel }: AddStockFormProps) {
    const [symbol, setSymbol] = useState("");
    const [value, setValue] = useState("");
    const [yieldRate, setYieldRate] = useState("");

    // Populate form when editing
    useEffect(() => {
        if (editingStock) {
            setSymbol(editingStock.symbol);
            setValue(editingStock.value.toString());
            setYieldRate(editingStock.yield.toString());
        } else {
            setSymbol("");
            setValue("");
            setYieldRate("");
        }
    }, [editingStock]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!symbol || !value || !yieldRate) return;

        if (editingStock && onUpdate) {
            onUpdate({
                ...editingStock,
                symbol: symbol.toUpperCase(),
                value: parseFloat(value),
                yield: parseFloat(yieldRate),
            });
        } else {
            onAdd({
                id: generateId(),
                symbol: symbol.toUpperCase(),
                value: parseFloat(value),
                yield: parseFloat(yieldRate),
            });
        }

        if (!editingStock) {
            setSymbol("");
            setValue("");
            setYieldRate("");
        }
    };

    const isEditing = !!editingStock;

    return (
        <form onSubmit={handleSubmit} className={`glass-panel ${styles.form}`}>
            <h3 className={styles.title}>{isEditing ? 'Edit Asset' : 'Add Asset'}</h3>

            <div className={styles.grid}>
                <div className={styles.field}>
                    <label htmlFor="symbol" className={styles.label}>Symbol</label>
                    <div className={styles.inputWrapper}>
                        <Type size={18} className={styles.icon} />
                        <input
                            id="symbol"
                            type="text"
                            value={symbol}
                            onChange={(e) => setSymbol(e.target.value)}
                            placeholder="AAPL"
                            className={styles.input}
                            required
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <label htmlFor="value" className={styles.label}>Investment Value</label>
                    <div className={styles.inputWrapper}>
                        <DollarSign size={18} className={styles.icon} />
                        <input
                            id="value"
                            type="number"
                            step="0.01"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="1000.00"
                            className={styles.input}
                            required
                        />
                    </div>
                </div>

                <div className={styles.field}>
                    <label htmlFor="yield" className={styles.label}>Annual Yield (%)</label>
                    <div className={styles.inputWrapper}>
                        <Percent size={18} className={styles.icon} />
                        <input
                            id="yield"
                            type="number"
                            step="0.01"
                            value={yieldRate}
                            onChange={(e) => setYieldRate(e.target.value)}
                            placeholder="5.5"
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
                        <button type="submit" className={styles.button}>
                            {isEditing ? <Save size={20} /> : <Plus size={20} />}
                            {isEditing ? 'Update' : 'Add Stock'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
