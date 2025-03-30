import { Link, useNavigate } from "react-router-dom";
import { formatDateOnly } from "../helpers/datetimeHelper";
import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import { deleteArticle } from "../services/articlesService";
import DeleteArticleModal from "./DeleteArticleModal";

function ArticleCard({ article }) {
	const nav = useNavigate();
	const { userId, token, userType } = useContext(UserContext);
	const [isDeleted, setIsDeleted] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const formattedDate = article.created_at
		? formatDateOnly(article.created_at)
		: "Unknown Date";

	const handleDeleteModal = async () => {
		setDeleteModal(true);
	};

	const handleDelete = async () => {
		let action = await deleteArticle(article.id, token);
		if (action.status == 204) {
			setDeleteModal(false);
			setIsDeleted(true);
		}
	};

	return (
		<>
			{deleteModal ? (
				<DeleteArticleModal
					setDeleteModal={setDeleteModal}
					handleDelete={handleDelete}
				/>
			) : null}
			{isDeleted ? (
				<div className="container text-center d-flex flex-column justify-content-center align-items-center h-100">
					<p>The article </p>
					<p className="fw-bold">{article.title}</p>
					<p>was deleted.</p>
				</div>
			) : (
				<div className="card border-0 text-roboto h-100">
					{userType == "admin" ||
					userType == "superuser" ||
					(article.author_id && article.author_id == userId) ? (
						<div className="container d-flex justify-content-center align-items-center">
							<button
								className="bg-white border-0"
								onClick={() => {
									handleDeleteModal();
								}}
							>
								<i className="bi bi-trash3"></i>
							</button>
							<button
								className="bg-white border-0"
								onClick={() => {
									nav(`/articles/${article.id}/edit/`);
								}}
							>
								<i className="bi bi-pencil-square"></i>
							</button>
						</div>
					) : null}
					<img
						src={
							article.image
								? article.image
								: "https://images.unsplash.com/photo-1593526613712-7b4b9a707330?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						}
						className="card-img-top rounded-4"
						alt={article.title}
					/>
					<div className="card-body h-100  d-flex flex-column align-items-stretch justify-content-between">
						<div className="row">
							<div className="col-9">
								<p className="card-text mb-2">
									<small className="text-pink">
										{article.category ? article.category : ""}
									</small>
								</p>
							</div>
							<div className="col-3 text-end">
								<small style={{ fontSize: "0.7rem" }}>
									<i className="bi bi-heart"></i>
									&nbsp; {article.likes ? article.likes.length : "0"}
								</small>
							</div>
						</div>

						<div className="h-100">
							<Link
								to={`/articles/${article.id}/`}
								className="text-decoration-none"
							>
								<h5 className="card-title fw-bold text-dark">
									{article.title ? article.title : ""}
								</h5>
							</Link>
						</div>
						<div>
							<p className="card-text mb-1">
								<small>
									By {article.author_username ? article.author_username : ""}
								</small>
							</p>
						</div>
						<div>
							<p className="card-text mb-1">
								<small>{article.description ? article.description : ""}</small>
							</p>
						</div>
						<div>
							<p className="card-text">
								<small className="text-body-secondary">
									Published: {formattedDate}
								</small>
							</p>
							<Link
								to={article.id ? `/articles/${article.id}/` : `/articles/`}
								className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 text-secondary"
							>
								Read More <i className="bi bi-arrow-up-right-circle-fill"></i>
							</Link>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default ArticleCard;
