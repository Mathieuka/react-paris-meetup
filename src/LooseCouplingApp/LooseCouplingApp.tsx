import React from "react";
import { TaskApi } from "./api/task";
import "./LooseCouplingApp.css";
import { useFetchTask } from "./hooks/useFetchTask";
import TaskApiProvider from "./provider/TaskProvider";
import { S3Storage } from "./api/storage";

function LooseCouplingApp() {
  return (
    <TaskApiProvider
      apiImplementation={new TaskApi()}
      storageImplementation={new S3Storage()}
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
