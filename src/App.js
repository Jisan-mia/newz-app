import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import News from "./components/News/News";
import NewsCategory from "./components/NewsCategory/NewsCategory";
import NotFound from "./components/NotFound/NotFound";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const SearchContext = createContext();
export const UserContext = createContext();

const App = () => {
	const [searchTerm, setSearchTerm] = useState("technology");
	const [loggedInUser, setLoggedInUser] = useState({});

	return (
		<SearchContext.Provider value={[searchTerm, setSearchTerm]}>
			<UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
				<Router>
					<Header />
					<Switch>
						<Route exact path="/">
							<Home></Home>
						</Route>
						<PrivateRoute path="/news">
							<News></News>
						</PrivateRoute>
						<Route
							path="/news/top-headings/category/:category"
							component={NewsCategory}
						/>
						<Route path="/login">
							<Login></Login>
						</Route>

						<Route exact path="*">
							<NotFound></NotFound>
						</Route>
					</Switch>
				</Router>
			</UserContext.Provider>
		</SearchContext.Provider>
	);
};

export default App;
