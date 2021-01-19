import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import News from "./components/News/News";
import NotFound from "./components/NotFound/NotFound";

export const SearchContext = createContext();

const App = () => {
	const [searchTerm, setSearchTerm] = useState("tech");

	return (
		<SearchContext.Provider value={[searchTerm, setSearchTerm]}>
			<Router>
				<Header />

				<Switch>
					<Route exact path="/">
						<Home></Home>
					</Route>
					<Route path="/news">
						<News></News>
					</Route>

					<Route exact path="*">
						<NotFound></NotFound>
					</Route>
				</Switch>
			</Router>
		</SearchContext.Provider>
	);
};

export default App;
