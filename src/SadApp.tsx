import React from "react";
import "./App.css";
import { useFetchTodos } from "./hooks/useFetchTodos";

export const ListTodo = () => {
  const todos = useFetchTodos();

  return (
    <div>
      <h1>Todos</h1>

      {todos.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>{todos?.map((todo) => <li key={todo.id}>{todo.title}</li>)}</ul>
      )}
    </div>
  );
};

function App() {
  return <ListTodo />;
}

export default App;
