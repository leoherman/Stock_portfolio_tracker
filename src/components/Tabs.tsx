// Removed framer-motion import 
// System prompt says "Avoid using TailwindCSS". I have Vanilla CSS. I can do simple CSS transitions. 
// However, framer-motion is great for "rich aesthetics".
// I'll stick to CSS for simplicity unless I want to install another package. The user asked for "modern design", framer-motion is good for that.
// Let's stick to CSS for now to avoid swelling dependencies too much, I can make it very smooth with CSS.

import styles from "./Tabs.module.css";

interface Tab {
    label: string;
    value: string;
}

interface TabsProps {
    tabs: Tab[];
    activeTab: string;
    onChange: (value: string) => void;
}

export default function Tabs({ tabs, activeTab, onChange }: TabsProps) {
    return (
        <div className={`glass-panel ${styles.container}`}>
            {tabs.map((tab) => (
                <button
                    key={tab.value}
                    onClick={() => onChange(tab.value)}
                    className={`${styles.tab} ${activeTab === tab.value ? styles.active : ''}`}
                >
                    {activeTab === tab.value && (
                        <div className={styles.activeBackground} />
                    )}
                    <span className={styles.label}>{tab.label}</span>
                </button>
            ))}
        </div>
    );
}
