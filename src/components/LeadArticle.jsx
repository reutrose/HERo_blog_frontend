import { useEffect, useState } from "react";
import "../assets/css/leadArticle.css";
import { Link, useNavigate } from "react-router-dom";

function LeadArticle({ articles }) {
	const [article, setArticle] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const nav = useNavigate();

	useEffect(() => {
		if (!articles || articles.length === 0) return;

		const fetchArticle = () => {
			try {
				const mostLiked = articles.reduce((max, current) =>
					current.likes.length > max.likes.length ? current : max
				);

				setArticle(mostLiked);
				setIsLoading(false);
			} catch (error) {
				console.error(error);
			}
		};

		fetchArticle();
	}, [articles]);

	return (
		<>
			{isLoading ? (
				<div className="d-flex justify-content-center">
					<div className="spinner-border" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			) : (
				<>
					<Link to={`/articles/${article.id}`}>
						<div className="rounded mb-3 article-box">
							<img
								src={
									article.image
										? article.image
										: `https://images.unsplash.com/photo-1520960858461-ac671067213e?q=80&w=1794&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
								}
								className="card-img rounded-4"
								alt="Leading Article Image"
								height={400}
							/>
							<div className="overlay-box">
								<button className="category-btn" onClick={() => nav("/")}>
									<small>{article.category}</small>
								</button>
								<h5 className="text-light p-2">{article.title}</h5>
							</div>
						</div>
					</Link>
				</>
			)}
		</>
	);
}

export default LeadArticle;
