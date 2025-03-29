import { Formik } from "formik";
import * as Yup from "yup";

function CommentInput({ submitAction, replyTo }) {
	return (
		<div className="container">
			<Formik
				initialValues={{ content: "" }}
				validationSchema={Yup.object({
					content: Yup.string().required("Content is required."),
				})}
				onSubmit={(values, actions) => {
					setTimeout(() => {
						submitAction(values.content, replyTo);
						actions.setSubmitting(false);
						actions.resetForm({ values: { content: "" } });
					}, 400);
				}}
			>
				{(props) => (
					<div
						className="col mt-3 mb-3 p-0 m-0 bg-invisible-gray rounded-4"
						id="addCommentSection"
					>
						<form onSubmit={props.handleSubmit}>
							<div className="form-floating">
								<textarea
									className="form-control bg-invisible-gray rounded-4 border-0 focus-0"
									placeholder="Comment"
									id="content"
									name="content"
									style={{ height: "100px", resize: "none" }}
									onChange={props.handleChange}
									onBlur={props.handleBlur}
									value={props.values.content}
								></textarea>
								<label htmlFor="content" className="">
									Add comment...
								</label>
							</div>

							<div className="d-flex justify-content-end">
								<button
									type="submit"
									className={`btn btn-danger rounded-pill fw-bold mx-2 mb-2 ${
										!props.dirty || !props.isValid ? "disabled" : ""
									}`}
									disabled={props.isSubmitting}
								>
									Comment
								</button>
							</div>
						</form>
					</div>
				)}
			</Formik>
		</div>
	);
}

export default CommentInput;
