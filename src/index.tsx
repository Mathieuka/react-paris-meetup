import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import SadApp from "./SadApp";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <SadApp />
    {/*<App />*/}
  </React.StrictMode>,
);
