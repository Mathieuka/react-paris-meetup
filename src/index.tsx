import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import TightTasks from "./TightTasks/TightTasks";
import LooseTasks from "./LooseTasks/LooseTasks";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    {/*<TightTasks />*/}
    <LooseTasks />
  </React.StrictMode>,
);
