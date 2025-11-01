import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import styles from './ThemeToggle.module.css';

function ThemeToggle() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    return (
        <button
            type="button"
            className={styles.toggle}
            onClick={toggleTheme}
            aria-pressed={isDark}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            <span className={styles.icon} aria-hidden="true">
                {isDark ? '🌙' : '☀️'}
            </span>
            <span className={styles.label}>{isDark ? 'Dark' : 'Light'}</span>
        </button>
    );
}

export default ThemeToggle;
