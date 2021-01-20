import React from "react";
import "./NewsCard.css";
const NewsCard = (props) => {
	// const {
	// 	title,
	// 	urlToImage,
	// 	url,
	// 	source,
	// 	author,
	// 	description,
	// 	publishedAt,
	// } = props.article;

	const { title, image, url, source, description, publishedAt } = props.article;

	return (
		<div className="article">
			<img src={image} alt="News" />
			<div className="article-info">
				<p className="source-name">
					<a
						style={{ textDecoration: "none", color: "rgb(0 0 0 / 59%)" }}
						href={source.url}
					>
						{source.name}
					</a>
				</p>
				<h1 className="article-title">{title}</h1>

				<p className="description">{description}</p>

				<h3 className="more-info">
					<small className="publishedAt">{publishedAt}</small>
					<a className="read-btn" rel="noreferrer" target="_blank" href={url}>
						Read More
					</a>
				</h3>
			</div>
		</div>
	);
};

export default NewsCard;
