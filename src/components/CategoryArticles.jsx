import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticlesOfCategory } from "../services/articlesService";
import ArticleCard from "./ArticleCard";

function CategoryArticles() {
	const { category } = useParams();
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [pageNum, setPageNum] = useState(1);
	const [pagesCount, setPagesCount] = useState(0);
	const [pagesTabs, setPagesTabs] = useState([]);

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const response = await getArticlesOfCategory(category, pageNum);
				setArticles(response.articles);
				setPagesCount(Math.ceil(response.count / 10));
				setIsLoading(false);
			} catch (error) {
				console.error(error);
			}
		};
		fetchArticles();
	}, [setArticles, pageNum, category]);

	useEffect(() => {
		let pages = [];
		for (let i = 0; i < pagesCount; i++) {
			pages.push(i + 1);
		}
		setPagesTabs(pages);
	}, [pagesCount]);

	return (
		<>
			{!isLoading && (
				<>
					<nav>
						<ul className="pagination justify-content-center">
							<li className={`page-item ${pageNum == 1 ? "disabled" : ""}`}>
								<button
									className="page-link"
									onClick={() => setPageNum(pageNum - 1)}
								>
									Prev
								</button>
							</li>
							{pagesTabs.map((item, index) => {
								return (
									<li className="page-item" key={index}>
										<button
											className="page-link"
											onClick={() => setPageNum(item)}
										>
											{item}
										</button>
									</li>
								);
							})}
							<li
								className={`page-item ${
									pageNum == pagesCount ? "disabled" : ""
								}`}
							>
								<button
									className="page-link"
									onClick={() => setPageNum(pageNum + 1)}
								>
									Next
								</button>
							</li>
						</ul>
					</nav>
					<div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
						{articles.length ? (
							articles.map((article) => {
								return (
									<div className="col" key={article.id}>
										<ArticleCard article={article} />
									</div>
								);
							})
						) : (
							<p>No Articles Found.</p>
						)}
					</div>
				</>
			)}
		</>
	);
}

export default CategoryArticles;
