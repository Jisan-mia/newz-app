import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { SearchContext } from "../../App";
import "./Header.css";
const Header = () => {
	const [toggle, setToggle] = useState(false);
	const [search, setSearch] = useState("technology");
	const [searchTerm, setSearchTerm] = useContext(SearchContext);

	const handleSubmit = (e) => {
		e.preventDefault();

		setSearchTerm(search);
	};

	let history = useHistory();
	const brandHandle = () => {
		history.push("/");
	};

	return (
		<nav className="nav">
			<div className="nav_wrapper ">
				<div className="brand">
					<span onClick={brandHandle}>J-NEWZ</span>

					<form className="search-form" onSubmit={handleSubmit}>
						<input
							onInput={(e) => setSearch(e.target.value)}
							type="text"
							className="search-term"
							value={search}
						/>
						<input type="submit" className="search-btn" value="Search" />
					</form>
				</div>

				<div onClick={() => setToggle(!toggle)} className="hamburger">
					<div className="bar"></div>
					<div className="bar"></div>
					<div className="bar"></div>
				</div>

				<ul className={toggle ? "nav_list" : "nav_list open"}>
					<li>
						<Link to="/news" className="nav_item">
							News
						</Link>
					</li>
					<li>
						<Link to="#" className="nav_item">
							Jisan
						</Link>
					</li>
					<li>
						<Link to="/login" className="login ">
							Login
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Header;
