import { useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
    const [todos, setTodos] = useState([]);

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
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <div className="app-container">
            <h1>Taskido</h1>
            <TodoForm addTodo={addTodo} />
            <TodoList 
                todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}
            />
        </div>
    );
}

export default App;
