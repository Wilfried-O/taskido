import styles from './Filter.module.css';

function Filter({ filter, setFilter}) {
    return (
        <div className={styles.filterBar} >
            <button
              className={`${styles.button} ${filter === 'all' ? styles.active : ''}`}
              onClick={() => setFilter('all')}
            >
                All
            </button>
            <button
              className={`${styles.button} ${filter === 'active' ? styles.active : ''}`}
              onClick={() => setFilter('active')}
            >
                Active
            </button>
            <button
              className={`${styles.button} ${filter === 'completed' ? styles.active : ''}`}
              onClick={() => setFilter('completed')}
            >
                Completed
            </button>
        </div>
    );
}

export default Filter;