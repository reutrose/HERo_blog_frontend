import { useContext, useEffect, useState } from "react";
import { getUserProfileById } from "../services/usersService";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function UserProfileDashboard() {
	const { userId } = useContext(UserContext);
	const [user, setUser] = useState({});
	const [isFetching, setIsFetching] = useState(true);
	const nav = useNavigate();

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
			<div className="container mt-5">
				<div className="row">
					<div className="col-9">
						<h3 className="fw-bold">Your Profile</h3>
					</div>
					<div className="col-3 d-flex justify-content-end align-items-center">
						<button
							className="btn btn-pink text-white"
							onClick={() => {
								nav("/my-profile/edit/");
							}}
							style={{ borderRadius: "50%" }}
						>
							<i className="bi bi-pencil-square"></i>
						</button>
					</div>
				</div>
				<hr />
				{!isFetching && (
					<div className="row">
						<div className="col-12 col-md-2 p-2 d-flex justify-content-center align-items-center">
							<img
								src={
									user.profile_pic
										? user.profile_pic
										: "https://loudouncslcenter.com/wp-content/uploads/default-avatar-icon-of-social-media-user-vector.jpg"
								}
								width={100}
								height={100}
								className="border rounded-pill"
								alt="avatar"
							/>
						</div>
						<div className="col-12 col-md-5">
							<div className="d-flex flex-column justify-content-start align-items-center">
								<div className="container">
									<p className="p-0 m-0">
										<span className="fs-6 fw-bold">Username</span>
										&nbsp;&nbsp;&nbsp;{user.username}
									</p>
									<p className="p-0 m-0">
										<span className="fs-6 fw-bold">First Name</span>
										&nbsp;&nbsp;&nbsp;{user.first_name ? user.first_name : ""}
									</p>
									<p className="p-0 m-0">
										<span className="fs-6 fw-bold">Last Name</span>
										&nbsp;&nbsp;&nbsp;{user.last_name ? user.last_name : ""}
									</p>
									<p className="p-0 m-0">
										<span className="fs-6 fw-bold">Birth Date</span>
										&nbsp;&nbsp;&nbsp;{user.birth_date ? user.birth_date : ""}
									</p>
									<p className="p-0 m-0">
										<span className="fs-6 fw-bold">Profession</span>
										&nbsp;&nbsp;&nbsp;{user.profession ? user.profession : ""}
									</p>
								</div>
							</div>
						</div>
						<div className="col-12 col-md-5">
							<div className="container">
								<p className="p-0 m-0">
									<span className="fs-5 fw-bold">Bio</span>
								</p>
								<p className="p-0 m-0">{user.bio ? user.bio : ""}</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default UserProfileDashboard;
