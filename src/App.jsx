import { useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';

function App() {
    const [todos, setTodos] = useState([]);

    const addTodo = (todo) => {
        setTodos([...todos, todo]);
    };
    // to view *todos*, you can print to the console: uncomment next line
    // console.log(todos);

    return (
        <div className="app-container">
            <h1>Taskido</h1>
            <TodoForm addTodo={addTodo} />
        </div>
    );
}

export default App;
