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

		let loginResponse = await fetch(
			"http://127.0.0.1:8000/api/auth/login/",
			requestOptions
		);

		if (loginResponse.status === 200) {
			let response = await loginResponse.json();
			let token = response.jwt.access;

			if (credentials.toggle) {
				localStorage.setItem("token", token);
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
			"http://127.0.0.1:8000/api/auth/register/",
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
