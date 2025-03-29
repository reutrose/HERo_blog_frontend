import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useContext, useState } from "react";
import "./App.css";
import "./assets/scss/main.scss";
import UserContext from "./contexts/UserContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import ArticlesView from "./components/ArticlesView";
import ArticlePage from "./components/ArticlePage";
import CategoriesIndex from "./components/CategoriesIndex";
import Login from "./components/Login";
import Register from "./components/Register";
import SearchModal from "./components/SearchModal";
import UserDashboard from "./components/UserDashboard";
import UserArticleDashboard from "./components/UserArticleDashboard";
import UserCommentDashboard from "./components/UserCommentDashboard";
import CreateArticle from "./components/CreateArticle";
import EditArticle from "./components/EditArticle";
import PageNotFound from "./components/PageNotFound";
import AddArticleButton from "./components/AddArticleButton";
import CategoryArticles from "./components/CategoryArticles";

function App() {
	// eslint-disable-next-line no-unused-vars
	const { userType, userId, username, token } = useContext(UserContext);
	const [articles, setArticles] = useState([]);
	const [showSearchModal, setShowSearchModal] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchActive, setSearchActive] = useState(false);

	return (
		<>
			<div className="container-fluid my-4 bg-pink-subtle">
				<div className="container">
					<div
						className="container bg-white rounded"
						style={{ minHeight: "100vh" }}
					>
						<Router
							future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
						>
							{(userType == "moderator" ||
								userType == "admin" ||
								userType == "superuser") && <AddArticleButton />}
							<div
								className="container d-flex justify-content-center align-items-center"
								style={{ minHeight: "10vh" }}
							>
								<Navbar
									setShowSearchModal={setShowSearchModal}
									setSearchQuery={setSearchQuery}
									setSearchActive={setSearchActive}
								/>
							</div>
							{showSearchModal ? (
								<div
									className="container pt-4 mt-1 pb-5"
									style={{ minHeight: "80vh" }}
								>
									<SearchModal
										setShowSearchModal={setShowSearchModal}
										searchQuery={searchQuery}
										setSearchQuery={setSearchQuery}
										searchActive={searchActive}
										setSearchActive={setSearchActive}
									/>
								</div>
							) : (
								<div
									className="container pt-4 mt-1 pb-5"
									style={{ minHeight: "80vh" }}
								>
									<Routes>
										<Route
											path="/"
											element={
												<Home articles={articles} setArticles={setArticles} />
											}
										/>
										<Route
											path="/articles/"
											element={<ArticlesView articles={articles} />}
										/>
										{userType == "guest" && (
											<>
												<Route path="/login/" element={<Login />} />
												<Route path="/register/" element={<Register />} />
											</>
										)}

										<Route
											path="/articles/create/"
											element={
												userType == "guest" || userType == "user" ? (
													<PageNotFound />
												) : (
													<CreateArticle />
												)
											}
										/>
										{(userType == "moderator" ||
											userType == "admin" ||
											userType == "superuser") && (
											<Route
												path="/articles/:id/edit/"
												element={<EditArticle />}
											/>
										)}

										<Route path="/articles/:id/" element={<ArticlePage />} />

										<Route path="/categories/" element={<CategoriesIndex />} />
										<Route
											path="/categories/:category"
											element={<CategoryArticles />}
										/>
										{userType != "guest" && (
											<Route path="/my-profile/" element={<UserDashboard />} />
										)}
										{(userType == "moderator" ||
											userType == "admin" ||
											userType == "superuser") && (
											<Route
												path="/my-profile/articles"
												element={<UserArticleDashboard />}
											/>
										)}
										{userType != "guest" && (
											<Route
												path="/my-profile/comments"
												element={<UserCommentDashboard />}
											/>
										)}
										<Route path="*" element={<PageNotFound />} />
									</Routes>
								</div>
							)}
							<div
								className="container-fluid pt-4 pb-4"
								style={{ minHeight: "10vh" }}
							>
								<Footer />
							</div>
						</Router>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
