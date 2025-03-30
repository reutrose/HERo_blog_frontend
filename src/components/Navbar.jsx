import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { categories } from "../services/articlesService";
import { logout } from "../services/usersService";

function Navbar({
	setShowSearchModal,
	setSearchQuery,
	setSearchActive,
	setIsSearching,
}) {
	const { userType, username, userHandler } = useContext(UserContext);
	const nav = useNavigate();

	const handleLogout = async () => {
		try {
			await logout();
			await userHandler();
			nav("/login/");
		} catch (error) {
			console.error(error);
		}
	};

	const handleSearch = async (value) => {
		if (value != null) {
			setShowSearchModal(true);
			setSearchActive(true);
		}
		setSearchQuery(value);
	};

	return (
		<>
			<div className="container text-raleway fw-bold">
				<nav className="navbar navbar-expand-lg bg-white">
					<div className="container-fluid">
						<NavLink className="navbar-brand" to="/">
							<img src="/HERo-nobg.svg" alt="HERo" width="70" height="30" />
						</NavLink>
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContent"
							aria-controls="navbarSupportedContent"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<div
							className="collapse navbar-collapse"
							id="navbarSupportedContent"
						>
							<ul className="navbar-nav me-auto mb-2 mb-lg-0">
								<li className="nav-item me-3">
									<NavLink
										className="nav-link"
										aria-current="page"
										to="/"
										onClick={() => {
											setShowSearchModal(false);
										}}
									>
										Home
									</NavLink>
								</li>
								<li className="nav-item  me-3">
									<NavLink
										className="nav-link"
										to="/articles/"
										onClick={() => {
											setShowSearchModal(false);
										}}
									>
										Articles
									</NavLink>
								</li>
								<li className="nav-item me-3">
									<div className="btn-group">
										<NavLink
											className="nav-link"
											aria-current="page"
											to="/categories/"
											onClick={() => {
												setShowSearchModal(false);
											}}
										>
											Categories
										</NavLink>
										<button
											type="button"
											className="btn btn-white dropdown-toggle dropdown-toggle-split border-0"
											data-bs-toggle="dropdown"
											aria-expanded="false"
											onClick={() => {
												setShowSearchModal(false);
											}}
										>
											<span className="visually-hidden">Toggle Dropdown</span>
										</button>
										<ul className="dropdown-menu">
											{categories.map((category, index) => (
												<li key={index}>
													<NavLink
														className="dropdown-item text-capitalize"
														to={`categories/${category}/`}
													>
														{category}
													</NavLink>
												</li>
											))}
										</ul>
									</div>
								</li>
							</ul>
							<form className="d-flex" role="search">
								<div className="input-group">
									<input
										className="form-control border-0 border-start border-top border-bottom bg-white"
										type="search"
										placeholder="Search"
										aria-label="Search"
										onFocus={() => {
											setShowSearchModal(true);
										}}
										onChange={(e) => {
											handleSearch(e.target.value);
											setIsSearching(true);
										}}
										onBlur={(e) => {
											e.target.value = "";
										}}
									/>
									<div className="bg-white border-end border-top border-bottom rounded-end p-2 d-flex justify-content-center align-items-center">
										<i className="bi bi-search text-invisible-gray"></i>
									</div>
								</div>
							</form>
							<div className="dropdown m-2">
								<button
									className="btn text-pink-subtle"
									type="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<i className="bi bi-person-circle fs-4"></i>
								</button>
								<ul className="dropdown-menu dropdown-menu-end">
									<li>
										<div className="container text-capitalize">
											Hello, {userType == "guest" ? "guest!" : `${username}!`}
										</div>
									</li>
									<li>
										<hr className="dropdown-divider" />
									</li>
									<li>
										<div className="container-fluid">
											<Link
												className="dropdown-item"
												to={`${userType == "guest" ? "login" : "my-profile"}`}
											>
												<div className="row">
													<div className="col text-start">
														{userType == "guest" ? "Login" : "Profile"}
													</div>
													<div className="col text-end">
														<i className="bi bi-caret-right-fill"></i>
													</div>
												</div>
											</Link>
										</div>
									</li>
									<li>
										<div className="container-fluid">
											<Link
												className="dropdown-item"
												to={userType === "guest" ? "/register" : undefined}
												onClick={
													userType !== "guest" ? handleLogout : undefined
												}
											>
												<div className="row">
													<div className="col text-start">
														{userType == "guest" ? "Register" : "Logout"}
													</div>
													<div className="col text-end">
														<i className="bi bi-caret-right-fill"></i>
													</div>
												</div>
											</Link>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</nav>
			</div>
		</>
	);
}

export default Navbar;
