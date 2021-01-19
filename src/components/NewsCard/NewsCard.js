import React from "react";
import "./NewsCard.css";
const NewsCard = (props) => {
	const {
		title,
		urlToImage,
		url,
		source,
		author,
		description,
		publishedAt,
	} = props.article;

	return (
		<div className="article">
			<img src={urlToImage} alt="News" />
			<div className="article-info">
				<p className="source-name">{source.name}</p>
				<h1 className="article-title">{title}</h1>
				<p className="article-author">
					By <small>{author ? author : "Unknown"} </small>
				</p>
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
