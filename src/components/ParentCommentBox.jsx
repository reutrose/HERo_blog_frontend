import { useContext, useEffect, useState } from "react";
import { formatTimeUntilNow } from "../helpers/datetimeHelper";
import UserContext from "../contexts/UserContext";
import { editComment } from "../services/commentsService";
import { Formik } from "formik";
import * as Yup from "yup";
import CommentInput from "./CommentInput";

function ParentCommentBox({
	comment,
	comments,
	submitAction,
	deleteAction,
	replyBox,
	setReplyBox,
}) {
	const { userType, userId, token } = useContext(UserContext);
	const [editMode, setEditMode] = useState(false);
	const [commentContent, setCommentContent] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		setCommentContent(comment.content);
	}, [comment]);

	const handleEdit = async (updatedComment) => {
		await editComment(comment.article, updatedComment, token, comment.id);
		setEditMode(false);
		setCommentContent(updatedComment);
	};

	return (
		<>
			<div className="container-fluid rounded bg-white p-2 my-1 border rounded-4">
				{comment.reply_to == null
					? null
					: comments.map((item, index) => {
							if (item.id === comment.reply_to) {
								return (
									<div
										className="container bg-invisible-gray rounded-4 fst-italic mb-2"
										key={index}
									>
										{item.content}
									</div>
								);
							}
					  })}
				<div>
					<span className="fw-bold p-1 text-capitalize">
						{comment.author_username}
					</span>
					&nbsp;
					<span className="p-1 small text-secondary">
						{formatTimeUntilNow(comment.created_at)} ago
					</span>
				</div>
				{editMode ? (
					<Formik
						initialValues={{ content: comment.content }}
						validationSchema={Yup.object({
							content: Yup.string().required("Username is required."),
						})}
						onSubmit={(values, actions) => {
							handleEdit(values.content);
							actions.setSubmitting(false);
						}}
					>
						{(props) => (
							<form
								className="container row d-flex m-0 p-0 justify-content-center"
								onSubmit={props.handleSubmit}
							>
								<div className="col-10 m-0 p-0">
									<textarea
										name="content"
										id="content"
										style={{ resize: "none" }}
										className="w-100 rounded-start-4 p-2 m-0 h-100"
										onChange={props.handleChange}
										onBlur={props.handleBlur}
										value={props.values.content}
									></textarea>
								</div>
								<div className="col-1 m-0 p-0">
									<button
										type="submit"
										className={`btn btn-pink h-100 rounded-0 m-0 w-100 p-0 ${
											!props.dirty || !props.isValid ? "disabled" : ""
										}`}
									>
										<span className="fs-4">
											<i className="bi bi-check2-circle"></i>
										</span>
									</button>
								</div>
								<div className="col-1 m-0 p-0">
									<button
										type="button"
										className={`btn btn-invisible-gray h-100 rounded-0 m-0 w-100 p-0`}
										onClick={() => {
											setEditMode(false);
										}}
									>
										<span className="fs-4">
											<i className="bi bi-x-circle"></i>
										</span>
									</button>
								</div>
							</form>
						)}
					</Formik>
				) : (
					<p className="p-0 px-1">{commentContent}</p>
				)}
				<div className="row">
					<div className="col-6">
						{userType != "guest" &&
							(replyBox != comment.id ? (
								<button
									className="btn btn-white m-1 p-0 px-1"
									onClick={() => {
										setReplyBox(comment.id);
									}}
								>
									<small>
										<i className="bi bi-reply-all-fill"></i> Reply
									</small>
								</button>
							) : (
								<button
									className="btn btn-white m-1 p-0 px-1"
									onClick={() => {
										setReplyBox(null);
									}}
								>
									<small>
										<i className="bi bi-x-square"></i> Close
									</small>
								</button>
							))}
					</div>
					<div className="col-6">
						<div className="d-flex flex-row justify-content-end">
							{userId == comment.author_id ? (
								<>
									{editMode ? null : (
										<button
											className="btn btn-white m-1 p-0 px-1 text-secondary"
											type="button"
											onClick={() => {
												setEditMode(true);
											}}
										>
											<small>
												<i className="bi bi-pencil-square"></i> Edit
											</small>
										</button>
									)}
								</>
							) : null}
							{userId == comment.author_id ||
							userType == "admin" ||
							userType == "superuser" ? (
								<button
									className="btn btn-white m-1 p-0 px-1 text-secondary"
									onClick={() => {
										deleteAction(comment);
										setIsDeleting(true);
									}}
								>
									{!isDeleting ? (
										<small>
											<i className="bi bi-trash-fill"></i> Delete
										</small>
									) : (
										<div className="spinner-border" role="status">
											<span className="visually-hidden">Loading...</span>
										</div>
									)}
								</button>
							) : null}
						</div>
					</div>
				</div>
			</div>
			{replyBox === comment.id ? (
				<CommentInput submitAction={submitAction} replyTo={comment.id} />
			) : null}
		</>
	);
}

export default ParentCommentBox;
