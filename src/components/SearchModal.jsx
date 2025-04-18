import { useEffect, useState } from "react";
import { search } from "../services/searchService";
import ArticleCard from "./ArticleCard";

function SearchModal({
	setShowSearchModal,
	searchQuery,
	setSearchQuery,
	searchActive,
	setSearchActive,
	setIsSearching,
	isSearching,
}) {
	const [results, setResults] = useState([]);

	useEffect(() => {
		if (searchActive) {
			const handleSearch = async () => {
				let articles = await search(searchQuery);
				setResults(articles);
				setSearchActive(false);
				setIsSearching(false);
			};
			handleSearch();
		}
	}, [searchActive, setSearchActive, searchQuery, setIsSearching]);

	return (
		<>
			<div className="container d-flex justify-content-end">
				<button
					className="btn btn-outline-danger"
					onClick={() => {
						setShowSearchModal(false);
						setSearchQuery("");
					}}
				>
					<i className="bi bi-x-square-fill"></i> Close Search
				</button>
			</div>
			<h3 className="text-center">Search Results</h3>
			<hr />
			<p className="p-2 text-secondary">
				{searchQuery != "" ? `Shows results for ${searchQuery}` : ""}
			</p>
			{!isSearching ? (
				results && results.length ? (
					<>
						<div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
							{results.map((article) => {
								return (
									<div className="col" key={article.id}>
										<ArticleCard article={article} />
									</div>
								);
							})}
						</div>
					</>
				) : (
					<p>No articles matched the search.</p>
				)
			) : (
				<div className="spinner-border text-pink" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			)}
		</>
	);
}

export default SearchModal;
