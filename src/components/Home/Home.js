import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import "./Home.css";
const Home = () => {
	const [loggedInUser, setLoggedInUser] = useContext(UserContext);

	let history = useHistory();
	const handleHomeSignIn = () => {
		history.push("/login");
	};

	const handleGoToArticle = () => {
		history.push("/news");
	};

	return (
		<div className="home">
			<div className="container home-content">
				<h1>
					<q>
						Words has no wings but they can fly many thousands of miles. <br />~
						Korean Proverb
					</q>
				</h1>
				<h3>Just sign in and start reading latest news.</h3>
				<div>
					{!loggedInUser.email ? (
						<button onClick={handleHomeSignIn} className="sign-in">
							Sign In
						</button>
					) : (
						<button onClick={handleGoToArticle} className="sign-in go-to-news">
							Read Article
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Home;
