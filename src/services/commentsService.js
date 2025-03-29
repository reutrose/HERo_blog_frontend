export const getCommentsForArticle = async (article_id) => {
	const requestOptions = {
		method: "GET",
		redirect: "follow",
	};

	const response = await fetch(
		`http://127.0.0.1:8000/api/articles/${article_id}/comments/`,
		requestOptions
	);
	const comments = await response.json();
	return comments;
};

export const createCommentForArticle = async (
	article_id,
	token,
	content,
	reply_to = null
) => {
	try {
		const myHeaders = new Headers();
		myHeaders.append("Authorization", `Bearer ${token}`);
		myHeaders.append("Content-Type", "application/json");

		const raw = JSON.stringify({
			article: article_id,
			content: content,
			reply_to: reply_to,
		});

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		const response = await fetch(
			`http://127.0.0.1:8000/api/comments/`,
			requestOptions
		);
		const comment = await response.json();
		return comment;
	} catch (error) {
		console.error(error);
	}
};

export const deleteCommentFromArticle = async (comment_id, token) => {
	const myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);

	const requestOptions = {
		method: "DELETE",
		headers: myHeaders,
		redirect: "follow",
	};

	try {
		let deleted = await fetch(
			`http://127.0.0.1:8000/api/comments/${comment_id}/`,
			requestOptions
		);

		return { status: deleted.status };
	} catch (error) {
		console.error(error);
	}
};

export const editComment = async (
	article_id,
	updatedComment,
	token,
	comment_id
) => {
	try {
		const myHeaders = new Headers();
		myHeaders.append("Authorization", `Bearer ${token}`);
		myHeaders.append("Content-Type", "application/json");

		const raw = JSON.stringify({
			article: article_id,
			content: updatedComment,
		});

		const requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		let updated = await fetch(
			`http://127.0.0.1:8000/api/comments/${comment_id}/`,
			requestOptions
		);
		updated = await updated.json();
		return updated;
	} catch (error) {
		console.error(error);
	}
};

export const getCommentsByAuthor = async (author_id, pageNum = 1) => {
	try {
		const requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		let response = await fetch(
			`http://127.0.0.1:8000/api/comments/?author_id=${author_id}&page=${pageNum}`,
			requestOptions
		);
		if (response.status == 200) {
			let comments = await response.json();
			return { comments: comments.results, count: comments.count };
		}
		return [];
	} catch (error) {
		console.error(error);
	}
};
