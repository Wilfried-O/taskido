// TodoForm.jsx
import { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.625rem 0.75rem;
  font-size: 1rem;

  color: var(--text-color);
  background-color: var(--input-bg-color);

  border: 1px solid var(--border-color);
  border-radius: 8px;

  caret-color: var(--primary-color);
  outline: none;

  transition: border-color 0.15s ease, box-shadow 0.15s ease,
    background-color 0.15s ease;

  &::placeholder {
    color: var(--placeholder-color);
  }

  &:hover {
    border-color: var(--border-strong-color);
    background-color: var(--subtle-color);
  }

  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--primary-color) 30%, transparent);
    /* If color-mix isn't supported in our targets, we use: 
       box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25); */
  }
`;

const Button = styled.button`
  padding: 0.625rem 1rem;
  font-size: 0.95rem;
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;

  background-color: var(--success-color);
  color: var(--on-primary-color);

  transition: background-color 0.15s ease, transform 0.05s ease,
    box-shadow 0.15s ease;

  &:hover {
    background-color: var(--success-hover);
  }

  &:active {
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--primary-color) 30%, transparent);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

function TodoForm({ addTodo }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (text) {
      addTodo(text);
      setInput("");
    }
  };

  return (
    <Form onSubmit={handleSubmit} aria-label="Add a todo">
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a todo"
        aria-label="Todo text"
      />
      <Button type="submit" disabled={!input.trim()}>
        Add
      </Button>
    </Form>
  );
}

export default TodoForm;
