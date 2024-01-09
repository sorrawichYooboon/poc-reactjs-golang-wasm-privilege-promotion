import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { LoadWasm } from "./LoadWasm";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LoadWasm>
      <App />
    </LoadWasm>
  </React.StrictMode>
);
