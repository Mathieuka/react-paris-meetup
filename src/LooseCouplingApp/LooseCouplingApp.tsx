import React from "react";
import TaskApiProvider from "./provider/TodoProvider";
import { TaskApi } from "./api/implementation";
import "./LooseCouplingApp.css";
import { useFetchTask } from "./hooks/useFetchTask";

function LooseCouplingApp() {
  return (
    <TaskApiProvider apiImplementation={new TaskApi()}>
      <LooseTask />
    </TaskApiProvider>
  );
}

export const LooseTask = () => {
  const todo = useFetchTask("1");

  return (
    <div>
      <h1>Loose Tasks</h1>

      {!todo && <p>Loading...</p>}
      {todo && <li key={todo.id}>{todo.title}</li>}
    </div>
  );
};

export default LooseCouplingApp;
