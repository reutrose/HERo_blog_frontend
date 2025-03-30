import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import { register } from "../services/usersService";

function Register() {
	const nav = useNavigate();
	const { setToken, userHandler } = useContext(UserContext);
	const [errorMessage, setErrorMessage] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleRegister = async (values, actions) => {
		setIsSubmitting(true);
		let response = await register(values);
		if (response.status == 400) {
			setErrorMessage("Oops! Looks like this username is already taken.");
			return;
		} else if (response.status != 200) {
			setErrorMessage("Something went wrong.");
			return;
		} else {
			setToken(response.token);
			userHandler();
			setIsSubmitting(false);
			actions.resetForm({
				username: "",
				password: "",
			});
			nav("/");
		}
	};

	return (
		<>
			<div className="container d-flex justify-content-center align-items-center">
				<div className="col-12 col-md-6">
					<h2 className="fw-bold text-center">Register</h2>
					<hr className="border-pink" />
					<Formik
						initialValues={{ username: "", email: "", password: "" }}
						validationSchema={Yup.object({
							username: Yup.string()
								.required("Username is required.")
								.min(3, "Username must contain at least 3 characters."),
							password: Yup.string()
								.required("Password is required.")
								.min(8, "Password must be at least 8 characters long.")
								.matches(
									"[A-Z]",
									"Password must contain at least one uppercase letter."
								)
								.matches(
									"[a-z]",
									"Password must contain at least one lowercase letter."
								)
								.matches(
									`[!@#$%^&*(),.?":{}|<>]`,
									"Password must contain at least one special character."
								)
								.matches(
									"[/d{4,}/]",
									"Password must contain at least four numbers."
								),
						})}
						onSubmit={(values, actions) => {
							setTimeout(() => {
								handleRegister(values, actions);
							}, 1000);
						}}
					>
						{(props) => (
							<form className="mt-4 mb-4" onSubmit={props.handleSubmit}>
								<div className="mb-3">
									<label htmlFor="username" className="form-label">
										Username
									</label>
									<input
										type="text"
										className="form-control"
										id="username"
										name="username"
										onChange={props.handleChange}
										onBlur={props.handleBlur}
										value={props.values.username}
									/>
									<div className="text-danger">
										<small>
											{props.errors.username && props.touched.username && (
												<>
													<i className="bi bi-exclamation-triangle"></i> &nbsp;
													{props.errors.username}
												</>
											)}
										</small>
									</div>
								</div>

								<div className="mb-3">
									<label htmlFor="password" className="form-label">
										Password
									</label>
									<input
										type="password"
										className="form-control"
										id="password"
										name="password"
										onChange={props.handleChange}
										onBlur={props.handleBlur}
										value={props.values.password}
									/>
									<div className="text-danger">
										<small>
											{props.errors.password && props.touched.password && (
												<>
													<i className="bi bi-exclamation-triangle"></i> &nbsp;
													{props.errors.password}
												</>
											)}
										</small>
									</div>
								</div>
								{errorMessage ? (
									<div className="alert alert-danger" role="alert">
										<small>{errorMessage}</small>
									</div>
								) : null}
								<button
									type="submit"
									className="btn btn-pink-subtle w-100"
									disabled={isSubmitting}
								>
									{isSubmitting ? (
										<div className="d-flex justify-content-center">
											<div className="spinner-border" role="status">
												<span className="visually-hidden">Loading...</span>
											</div>
										</div>
									) : (
										"Submit"
									)}
								</button>
								{errorMessage ? (
									<div className="text-center p-3">
										Already have an account? <Link to="/login">Login!</Link>
									</div>
								) : null}
							</form>
						)}
					</Formik>
				</div>
			</div>
		</>
	);
}

export default Register;
