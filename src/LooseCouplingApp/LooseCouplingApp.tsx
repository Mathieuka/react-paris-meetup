import React from "react";
import { TaskApiService } from "./api/task";
import "./LooseCouplingApp.css";
import { useFetchTask } from "./hooks/useFetchTask";
import TaskApiProvider from "./provider/TaskProvider";
import { S3StorageService } from "./api/storage";

function LooseCouplingApp() {
  return (
    <TaskApiProvider
      apiImplementation={new TaskApiService()}
      storageImplementation={new S3StorageService()}
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
