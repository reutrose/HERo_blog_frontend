import { Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import { formatBirthDate } from "../helpers/datetimeHelper";
import { editUserProfile, getUserProfileById } from "../services/usersService";

function EditUserProfile() {
	const nav = useNavigate();
	const { userId, token } = useContext(UserContext);
	const [user, setUser] = useState({});
	const [isFetching, setIsFetching] = useState(true);

	useEffect(() => {
		const getUser = async () => {
			let userProfile = await getUserProfileById(userId);
			setUser(userProfile);
			setIsFetching(false);
		};
		getUser();
	}, [userId]);

	return (
		<>
			{!isFetching ? (
				<div className="container">
					<div>
						<button
							className="btn btn-invisible-gray"
							onClick={() => {
								nav(-1);
							}}
						>
							Back to Profile
						</button>
					</div>
					<h3 className="text-center fw-bold display-6">Edit User</h3>
					<hr />
					{isFetching ? (
						<div className="d-flex justify-content-center">
							<div className="spinner-border" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
						</div>
					) : user.id != userId ? (
						<PageNotFound />
					) : (
						<Formik
							initialValues={{
								first_name: user.first_name || "",
								last_name: user.last_name || "",
								profession: user.profession || "",
								bio: user.bio || "",
								profile_pic: user.profile_pic || null,
								birth_date: user.birth_date
									? formatBirthDate(user.birth_date)
									: "1990-08-01",
							}}
							validationSchema={Yup.object({
								first_name: Yup.string().max(
									150,
									"First name can contain maximum 150 characters."
								),
								last_name: Yup.string().max(
									150,
									"Last name can contain maximum 150 characters."
								),
								profession: Yup.string().max(
									150,
									"Profession can contain maximum 150 characters."
								),
								bio: Yup.string().max(
									1000,
									"Bio can contain maximum 150 characters."
								),
								profile_pic: Yup.mixed().nullable(),
								birth_date: Yup.date()
									.nullable()
									.min(new Date(1900, 0, 1), "Birth date must be after 1900")
									.max(new Date(), "Birth date cannot be in the future"),
							})}
							onSubmit={async (values, actions) => {
								const formData = new FormData();
								formData.append("first_name", values.first_name);
								formData.append("last_name", values.last_name);
								formData.append("profession", values.profession);
								formData.append("bio", values.bio);
								formData.append(
									"birth_date",
									formatBirthDate(values.birth_date)
								);

								if (values.profile_pic instanceof File) {
									formData.append("profile_pic", values.profile_pic);
								}

								try {
									const response = await editUserProfile(
										userId,
										formData,
										token
									);
									if (response) {
										nav(`/my-profile/`);
									}
								} catch (error) {
									console.error("Failed to submit user:", error);
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
											id="first_name"
											name="first_name"
											placeholder="First Name"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.first_name}
										/>
										<label htmlFor="first_name">First Name</label>
										{errors.first_name && touched.first_name && (
											<div className="text-danger small">
												{errors.first_name}
											</div>
										)}
									</div>
									<div className="form-floating mt-3">
										<input
											type="text"
											className="form-control"
											id="last_name"
											name="last_name"
											placeholder="Last Name"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.last_name}
										/>
										<label htmlFor="last_name">Last Name</label>
										{errors.last_name && touched.last_name && (
											<div className="text-danger small">
												{errors.last_name}
											</div>
										)}
									</div>
									<div className="form-floating mt-3">
										<input
											type="text"
											className="form-control"
											id="profession"
											name="profession"
											placeholder="Profession"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.profession}
										/>
										<label htmlFor="profession">Profession</label>
										{errors.profession && touched.profession && (
											<div className="text-danger small">
												{errors.profession}
											</div>
										)}
									</div>
									<div className="form-floating mt-3">
										<textarea
											name="bio"
											id="bio"
											className="form-control"
											placeholder="Bio"
											style={{ resize: "none", height: "300px" }}
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.bio}
										></textarea>
										<label htmlFor="bio">Bio</label>
										{errors.bio && touched.bio && (
											<div className="text-danger small">{errors.bio}</div>
										)}
									</div>
									<div className="form-floating mt-3">
										<input
											type="date"
											className="form-control"
											id="birth_date"
											name="birth_date"
											placeholder="Birth Date"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.birth_date}
										/>
										<label htmlFor="birth_date">Birth Date</label>
										{errors.birth_date && touched.birth_date && (
											<div className="text-danger small">
												{errors.birth_date}
											</div>
										)}
									</div>
									<div className="mt-3 mb-3">
										<label htmlFor="image" className="form-label">
											Image Upload
										</label>
										<input
											type="file"
											className="form-control"
											id="profile_pic"
											name="profile_pic"
											accept="profile_pic/*"
											onChange={(event) => {
												setFieldValue(
													"profile_pic",
													event.currentTarget.files[0]
												);
											}}
										/>
										{errors.profile_pic && touched.profile_pic && (
											<div className="text-danger small">
												{errors.profile_pic}
											</div>
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
				</div>
			) : (
				<div className="d-flex justify-content-center">
					<div className="spinner-border text-pink" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			)}
		</>
	);
}

export default EditUserProfile;
