import styles from './UndoRedo.module.css';

function UndoRedo({ onUndo, onRedo, canUndo, canRedo }) {
    return (
        <div
            className={styles.group}
            role="group"
            aria-label="History controls"
        >
            <button
                type="button"
                className={styles.button}
                onClick={onUndo}
                disabled={!canUndo}
                title="undo"
                aria-disabled={!canUndo}
            >
                Undo
            </button>
            <button
                type="button"
                className={styles.button}
                onClick={onRedo}
                disabled={!canRedo}
                title="redo"
                aria-disabled={!canRedo}
            >
                Redo
            </button>
        </div>
    );
}

export default UndoRedo;
