import ParentCommentBox from "./ParentCommentBox";
import {
	createCommentForArticle,
	deleteCommentFromArticle,
	getCommentsForArticle,
} from "../services/commentsService";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import ReplyCommentBox from "./ReplyCommentBox";
import CommentInput from "./CommentInput";

function ArticleCommentsSection({ article_id }) {
	const [comments, setComments] = useState([]);
	const { userType, token } = useContext(UserContext);
	const [replyBox, setReplyBox] = useState(null);

	const fetchAndOrderComments = async (article_id, setComments) => {
		try {
			const data = await getCommentsForArticle(article_id);

			const commentMap = new Map();
			data.forEach((comment) => {
				comment.replies = [];
				commentMap.set(comment.id, comment);
			});

			let orderedComments = [];
			data.forEach((comment) => {
				if (comment.reply_to === null) {
					orderedComments.splice(0, 0, comment);
				} else {
					const parentComment = commentMap.get(comment.reply_to);
					if (parentComment) {
						parentComment.replies.push(comment);
					}
				}
			});

			const flattenComments = (comments) => {
				let result = [];
				comments.forEach((comment) => {
					result.push(comment);
					if (comment.replies.length > 0) {
						result = result.concat(flattenComments(comment.replies));
					}
				});
				return result;
			};

			setComments(flattenComments(orderedComments));
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchAndOrderComments(article_id, setComments);
	}, [article_id]);

	const postComment = async (content, reply_to = null) => {
		try {
			await createCommentForArticle(article_id, token, content, reply_to);
			await fetchAndOrderComments(article_id, setComments);
			setReplyBox(null);
		} catch (error) {
			console.error(error);
		}
	};

	const handleDelete = async (comment) => {
		let deleted = await deleteCommentFromArticle(comment.id, token);
		if (deleted.status == 204) {
			await fetchAndOrderComments(article_id, setComments);
		}
	};

	return (
		<>
			<div className="container-fluid rounded p-0">
				{userType != "guest" && <CommentInput submitAction={postComment} />}
				<div className="container mt-5 mb-5">
					<hr />
				</div>
				<div className="container p-0">
					<h5 className="p-3 fw-bold">
						Comments
						{comments && comments.length ? (
							<span className="m-0 p-0 mx-2 px-2 btn btn-danger rounded-pill disabled">
								{comments.length}
							</span>
						) : null}
					</h5>
					{comments && comments.length ? (
						comments.map((comment) => {
							if (comment.reply_to == null) {
								return (
									<ParentCommentBox
										comments={comments}
										comment={comment}
										setComments={setComments}
										key={comment.id}
										submitAction={postComment}
										deleteAction={handleDelete}
										replyBox={replyBox}
										setReplyBox={setReplyBox}
									/>
								);
							} else {
								return (
									<ReplyCommentBox
										comments={comments}
										comment={comment}
										setComments={setComments}
										key={comment.id}
										submitAction={postComment}
										deleteAction={handleDelete}
										replyBox={replyBox}
										setReplyBox={setReplyBox}
									/>
								);
							}
						})
					) : (
						<p>Be the first to leave a comment!</p>
					)}
				</div>{" "}
			</div>
		</>
	);
}

export default ArticleCommentsSection;
