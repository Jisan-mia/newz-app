import React from "react";
import { useParams } from "react-router-dom";

const NewsCategory = () => {
	const { category } = useParams();
	console.log(category);
	return (
		<div>
			<h1>news category search</h1>
		</div>
	);
};

export default NewsCategory;
