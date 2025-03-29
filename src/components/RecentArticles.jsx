import { useNavigate } from "react-router-dom";
import ArticleCard from "./ArticleCard";

function RecentArticles({ articles }) {
	const nav = useNavigate();

	return (
		<>
			<div className="row mt-3 mb-3">
				<div className="col-12 col-sm-6">
					<h3 className="fw-bold">Recent Articles</h3>
				</div>
				<div className="col-12 col-sm-6 text-end">
					<button
						className="btn btn-outline-pink-subtle rounded-pill p-0 px-2"
						onClick={() => nav("/articles/")}
					>
						All Articles &nbsp;
						<small>
							<i className="bi bi-arrow-right-circle"></i>
						</small>
					</button>
				</div>
			</div>
			<div className="row row-cols-1 row-cols-md-3 g-4">
				{articles && articles.length ? (
					articles.slice(0, 3).map((article) => {
						return (
							<div className="col" key={article.id}>
								<ArticleCard article={article} />
							</div>
						);
					})
				) : (
					<p>No articles found.</p>
				)}
			</div>
		</>
	);
}

export default RecentArticles;
