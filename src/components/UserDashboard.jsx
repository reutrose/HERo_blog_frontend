import { useContext, useEffect, useState } from "react";
import { getArticleByAuthor } from "../services/articlesService";
import UserContext from "../contexts/UserContext";
import RecentUserArticles from "./RecentUserArticles";
import { getCommentsByAuthor } from "../services/commentsService";
import RecentUserComments from "./RecentUserComments";

function UserDashboard() {
	const { userType, userId, username } = useContext(UserContext);
	const [userArticles, setUserArticles] = useState([]);
	const [userComments, setUserComments] = useState([]);

	useEffect(() => {
		const handleArticles = async () => {
			let response = await getArticleByAuthor(userId);
			setUserArticles(response.articles);
		};

		const handleComments = async () => {
			let response = await getCommentsByAuthor(userId);
			setUserComments(response.comments);
		};
		handleArticles();
		handleComments();
	}, [userId]);

	return (
		<>
			<div>
				<h2 className="text-center p-3 text-pink">
					<span className="text-capitalize">{username}</span>&apos;s Dashboard
				</h2>
				{userType == "superuser" || userType == "moderator" ? (
					<RecentUserArticles userArticles={userArticles} />
				) : null}
				<RecentUserComments userComments={userComments} />
			</div>
		</>
	);
}

export default UserDashboard;
