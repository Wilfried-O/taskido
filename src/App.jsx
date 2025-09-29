import { useMemo, useState } from 'react';
import './App.css';
import Filter from './components/Filter';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
    const [todos, setTodos] = useLocalStorage('todos', []);
    const [filter, setFilter] = useState('all');

    const addTodo = (todo) => {
        setTodos([...todos, todo]);
    };
    
    const deleteTodo = (id) => {
        setTodos(todos.filter( todo => todo.id !== id ));
    };

    const toggleTodo = (id) => {
        setTodos(
            todos.map( todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const reorderTodos = (sourceID, targetID) => {
        if (sourceID === targetID) return todos;

        // Find indices
        const sourceIndex = todos.findIndex(todo => todo.id === sourceID);
        const targetIndex = todos.findIndex(todo => todo.id === targetID);

        // Create new (for immutability!) array with swapped items 
        const newTodos = [...todos];
        const [movedItem] = newTodos.splice(sourceIndex, 1);
        newTodos.splice(targetIndex, 0, movedItem);

        setTodos(newTodos);
    };

    // `useMemo` Hook to avoid recomputing it unnecessarily
    const filteredTodos = useMemo( () => 
        todos.filter(todo => {
            if (filter === 'active') return !todo.completed;
            if (filter === 'completed') return todo.completed;
            return true;
        }), 
        [todos, filter] // Dependencies: recompute only if these change
    );

    return (
        <div className="app-container">
            <h1 className="app-title">Taskido</h1>
            <TodoForm addTodo={addTodo} />
            <Filter filter={filter} setFilter={setFilter} />
            <TodoList 
                todos={filteredTodos}
                reorderTodos={reorderTodos}
                toggleTodo={toggleTodo} deleteTodo={deleteTodo}
            />
        </div>
    );
}

export default App;
