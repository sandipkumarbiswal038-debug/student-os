import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./styles/global.css";

import { StudentEventsProvider } from "./student/StudentEventsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <StudentEventsProvider>
        <App />
      </StudentEventsProvider>
    </BrowserRouter>
  </React.StrictMode>
);