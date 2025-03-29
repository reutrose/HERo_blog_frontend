import { Field, Formik } from "formik";
import * as Yup from "yup";
import { login } from "../services/UsersService";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";

function Login() {
	const nav = useNavigate();
	const { userHandler } = useContext(UserContext);
	const [errorMessage, setErrorMessage] = useState(null);

	const handleLogin = async (values, actions) => {
		let response = await login(values);
		if (response.status != 200) {
			setErrorMessage(
				"Something went wrong. Please check your username and password."
			);
			return;
		} else {
			userHandler();
			actions.setSubmitting(false);
			actions.resetForm({
				username: "",
				password: "",
				remember: false,
			});
			nav("/");
		}
	};

	return (
		<>
			<div className="container d-flex justify-content-center align-items-center">
				<div className="col-12 col-md-6">
					<h2 className="fw-bold text-center">Login</h2>
					<hr className="border-pink" />
					<Formik
						initialValues={{ username: "", password: "", toggle: false }}
						validationSchema={Yup.object({
							username: Yup.string().required("Username is required."),
							password: Yup.string().required("Password is required."),
						})}
						onSubmit={(values, actions) => {
							setTimeout(() => {
								handleLogin(values, actions);
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

								<div className="d-flex justify-content-center align-items-center">
									<div className="mb-3 form-check">
										<label>
											<Field type="checkbox" name="toggle" />
											&nbsp;Remember me
										</label>
									</div>
								</div>
								{errorMessage ? (
									<div className="alert alert-danger" role="alert">
										<small>{errorMessage}</small>
									</div>
								) : null}
								<button type="submit" className="btn btn-pink-subtle w-100">
									Submit
								</button>
								{errorMessage ? (
									<div className="text-center p-3">
										Don&apos;t have an account?{" "}
										<Link to="/register">Register now!</Link>
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

export default Login;
