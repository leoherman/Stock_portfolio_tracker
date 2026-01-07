"use client";

import { useState, useEffect } from "react";
import { Stock } from "@/types/stock";
import { Dividend } from "@/types/dividend";
import AddStockForm from "./AddStockForm";
import StockList from "./StockList";
import SummaryCard from "./SummaryCard";
import PortfolioPieChart from "./PortfolioPieChart";
import AddDividendForm from "./AddDividendForm";
import DividendList from "./DividendList";
import Tabs from "./Tabs";
import Calculator from "./Calculator";
import BasicCalculator from "./BasicCalculator";
import { Calculator as CalcIcon } from "lucide-react";
import styles from "./PortfolioTracker.module.css";

export default function PortfolioTracker() {
    const [activeTab, setActiveTab] = useState("portfolio");
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [dividends, setDividends] = useState<Dividend[]>([]);

    // Edit state
    const [editingStock, setEditingStock] = useState<Stock | null>(null);
    const [editingDividend, setEditingDividend] = useState<Dividend | null>(null);

    // UI state
    const [showBasicCalc, setShowBasicCalc] = useState(false);

    const [mounted, setMounted] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        const savedStocks = localStorage.getItem("portfolio_stocks");
        const savedDividends = localStorage.getItem("portfolio_dividends");

        if (savedStocks) {
            try {
                setStocks(JSON.parse(savedStocks));
            } catch (e) {
                console.error("Failed to parse stock data", e);
            }
        }

        if (savedDividends) {
            try {
                setDividends(JSON.parse(savedDividends));
            } catch (e) {
                console.error("Failed to parse dividend data", e);
            }
        }
        setMounted(true);
    }, []);

    // Save to local storage on change
    useEffect(() => {
        if (mounted) {
            localStorage.setItem("portfolio_stocks", JSON.stringify(stocks));
            localStorage.setItem("portfolio_dividends", JSON.stringify(dividends));
        }
    }, [stocks, dividends, activeTab, mounted]);

    const handleAddStock = (newStock: Stock) => {
        setStocks(prev => [newStock, ...prev]);
    };

    const handleUpdateStock = (updatedStock: Stock) => {
        setStocks(prev => prev.map(s => s.id === updatedStock.id ? updatedStock : s));
        setEditingStock(null);
    };

    const handleDeleteStock = (id: string) => {
        setStocks(prev => prev.filter(stock => stock.id !== id));
        if (editingStock?.id === id) setEditingStock(null);
    };

    const handleAddDividend = (newDividend: Dividend) => {
        setDividends(prev => [newDividend, ...prev]);
    };

    const handleUpdateDividend = (updatedDividend: Dividend) => {
        setDividends(prev => prev.map(d => d.id === updatedDividend.id ? updatedDividend : d));
        setEditingDividend(null);
    };

    const handleDeleteDividend = (id: string) => {
        setDividends(prev => prev.filter(div => div.id !== id));
        if (editingDividend?.id === id) setEditingDividend(null);
    };

    if (!mounted) return null; // or loading skeleton

    return (
        <div className="container" style={{ paddingTop: '48px', paddingBottom: '48px' }}>
            <header style={{ marginBottom: '40px', textAlign: 'center', position: 'relative' }}>
                <h1 className="text-gradient" style={{ fontSize: '48px', fontWeight: '800', marginBottom: '8px' }}>
                    Portfolio Tracker
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>
                    Track your yields and compound growth.
                </p>
                <div style={{ position: 'absolute', top: 0, right: 0 }}>
                    <button
                        onClick={() => setShowBasicCalc(!showBasicCalc)}
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--glass-border)',
                            padding: '10px',
                            borderRadius: '12px',
                            color: showBasicCalc ? 'var(--primary)' : 'var(--text-secondary)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.2s'
                        }}
                    >
                        <CalcIcon size={20} />
                        <span style={{ fontSize: '14px', fontWeight: 500 }}>Calc</span>
                    </button>
                </div>
            </header>

            <Tabs
                tabs={[
                    { label: "Portfolio", value: "portfolio" },
                    { label: "Dividends", value: "dividends" }
                ]}
                activeTab={activeTab}
                onChange={setActiveTab}
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: '40px', alignItems: 'start' }}>
                <div style={{ minWidth: 0 }}>
                    {activeTab === 'portfolio' && (
                        <div className="animate-enter">
                            <SummaryCard stocks={stocks} />

                            <div className={styles.splitGrid}>
                                <div>
                                    <AddStockForm
                                        onAdd={handleAddStock}
                                        editingStock={editingStock}
                                        onUpdate={handleUpdateStock}
                                        onCancel={() => setEditingStock(null)}
                                    />
                                    <div style={{ marginTop: '32px', height: '400px' }}>
                                        <PortfolioPieChart stocks={stocks} />
                                    </div>
                                </div>

                                <div>
                                    <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: 'var(--text-primary)' }}>
                                        Your Assets
                                    </h3>
                                    <StockList
                                        stocks={stocks}
                                        onDelete={handleDeleteStock}
                                        onEdit={setEditingStock}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'dividends' && (
                        <div className="animate-enter" style={{ maxWidth: '800px', margin: '0 auto' }}>
                            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
                                <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)' }}>
                                    Dividend Log
                                </h2>
                                <p style={{ color: 'var(--text-secondary)' }}>Record your passive income.</p>
                            </div>

                            <AddDividendForm
                                stocks={stocks}
                                onAdd={handleAddDividend}
                                editingDividend={editingDividend}
                                onUpdate={handleUpdateDividend}
                                onCancel={() => setEditingDividend(null)}
                            />

                            <div style={{ marginTop: '32px' }}>
                                <DividendList
                                    dividends={dividends}
                                    onDelete={handleDeleteDividend}
                                    onEdit={setEditingDividend}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="animate-enter" style={{ position: 'sticky', top: '24px' }}>
                    <Calculator />
                </div>
            </div>

            {showBasicCalc && <BasicCalculator onClose={() => setShowBasicCalc(false)} />}
        </div>
    );
}
