import { useCallback, useContext, useEffect, useState } from "react";
import {
	checkIfUserLiked,
	getArticleById,
	getArticleLikes,
	likeArticle,
	unlikeArticle,
} from "../services/articlesService";
import { useParams } from "react-router-dom";
import { formatDateOnly } from "../helpers/datetimeHelper";
import UserContext from "../contexts/UserContext";
import ArticleCommentsSection from "./ArticleCommentsSection";
import Loading from "./Loading";

function ArticlePage() {
	const { userId, token, userType } = useContext(UserContext);
	const [article, setArticle] = useState({});
	const [articleLikes, setArticleLikes] = useState([]);
	const [like, setLike] = useState(false);
	const [likeId, setLikeId] = useState(null);
	const [articleLoaded, setArticleLoaded] = useState(false);
	const [likesLoaded, setLikesLoaded] = useState(false);
	const { id } = useParams();
	useCallback;

	useEffect(() => {
		getArticleById(id)
			.then((result) => {
				setArticle(result);
				setArticleLoaded(true);
			})
			.catch((error) => console.error(error));
	}, [id]);

	useEffect(() => {
		getArticleLikes(id)
			.then((data) => {
				setArticleLikes(data);
				setLikesLoaded(true);
			})
			.catch((error) => console.error(error));
	}, [id]);

	useEffect(() => {
		checkIfUserLiked(articleLikes, userId).then((result) => {
			setLike(result.exists);
			setLikeId(result.like_id);
		});
	}, [articleLikes, userId]);

	const articleDate = article.created_at
		? formatDateOnly(article.created_at)
		: "Unknown Date";

	const addLikeToArticle = async () => {
		let like = await likeArticle(id, token);
		setArticleLikes((prev) => [...prev, like]);
		setLike(true);
	};

	const deleteLikeFromArticle = async () => {
		await unlikeArticle(token, likeId);
		let newArticleLikes = await getArticleLikes(id);
		setArticleLikes(newArticleLikes);
		setLike(false);
	};

	return (
		<>
			{articleLoaded && likesLoaded ? (
				<>
					<div className="container d-flex flex-row justify-content-center align-items-center">
						{article.category && (
							<button className="btn btn-teal rounded-pill p-0 px-2 me-2">
								<small>{article.category}</small>
							</button>
						)}
						&#x2022;
						{articleDate && (
							<button
								className="btn btn-white rounded-pill p-0 px-2 me-2"
								disabled
							>
								<small>{articleDate}</small>
							</button>
						)}
					</div>
					{article.title && (
						<h2 className="fw-bold text-center container mt-4 mb-4">
							{article.title}
						</h2>
					)}
					{article.author_username && (
						<p className="fw-bold text-center">By {article.author_username}</p>
					)}
					{article.description && (
						<p className="text-center">{article.description}</p>
					)}
					<div className="text-center">
						{article.tags &&
							article.tags.length &&
							article.tags.map((tag, index) => {
								return (
									<button
										key={index}
										className="btn btn-invisible-gray text-dark me-2 p-0 px-1 rounded"
										disabled
									>
										<small>#{tag}</small>
									</button>
								);
							})}
					</div>
					{article.image && (
						<img
							className="img-fluid mt-4 mb-4"
							src={article.image}
							alt="Article's Image"
						/>
					)}

					{article.content && <p>{article.content}</p>}

					{articleLikes && (
						<div className="container-fluid p-0 m-0 d-flex flex-row align-items-start">
							{userType != "guest" &&
								(like ? (
									<button
										className="btn btn-danger p-2 py-1"
										onClick={deleteLikeFromArticle}
									>
										<small>
											<i className="bi bi-hand-thumbs-down"></i>&nbsp;Unlike
										</small>
									</button>
								) : (
									<button
										className="btn btn-primary p-2 py-1"
										onClick={addLikeToArticle}
									>
										<small>
											<i className="bi bi-hand-thumbs-up"></i>&nbsp;Like
										</small>
									</button>
								))}
							<p className="p-1">
								<small>Liked by {articleLikes.length} People.</small>
							</p>
						</div>
					)}

					<div className="container d-flex justify-content-center p-0 mt-5 pt-3 pb-3 align-items-center rounded">
						<ArticleCommentsSection article_id={id} />
					</div>
				</>
			) : (
				<Loading />
			)}
		</>
	);
}

export default ArticlePage;
