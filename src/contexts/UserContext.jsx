import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import { getTokenFromStorage } from "../services/UsersService";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
	const [userType, setUserType] = useState("guest");
	const [username, setUsername] = useState("");
	const [userId, setUserId] = useState("");
	const [token, setToken] = useState("");

	const userHandler = async () => {
		let token = getTokenFromStorage();
		if (token) {
			let decodedToken = jwtDecode(token);
			setUserType(decodedToken.role);
			setUsername(decodedToken.username);
			setUserId(decodedToken.user_id);
			setToken(token);
		} else {
			setUserType("guest");
		}
	};

	useEffect(() => {
		userHandler();
	}, []);

	return (
		<UserContext.Provider
			value={{
				userType,
				setUserType,
				userId,
				username,
				token,
				setToken,
				userHandler,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

UserContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default UserContext;
