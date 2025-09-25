import { useState } from 'react';
import './App.css';
import Filter from './components/Filter';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');

    const addTodo = (todo) => {
        setTodos([...todos, todo]);
    };
    
    const toggleTodo = (id) => {
        setTodos(
            todos.map( todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter( todo => todo.id !== id ));
    };

    const filteredTodos = todos.filter( todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    return (
        <div className="app-container">
            <h1 className="app-title">Taskido</h1>
            <TodoForm addTodo={addTodo} />
            <Filter filter={filter} setFilter={setFilter} />
            <TodoList 
                todos={filteredTodos} 
                toggleTodo={toggleTodo} deleteTodo={deleteTodo}
            />
        </div>
    );
}

export default App;
