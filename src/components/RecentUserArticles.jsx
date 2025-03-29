import { useNavigate } from "react-router-dom";
import ArticleCard from "./ArticleCard";

function RecentUserArticles({ userArticles }) {
	const nav = useNavigate();

	return (
		<>
			<div className="container mt-5">
				<div className="row">
					<div className="col-9">
						{" "}
						<h3 className="fw-bold">Articles By You</h3>
					</div>
					<div className="col-3 d-flex justify-content-end align-items-center">
						<button
							className="btn btn-pink text-white"
							onClick={() => {
								nav("/articles/create/");
							}}
							style={{ borderRadius: "50%" }}
						>
							+
						</button>
					</div>
				</div>
				<hr />
				<div className="row row-cols-1 row-cols-md-3 g-4">
					{userArticles && userArticles.length ? (
						userArticles.slice(0, 3).map((article) => {
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
				<button
					className="w-100 btn btn-invisible-gray rounded-3 mt-3"
					type="button"
					onClick={() => nav("/my-profile/articles/")}
				>
					Manage Articles
				</button>
			</div>
		</>
	);
}

export default RecentUserArticles;
