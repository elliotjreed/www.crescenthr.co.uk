import * as React from "react";
import { render } from "react-dom";

import "./assets/scss/App.scss";
import App from "./components/App";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", (): void => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}

const rootEl: Element = document.getElementById("root");

render(<App />, rootEl);
