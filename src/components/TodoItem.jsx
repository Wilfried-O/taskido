import styles from './TodoItem.module.css';

function TodoItem({
    todo,
    toggleTodo,
    deleteTodo,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
}) {
    return (
        <li
            className={styles.todoItem}
            draggable
            onDragStart={e => handleDragStart(e, todo.id)}
            onDragOver={handleDragOver}
            onDragEnter={e => handleDragEnter(e, todo.id)}
            onDragLeave={handleDragLeave}
            onDrop={e => handleDrop(e, todo.id)}
            onDragEnd={handleDragEnd}
        >
            <input
                type="checkbox"
                className={styles.checkbox}
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
            />
            <span
                className={`${styles.text} ${todo.completed ? styles.completed : ''}`}
            >
                {todo.text}
            </span>
            <button
                className={styles.deleteButton}
                onClick={() => deleteTodo(todo.id)}
            >
                Delete
            </button>
        </li>
    );
}

export default TodoItem;
