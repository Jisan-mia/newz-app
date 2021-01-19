import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../App";
import NewsCard from "../NewsCard/NewsCard";
import "./News.css";
const News = () => {
	const [articles, setArticles] = useState([]);
	const [searchTerm, setSearchTerm] = useContext(SearchContext);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadNews();
	}, [searchTerm]);

	const loadNews = async () => {
		const url = `http://newsapi.org/v2/everything?q=${searchTerm}&apiKey=8c4c0b73170440dc909e77536dcb391f`;
		const response = await axios.get(url);
		console.log(response.statusText);
		if (response.data.articles.length) {
			setArticles(response.data.articles);
		} else {
			alert("Not matched articles found");
		}

		setLoading(false);
	};

	console.log(articles);

	return (
		<>
			<h1 className="container">
				Articles <br />
				<small className="loading">{loading && "loadding..."}</small>
			</h1>

			<div className="container article-container">
				{articles.map((article, key) => (
					<NewsCard key={key} article={article}></NewsCard>
				))}
			</div>
		</>
	);
};

export default News;
