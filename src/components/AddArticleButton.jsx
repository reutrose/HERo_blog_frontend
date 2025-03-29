import { useNavigate } from "react-router-dom";

function AddArticleButton() {
	const nav = useNavigate();
	return (
		<>
			<button
				className="btn btn-pink rounded-pill text-white add-article-button"
				onClick={() => {
					nav("/articles/create/");
				}}
			>
				<i className="bi bi-plus fs-4"></i>
			</button>
		</>
	);
}

export default AddArticleButton;
