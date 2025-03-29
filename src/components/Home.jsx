import RecentArticles from "./RecentArticles";
import LeadArticle from "./LeadArticle";
import SeeAlso from "./SeeAlso";
import { useEffect, useState } from "react";
import { getAllArticles } from "../services/articlesService";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

function Home({ articles, setArticles }) {
	const [isLoading, setIsLoading] = useState(true);
	const nav = useNavigate();

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const response = await getAllArticles();
				setArticles(response.articles);
				setIsLoading(false);
			} catch (error) {
				console.error(error);
			}
		};
		fetchArticles();
	}, [setArticles]);

	return (
		<>
			{isLoading || !articles || !articles.length ? (
				<Loading />
			) : (
				<>
					<div className="row">
						<div className="col-12 col-lg-8">
							<LeadArticle articles={articles} />
						</div>
						<div className="col-12 col-lg-4">
							<SeeAlso articles={articles} />
						</div>
					</div>
					<RecentArticles articles={articles.slice(0, 3)} />
					<div className="container d-flex justify-content-center align-items-center mt-3 mb-3">
						<button
							className="btn btn-pink-subtle rounded-pill"
							onClick={() => nav("/articles/")}
						>
							View All Articles &nbsp;
							<small>
								<i className="bi bi-arrow-right-circle"></i>
							</small>
						</button>
					</div>
				</>
			)}
		</>
	);
}

export default Home;
