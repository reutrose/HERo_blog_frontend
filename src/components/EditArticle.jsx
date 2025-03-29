import { Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import {
	categories,
	editArticle,
	getArticleById,
} from "../services/articlesService";
import UserContext from "../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";

function EditArticle() {
	const { id } = useParams();
	const nav = useNavigate();
	const { userId, token } = useContext(UserContext);
	const [tags, setTags] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [article, setArticle] = useState({});
	const [isFetching, setIsFetching] = useState(true);

	useEffect(() => {
		const fetchArticle = async () => {
			let fetchedArticle = await getArticleById(id);
			setArticle(fetchedArticle);
			setTags(fetchedArticle.tags);
			setIsFetching(false);
		};
		fetchArticle();
	}, [id]);

	const handleTags = (tag) => {
		tag = tag.trim();
		if (tag && !tags.includes(tag)) {
			setTags([...tags, tag]);
			setInputValue("");
		}
	};

	const removeTag = (tag) => {
		setTags(tags.filter((item) => item !== tag));
	};

	return (
		<>
			<h3 className="text-center fw-bold display-6">Edit Article</h3>
			<hr />
			{isFetching ? (
				<div className="d-flex justify-content-center">
					<div className="spinner-border" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			) : article.author_id != userId ? (
				<PageNotFound />
			) : (
				<Formik
					initialValues={{
						tags: article.tags,
						title: article.title,
						description: article.description,
						content: article.content,
						category: article.category,
						image: article.image,
						status: "published",
					}}
					validationSchema={Yup.object({
						title: Yup.string()
							.required("Title is required.")
							.min(5, "Title must be at least 5 characters.")
							.max(100, "Title can have a maximum of 100 characters."),
						description: Yup.string()
							.required("Description is required.")
							.min(10, "Description must be at least 10 characters."),
						category: Yup.string(),
						content: Yup.string().required("Content is required."),
						status: Yup.string().required("Status is required."),
						image: Yup.mixed().nullable(),
					})}
					onSubmit={async (values, actions) => {
						const formData = new FormData();
						formData.append("title", values.title);
						formData.append("description", values.description);
						formData.append("category", values.category);
						formData.append("content", values.content);
						formData.append("status", values.status);

						tags.forEach((tag) => {
							formData.append("tags", tag);
						});

						if (values.image instanceof File) {
							formData.append("image", values.image);
						}

						try {
							const response = await editArticle(id, formData, token);
							if (response) {
								nav(`/articles/${id}/`);
							}
						} catch (error) {
							console.error("Failed to submit article:", error);
						}

						actions.setSubmitting(false);
					}}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						setFieldValue,
						isValid,
					}) => (
						<form onSubmit={handleSubmit}>
							<div className="form-floating mt-3">
								<input
									type="text"
									className="form-control"
									id="title"
									name="title"
									placeholder="Title"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.title}
								/>
								<label htmlFor="title">Title</label>
								{errors.title && touched.title && (
									<div className="text-danger small">{errors.title}</div>
								)}
							</div>
							<div className="form-floating mt-3">
								<textarea
									name="description"
									id="description"
									className="form-control"
									placeholder="Description"
									style={{ resize: "none", height: "100px" }}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.description}
								></textarea>
								<label htmlFor="description">Description</label>
								{errors.description && touched.description && (
									<div className="text-danger small">{errors.description}</div>
								)}
							</div>
							<div className="form-floating mt-3">
								<textarea
									name="content"
									id="content"
									className="form-control"
									placeholder="Content"
									style={{ resize: "none", height: "300px" }}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.content}
								></textarea>
								<label htmlFor="content">Content</label>
								{errors.content && touched.content && (
									<div className="text-danger small">{errors.content}</div>
								)}
							</div>
							<div className="mt-3">
								<label htmlFor="category" className="form-label">
									Category
								</label>
								<select
									className="form-select"
									id="category"
									name="category"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.category}
								>
									{categories.map((category, index) => {
										return <option key={index}>{category}</option>;
									})}
								</select>
								{errors.category && touched.category && (
									<div className="text-danger small">{errors.category}</div>
								)}
							</div>
							<div className="container mt-3">
								<div className="row row-cols-auto">
									{tags.map((tag, index) => (
										<div className="col m-0 p-0 px-1 py-1" key={index}>
											<div className="input-group m-0 p-0">
												<button
													className="btn btn-secondary disabled"
													type="button"
												>
													{tag}
												</button>
												<button
													className="btn btn-secondary p-1"
													type="button"
													onClick={() => removeTag(tag)}
												>
													<i className="bi bi-x"></i>
												</button>
											</div>
										</div>
									))}
								</div>
							</div>
							<div className="form-floating mt-3 w-50">
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										id="tags"
										name="tags"
										placeholder="Tags"
										disabled={tags.length >= 3}
										value={inputValue}
										onChange={(e) => setInputValue(e.target.value)}
									/>
									<button
										className="btn btn-invisible-gray"
										type="button"
										onClick={() => handleTags(inputValue)}
									>
										+
									</button>
								</div>
							</div>
							<div className="mt-3 mb-3">
								<label htmlFor="image" className="form-label">
									Image Upload
								</label>
								<input
									type="file"
									className="form-control"
									id="image"
									name="image"
									accept="image/*"
									onChange={(event) => {
										setFieldValue("image", event.currentTarget.files[0]);
									}}
								/>
								{errors.image && touched.image && (
									<div className="text-danger small">{errors.image}</div>
								)}
							</div>
							<button
								type="submit"
								className="btn btn-pink w-100 text-light fw-bold"
								disabled={!isValid}
							>
								Submit
							</button>
						</form>
					)}
				</Formik>
			)}
		</>
	);
}

export default EditArticle;
