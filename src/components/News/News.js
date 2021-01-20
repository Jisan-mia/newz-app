import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { SearchContext } from "../../App";
import NewsCard from "../NewsCard/NewsCard";
import "./News.css";

const categories = ["General", "Science", "Health", "Technology", "Sports"];

const News = () => {
	const [articles, setArticles] = useState([]);
	const [searchTerm, setSearchTerm] = useContext(SearchContext);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// loadNews();
		loadGNews();
	}, [searchTerm]);

	//fetching news from newsapi.org
	const loadNews = async () => {
		const url = `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=8c4c0b73170440dc909e77536dcb391f`;
		const response = await axios.get(url);
		if (response.data.articles.length) {
			setArticles(response.data.articles);
		} else {
			alert("Not matched articles found");
		}

		setLoading(false);
	};

	//fetching news from gnews api
	const loadGNews = async () => {
		const url = `https://gnews.io/api/v4/search?q=${searchTerm}&token=ac6135e6a868015d2c1276cd8aa8081f`;
		try {
			let res = await axios.get(url);
			let data = res.data.articles;
			setArticles(data);
		} catch (error) {
			console.log(error.response.status);
			console.log(error.response.statusText);
			alert(
				error.response.statusText,
				"Something is going wrong or you acced the req limit"
			);
		}
		setLoading(false);
	};

	let history = useHistory();
	const handleCategory = (category) => {
		console.log(category);
	};

	return (
		<>
			<h1 className="container">
				Articles <br />
			</h1>

			<div className="container news-category">
				{categories.map((category, index) => (
					<span
						key={index}
						onClick={() => handleCategory(category.toLowerCase())}
					>
						{category}
					</span>
				))}
			</div>
			<div className="container">
				<small className="loading">{loading && "loadding..."}</small>
			</div>

			<div className="container article-container">
				{articles.map((article, key) => (
					<NewsCard key={key} article={article}></NewsCard>
				))}
			</div>
		</>
	);
};

export default News;
