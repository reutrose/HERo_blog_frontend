import { Link, useNavigate } from "react-router-dom";

function RecentUserComments({ userComments }) {
	const nav = useNavigate();

	return (
		<>
			<div className="container mt-5">
				<h3 className="fw-bold">Comments By You</h3>
				<hr />
				{userComments && userComments.length ? (
					<table className="table">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Comment</th>
								<th scope="col">Article</th>
							</tr>
						</thead>
						<tbody>
							{userComments.map((comment, index) => {
								return (
									<tr key={index}>
										<th scope="row">{index + 1}</th>
										<td>{comment.content}</td>
										<td>
											<button
												onClick={() => {
													nav(`/articles/${comment.article}`);
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
					<p>No comments found.</p>
				)}
				<button
					className="w-100 btn btn-invisible-gray rounded-3 mt-3"
					type="button"
					onClick={() => nav("/my-profile/comments/")}
				>
					Manage Comments
				</button>
			</div>
		</>
	);
}

export default RecentUserComments;
