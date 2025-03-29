const API_URL = import.meta.env.VITE_API_URL;
const ARTICLES_API_URL = `${API_URL}/articles`;

export const getAllArticles = async (page = 1) => {
	try {
		const requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		let response = await fetch(
			`${ARTICLES_API_URL}/?ordering=-created_at&page=${page}`,
			requestOptions
		);

		let articles = await response.json();
		return { articles: articles.results, count: articles.count };
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const getArticleById = async (id) => {
	try {
		const requestOptions = {
			method: "GET",
			redirect: "follow",
		};
		const response = await fetch(`${ARTICLES_API_URL}/${id}`, requestOptions);
		const article = await response.json();
		return article;
	} catch (error) {
		console.error(error);
	}
};

export const getArticleByAuthor = async (author_id, pageNum = 1) => {
	try {
		const requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		let response = await fetch(
			`${ARTICLES_API_URL}/?author=${author_id}&page=${pageNum}`,
			requestOptions
		);
		if (response.status == 200) {
			let articles = await response.json();
			return { articles: articles.results, count: articles.count };
		}
		return [];
	} catch (error) {
		console.error(error);
	}
};

export const getArticleLikes = async (article_id) => {
	try {
		const requestOptions = {
			method: "GET",
			redirect: "follow",
		};
		const response = await fetch(
			`${ARTICLES_API_URL}/${article_id}/likes/`,
			requestOptions
		);
		const likes = await response.json();
		return likes;
	} catch (error) {
		console.error(error);
	}
};

export const likeArticle = async (article_id, token) => {
	try {
		const myHeaders = new Headers();
		myHeaders.append("Authorization", `Bearer ${token}`);
		myHeaders.append("Content-Type", "application/json");

		const body = JSON.stringify({
			article: article_id,
		});

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: body,
			redirect: "follow",
		};

		const response = await fetch(`${API_URL}/likes/`, requestOptions);
		const like = await response.json();
		return like;
	} catch (error) {
		console.error(error);
	}
};

export const unlikeArticle = async (token, like_id) => {
	try {
		const myHeaders = new Headers();
		myHeaders.append("Authorization", `Bearer ${token}`);

		const requestOptions = {
			method: "DELETE",
			headers: myHeaders,
			redirect: "follow",
		};

		const response = await fetch(
			`${API_URL}/likes/${like_id}/`,
			requestOptions
		);

		return response;
	} catch (error) {
		console.error(error);
	}
};

export const checkIfUserLiked = async (likes = [], userId) => {
	try {
		let userLiked = [];
		likes.map((like) => {
			if (like.user_id == userId) {
				userLiked.push(like);
			}
		});
		if (userLiked.length > 0) {
			return { exists: true, like_id: userLiked[0].id };
		}
		return false;
	} catch (error) {
		console.error(error);
	}
};

export const createArticle = async (article, token) => {
	try {
		const myHeaders = new Headers();
		myHeaders.append("Authorization", `Bearer ${token}`);

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: article,
			redirect: "follow",
		};

		const response = await fetch(`${ARTICLES_API_URL}/`, requestOptions);

		if (!response.ok) {
			const errorData = await response.json();
			console.error("Error response:", errorData);
			throw new Error(`Error: ${response.status}`);
		}

		let newArticle = response.json();
		return newArticle;
	} catch (error) {
		console.error("Error creating article:", error);
		throw error;
	}
};

export const editArticle = async (article_id, updatedArticle, token) => {
	const myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);

	const requestOptions = {
		method: "PUT",
		headers: myHeaders,
		body: updatedArticle,
		redirect: "follow",
	};

	try {
		const response = await fetch(
			`${ARTICLES_API_URL}/${article_id}/`,
			requestOptions
		);

		if (!response.ok) {
			const errorData = await response.json();
			console.error("Error response:", errorData);
			throw new Error(`Error: ${response.status}`);
		}

		let updated = await response.json();
		return updated;
	} catch (error) {
		console.error(error);
	}
};

export const deleteArticle = async (article_id, token) => {
	try {
		const myHeaders = new Headers();
		myHeaders.append("Authorization", `Bearer ${token}`);

		const requestOptions = {
			method: "DELETE",
			headers: myHeaders,
			redirect: "follow",
		};

		let deleted = await fetch(
			`http://127.0.0.1:8000/api/articles/${article_id}/`,
			requestOptions
		);
		return { status: deleted.status };
	} catch (error) {
		console.error(error);
	}
};

export const getArticlesOfCategory = async (category, page = 1) => {
	const requestOptions = {
		method: "GET",
		redirect: "follow",
	};

	try {
		const response = await fetch(
			`${ARTICLES_API_URL}/?category=${category}&page=${page}`,
			requestOptions
		);

		let articles = await response.json();
		return { articles: articles.results, count: articles.count };
	} catch (error) {
		console.error(error);
	}
};

export const categories = [
	"General",
	"Technology",
	"Wellness",
	"Health",
	"Fitness",
	"Nutrition",
	"Beauty",
	"Fashion",
	"Lifestyle",
	"Motherhood",
	"Parenting",
	"Relationships",
	"Selfcare",
	"Mindset",
	"Career",
	"Finance",
	"Business",
	"Leadership",
	"Empowerment",
	"Education",
	"Travel",
	"Home",
	"Entertainment",
	"Community",
];
