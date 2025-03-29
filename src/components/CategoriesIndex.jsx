import { useNavigate } from "react-router-dom";
import { categories } from "../services/articlesService";

function CategoriesIndex() {
	const nav = useNavigate();
	return (
		<>
			<div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
				{categories && categories.length ? (
					categories.map((category, index) => {
						return (
							<div className="col" key={index}>
								<button
									className="btn btn-invisible-gray w-100 mt-4 p-0 py-5 fw-bold fs-4"
									onClick={() => {
										nav(`/categories/${category}/`);
									}}
								>
									{category}
								</button>
							</div>
						);
					})
				) : (
					<p>No Categories Found.</p>
				)}
			</div>
		</>
	);
}

export default CategoriesIndex;
