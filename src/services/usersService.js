const API_URL = import.meta.env.VITE_API_URL;
const AUTH_API_URL = `${API_URL}/auth`;
const PROFILES_API_URL = `${API_URL}/user-profiles`;

export const getTokenFromStorage = () => {
	try {
		let localStorageToken = localStorage.getItem("token");
		let sessionStorageToken = sessionStorage.getItem("token");
		return localStorageToken || sessionStorageToken || null;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const logout = async () => {
	try {
		sessionStorage.removeItem("token");
		localStorage.removeItem("token");
	} catch (error) {
		console.error(error);
	}
};

export const login = async (credentials) => {
	try {
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		const raw = JSON.stringify({
			username: credentials.username,
			password: credentials.password,
		});

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		let loginResponse = await fetch(`${AUTH_API_URL}/login/`, requestOptions);

		if (loginResponse.status === 200) {
			let response = await loginResponse.json();
			let token = response.jwt.access;

			if (credentials.toggle) {
				localStorage.setItem("token", token);
				sessionStorage.setItem("token", token);
			} else {
				sessionStorage.setItem("token", token);
			}

			return { status: loginResponse.status, token };
		}
		return { status: loginResponse.status, token: null };
	} catch (error) {
		console.error(error);
		return { status: error?.status || 500, token: null };
	}
};

export const register = async (newUser) => {
	try {
		const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		const raw = JSON.stringify({
			username: newUser.username,
			password: newUser.password,
		});

		const requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		let registerResponse = await fetch(
			`${AUTH_API_URL}/register/`,
			requestOptions
		);
		if (registerResponse.status == 200) {
			let response = await registerResponse.json();
			let token = response.jwt.access;
			sessionStorage.setItem("token", token);
			return { status: registerResponse.status, token: token };
		}
		return { status: registerResponse.status, token: null };
	} catch (error) {
		console.error(error);
		return { status: error.status, token: null };
	}
};

export const getUserProfileById = async (user_id) => {
	const requestOptions = {
		method: "GET",
		redirect: "follow",
	};

	try {
		const response = await fetch(
			`${PROFILES_API_URL}/${user_id}/`,
			requestOptions
		);
		const article = await response.json();
		return article;
	} catch (error) {
		console.error(error);
	}
};

export const editUserProfile = async (user_id, newData, token) => {
	const myHeaders = new Headers();
	myHeaders.append("Authorization", `Bearer ${token}`);

	const requestOptions = {
		method: "PUT",
		headers: myHeaders,
		body: newData,
		redirect: "follow",
	};

	try {
		const response = await fetch(
			`${PROFILES_API_URL}/${user_id}/`,
			requestOptions
		);
		if (!response.ok) {
			const errorData = await response.json();
			console.error("Error response:", errorData);
			throw new Error(`Error: ${response.status}`);
		}

		let updatedUser = await response.json();
		return updatedUser;
	} catch (error) {
		console.error(error);
	}
};
