import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import TightCouplingApp from "./TightCouplingApp/TightCouplingApp";
import LooseCouplingApp from "./LooseCouplingApp/LooseCouplingApp";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <TightCouplingApp />
    <LooseCouplingApp />
  </React.StrictMode>,
);
