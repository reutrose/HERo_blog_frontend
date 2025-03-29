import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { getCommentsByAuthor } from "../services/commentsService";
import { useNavigate } from "react-router-dom";

function UserCommentDashboard() {
	const { userId } = useContext(UserContext);
	const [comments, setComments] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [pageNum, setPageNum] = useState(1);
	const [pagesCount, setPagesCount] = useState(0);
	const [pagesTabs, setPagesTabs] = useState([]);
	const nav = useNavigate();

	useEffect(() => {
		const fetchComments = async () => {
			try {
				const response = await getCommentsByAuthor(userId, pageNum);
				setComments(response.comments);
				setPagesCount(Math.ceil(response.count / 10));
				setIsLoading(false);
			} catch (error) {
				console.error(error);
			}
		};
		fetchComments();
	}, [pageNum, userId]);

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
						{comments && comments.length ? (
							<table className="table">
								<thead>
									<tr>
										<th scope="col">#</th>
										<th scope="col">Comment</th>
										<th scope="col">Article</th>
									</tr>
								</thead>
								<tbody>
									{comments.map((comment, index) => {
										return (
											<tr key={index}>
												<th scope="row">{index + 1 + pageNum * 10 - 10}</th>
												<td>{comment.content}</td>
												<td>
													<button
														onClick={() => {
															nav(`/articles/${comment.article}/`);
														}}
														className="bg-white border-0 text-primary"
													>
														Go To Article
													</button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						) : (
							<p>No Comments Found.</p>
						)}
					</div>
				</>
			)}
		</>
	);
}

export default UserCommentDashboard;
