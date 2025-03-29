import { useMemo } from "react";
import { Link } from "react-router-dom";

function SeeAlso({ articles }) {
	const randomArticles = useMemo(() => {
		if (!articles || articles.length === 0) return [];

		const shuffled = [...articles].sort(() => 0.5 - Math.random());
		return shuffled.slice(0, 4);
	}, [articles]);

	return (
		<div className="row">
			<div className="col-12">
				<h3 className="fw-bold">See Also</h3>
				<hr />
			</div>
			{randomArticles.length > 0 ? (
				randomArticles.map((article) => (
					<div className="col-12" key={article.id}>
						<div className="card mb-3 border-0" style={{ maxWidth: "540px" }}>
							<div className="row g-0">
								<div className="col-3">
									<img
										src={
											article.image
												? article.image
												: "https://images.unsplash.com/photo-1520960858461-ac671067213e?q=80&w=1794&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
										}
										className="img-fluid rounded"
										alt={article.title}
									/>
								</div>
								<div className="col-9">
									<div className="card-body m-0 p-0 mx-2">
										<Link
											to={`/articles/${article.id}`}
											className="text-decoration-none text-dark"
										>
											<h5 className="card-title fs-6 m-0 p-0">
												{article.title}
											</h5>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				))
			) : (
				<p>No related articles available.</p>
			)}
		</div>
	);
}

export default SeeAlso;
