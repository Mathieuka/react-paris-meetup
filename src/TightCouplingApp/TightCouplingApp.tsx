import React from "react";
import "./TightTasks.css";
import { useFetchTask } from "./hooks/useFetchTask";

function TightCouplingApp() {
  return <Task />;
}

const Task = () => {
  const task = useFetchTask({ id: "1" });

  return (
    <div>
      <h1>Task</h1>
      {!task && <p>Loading...</p>}
      {task && <li key={task.id}>{task.title}</li>}
    </div>
  );
};

export default TightCouplingApp;
