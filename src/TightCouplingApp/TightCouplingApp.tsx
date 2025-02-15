import React from "react";
import "./TightTasks.css";
import { useFetchTask } from "./hooks/useFetchTask";

function TightCouplingApp() {
  return <ListTask />;
}

const ListTask = () => {
  const todo = useFetchTask("1");

  return (
    <div>
      <h1>Tight Tasks</h1>
      {!todo && <p>Loading...</p>}
      {todo && <li key={todo.id}>{todo.title}</li>}
    </div>
  );
};

export default TightCouplingApp;
