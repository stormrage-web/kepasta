import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Store from "./store/store";
import "../src/styles/styles.css"


const store = new Store();
export const Context = createContext({
  store,
});

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement,
);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);