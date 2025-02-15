import React from "react";
import "./TightTasks.css";
import { useFetchTodo } from "./hooks/useFetchTodo";

export const ListTodo = () => {
  const todo = useFetchTodo("1");

  return (
    <div>
      <h1>Tight Tasks</h1>
      {!todo && <p>Loading...</p>}
      {todo && <li key={todo.id}>{todo.title}</li>}
    </div>
  );
};

function TightTasks() {
  return <ListTodo />;
}

export default TightTasks;
