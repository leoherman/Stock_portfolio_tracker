"use client";

import { useState } from "react";
import { X, Delete } from "lucide-react";
import styles from "./BasicCalculator.module.css";

interface BasicCalculatorProps {
    onClose: () => void;
}

export default function BasicCalculator({ onClose }: BasicCalculatorProps) {
    const [display, setDisplay] = useState("0");
    const [equation, setEquation] = useState("");
    const [isNewNumber, setIsNewNumber] = useState(true);

    const handleNumber = (num: string) => {
        if (isNewNumber) {
            setDisplay(num);
            setIsNewNumber(false);
        } else {
            setDisplay(display === "0" ? num : display + num);
        }
    };

    const handleOperator = (op: string) => {
        setEquation(display + " " + op + " ");
        setIsNewNumber(true);
    };

    const handleEqual = () => {
        if (!equation) return;

        const fullEq = equation + display;
        try {
            // eslint-disable-next-line no-eval
            const result = eval(fullEq.replace('×', '*').replace('÷', '/'));
            setDisplay(String(result));
            setEquation("");
            setIsNewNumber(true);
        } catch {
            setDisplay("Error");
            setEquation("");
            setIsNewNumber(true);
        }
    };

    const handleClear = () => {
        setDisplay("0");
        setEquation("");
        setIsNewNumber(true);
    };

    const handleDelete = () => {
        if (display.length > 1) {
            setDisplay(prev => prev.slice(0, -1));
        } else {
            setDisplay("0");
            setIsNewNumber(true);
        }
    };

    const buttons = [
        { label: "C", onClick: handleClear, type: "secondary" },
        { label: "⌫", onClick: handleDelete, type: "secondary" }, // Backspace
        { label: "%", onClick: () => handleOperator("%"), type: "secondary" },
        { label: "÷", onClick: () => handleOperator("/"), type: "accent" },
        { label: "7", onClick: () => handleNumber("7") },
        { label: "8", onClick: () => handleNumber("8") },
        { label: "9", onClick: () => handleNumber("9") },
        { label: "×", onClick: () => handleOperator("*"), type: "accent" },
        { label: "4", onClick: () => handleNumber("4") },
        { label: "5", onClick: () => handleNumber("5") },
        { label: "6", onClick: () => handleNumber("6") },
        { label: "-", onClick: () => handleOperator("-"), type: "accent" },
        { label: "1", onClick: () => handleNumber("1") },
        { label: "2", onClick: () => handleNumber("2") },
        { label: "3", onClick: () => handleNumber("3") },
        { label: "+", onClick: () => handleOperator("+"), type: "accent" },
        { label: "0", onClick: () => handleNumber("0"), width: 2 },
        { label: ".", onClick: () => handleNumber(".") },
        { label: "=", onClick: handleEqual, type: "primary" },
    ];

    return (
        <div className={`glass-panel ${styles.container}`}>
            <div className={styles.header}>
                <h3>Calculator</h3>
                <button onClick={onClose} className={styles.closeBtn}>
                    <X size={18} />
                </button>
            </div>

            <div className={styles.displayArea}>
                <div className={styles.equation}>{equation}</div>
                <div className={styles.display}>{display}</div>
            </div>

            <div className={styles.keypad}>
                {buttons.map((btn, i) => (
                    <button
                        key={i}
                        onClick={btn.onClick}
                        className={`${styles.btn} ${styles[btn.type || 'default']}`}
                        style={btn.width ? { gridColumn: `span ${btn.width}` } : {}}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
