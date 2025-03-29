export const search = async (searchQuery) => {
	try {
		const requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		let response = await fetch(
			`http://127.0.0.1:8000/api/articles/?search=${searchQuery}`,
			requestOptions
		);

		let results = await response.json();
		results = results.results;
		return results;
	} catch (error) {
		console.error(error);
	}
};
