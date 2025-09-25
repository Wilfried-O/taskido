import TodoItem from './TodoItem';

function TodoList({ todos, toggleTodo, deleteTodo}) {
    return(
        <ul className="todoList">
            {todos.map( (todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                />
            ))}
        </ul>
    );
}

export default TodoList;