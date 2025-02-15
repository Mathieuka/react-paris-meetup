import React from "react";
import "../App.css";
import { useFetchTodo } from "./hooks/useFetchTodo";

export const ListTodo = () => {
  const todo = useFetchTodo("1");

  return (
    <div>
      <h1>Todos</h1>
      {!todo && <p>Loading...</p>}
      {todo && <li key={todo.id}>{todo.title}</li>}
    </div>
  );
};

function TightTasks() {
  return <ListTodo />;
}

export default TightTasks;
