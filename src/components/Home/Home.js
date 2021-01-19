import React from "react";
import "./Home.css";
const Home = () => {
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
					<button className="sign-in">Sign In</button>
				</div>
			</div>
		</div>
	);
};

export default Home;
