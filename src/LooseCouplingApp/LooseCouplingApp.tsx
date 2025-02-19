import React from "react";

import "./LooseCouplingApp.css";
import { useFetchTask } from "./hooks/useFetchTask";
import TaskApiProvider from "./provider/TaskProvider";
import { ProductionTaskService } from "./services/task";
import { LocalStorageService } from "./services/storage";

function LooseCouplingApp() {
  return (
    <TaskApiProvider
      taskImplementation={new ProductionTaskService()}
      storageImplementation={new LocalStorageService()}
    >
      <Task />
    </TaskApiProvider>
  );
}

export const Task = () => {
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
