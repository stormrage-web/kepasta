import React from "react";
import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import { ConfigProvider } from "antd";
import { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import LoginForm from "./components/LoginForm";
import { Context } from ".";
import AppRouter from "./components/AppRouter";

const THEME = {
	token: {
		colorPrimary: "#c2c0ff",
		fontFamily: "League Spartan, sans-serif, -apple-system, BlinkMacSystemFont,\n" +
			"  \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\",\n" +
			"  \"Droid Sans\", \"Helvetica Neue\"",
	},
};

function App() {
	const { store } = useContext(Context);

	useEffect(() => {
		if (localStorage.getItem("token")) {
			store.setAuth(true);
	
			// store.checkAuth();
		}
		// store.setAuth(false);
	  }, []);

	return (
		<div className="App">
		  <BrowserRouter>
			<AppRouter />
		  </BrowserRouter>
		</div>
	  );
}

export default App;
