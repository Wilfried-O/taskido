import styles from './TodoItem.module.css';

function TodoItem({ todo, toggleTodo, deleteTodo }) {
    return (
        <li className={styles.todoItem}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={todo.completed}
              onChange={ () => toggleTodo(todo.id) }
            />
            <span className={ `${styles.text} ${todo.completed ? styles.completed : ''}` }>
              {todo.text}
            </span>
            <button 
              className={styles.deleteButton} 
              onClick={ () => deleteTodo(todo.id) }>Delete</button>
        </li>
        
    );
}

export default TodoItem;