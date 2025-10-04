import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Filter from "./components/Filter";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

import useLocalStorage from "./hooks/useLocalStorage";
import useHistory from "./lib/useHistory";
import UndoRedo from "./components/UndoRedo";

const MAX_HISTORY = 50;

function App() {
  // only stores the current todo-list snapshot
  const [storedTodos, setStoredTodos] = useLocalStorage("todos", []);
  const [filter, setFilter] = useState("all");

  // History is the in-memory source of truth, seeded from localStorage
  const {
    value: todos,
    set: setTodos,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useHistory(storedTodos, { max: MAX_HISTORY });

  // if `crypto` is not supported or available,
  // ID = timestamp of current time with some ramdomness
  const generateId = () =>
    crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

  // Persist current snapshot whenever it changes:
  // `setStoredTodos` is harmlessly included as dependency due to ESLint
  useEffect(() => {
    setStoredTodos(todos);
  }, [todos, setStoredTodos]);

  const addTodo = (todoText) => {
    setTodos((current) => [
      ...current,
      { id: generateId(), text: todoText, completed: false },
    ]);
  };

  const deleteTodo = (id) => {
    setTodos((current) => current.filter((t) => t.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos((current) =>
      current.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const reorderTodos = (sourceID, targetID) => {
    if (sourceID === targetID) return;
    setTodos((current) => {
      const sourceIndex = current.findIndex((t) => t.id === sourceID);
      const targetIndex = current.findIndex((t) => t.id === targetID);

      const next = [...current];
      const [moved] = next.splice(sourceIndex, 1);
      next.splice(targetIndex, 0, moved);
      return next;
    });
  };

  // `useMemo` Hook to avoid recomputing it unnecessarily
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    });
  }, [todos, filter]);

  return (
    <div className="app-container">
      <h1 className="app-title">Taskido</h1>

      <TodoForm addTodo={addTodo} />

      <Filter filter={filter} setFilter={setFilter} />

      <UndoRedo
        onUndo={undo}
        onRedo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      <TodoList
        todos={filteredTodos}
        reorderTodos={reorderTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
