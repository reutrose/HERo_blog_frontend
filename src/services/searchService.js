const API_URL = import.meta.env.VITE_API_URL;
const ARTICLES_API_URL = `${API_URL}articles`;

export const search = async (searchQuery) => {
	try {
		const requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		let response = await fetch(
			`${ARTICLES_API_URL}/?search=${searchQuery}`,
			requestOptions
		);

		let results = await response.json();
		results = results.results;
		return results;
	} catch (error) {
		console.error(error);
	}
};
