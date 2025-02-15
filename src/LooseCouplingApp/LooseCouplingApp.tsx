import React from "react";
import { TaskApi } from "./api/implementation";
import "./LooseCouplingApp.css";
import { useFetchTask } from "./hooks/useFetchTask";
import TaskApiProvider from "./provider/TaskProvider";

function LooseCouplingApp() {
  return (
    <TaskApiProvider apiImplementation={new TaskApi()}>
      <LooseTask />
    </TaskApiProvider>
  );
}

export const LooseTask = () => {
  const task = useFetchTask("1");

  return (
    <div>
      <h1>Loose Tasks</h1>

      {!task && <p>Loading...</p>}
      {task && <li key={task.id}>{task.title}</li>}
    </div>
  );
};

export default LooseCouplingApp;
