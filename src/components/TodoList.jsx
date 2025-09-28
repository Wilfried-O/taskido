import { useState } from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, reorderTodos, toggleTodo, deleteTodo }) {
    // A variable for tracking the dragged item (id)
    const [draggedItem, setDraggedItem] = useState(null);

    const handleDragStart = (e, itemId) => {
        setDraggedItem(itemId);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', ''); // Required for Firefox
        e.currentTarget.style.opacity = '0.5';
    };

    const handleDragOver = (e) => {
        e.preventDefault(); //  Prevents default to allow drop
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDragEnter = (e, itemId) => {
        if (draggedItem === itemId) return;
        e.currentTarget.style.backgroundColor = 'lightblue';
    };

    const handleDragLeave = (e) => {
        e.currentTarget.style.backgroundColor = '';
    };

    // Handler for drop (reorders the list)
    const handleDrop = (e, dropItemId) => {
        e.preventDefault();
        if (draggedItem === dropItemId) return; // Don't drop on itself

        reorderTodos(draggedItem, dropItemId);
        
        setDraggedItem(null); // Clear dragged state
        e.currentTarget.style.backgroundColor = '';
    };


    // Handle drag end to clean up
    const handleDragEnd = (e) => {
        setDraggedItem(null);
        e.currentTarget.style.opacity = '1';
        e.dataTransfer.dropEffect = 'none';
    };

    return(
        <ul className="todoList" >
            {todos.map( (todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                    handleDragStart={handleDragStart}
                    handleDragOver={handleDragOver}
                    handleDragEnter={handleDragEnter}
                    handleDragLeave={handleDragLeave}
                    handleDrop={handleDrop}
                    handleDragEnd={handleDragEnd}
                />
            ))}
        </ul>
    );
}

export default TodoList;
