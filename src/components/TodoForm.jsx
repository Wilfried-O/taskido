import { useState } from "react";

function TodoForm({ addTodo }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            addTodo( {id: Date.now(), text: input, completed: false} );
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={ (e) => setInput(e.target.value) }
              placeholder="Add a todo"
            />
            <button type="submit">Add</button>
        </form>
    );
}

export default TodoForm;