import { useEffect, useState } from "react";

function DeleteArticleModal({ handleDelete, setDeleteModal }) {
	const [performing, setPerforming] = useState(false);

	useEffect(() => {
		setPerforming(false);
	}, []);

	return (
		<>
			<div className="delete-article-modal">
				<div className="row w-100 d-flex justify-content-center align-items-center">
					<div className="col-9 col-md-6 bg-white rounded-3 text-dark">
						<div className="container p-5 text-center">
							{performing ? (
								<div className="d-flex align-items-center">
									<strong>Loading...</strong>
									<div
										className="spinner-border ms-auto"
										role="status"
										aria-hidden="true"
									></div>
								</div>
							) : (
								<p className="fs-5 fw-bold">
									Are you sure you want to delete that article?
								</p>
							)}
						</div>
						<div className="row m-0 p-0">
							<div className="col-6 text-center m-0 p-1">
								<button
									className="btn btn-danger w-100 my-2"
									onClick={() => {
										setPerforming(true);
										handleDelete();
									}}
								>
									Delete
								</button>
							</div>
							<div className="col-6 text-center m-0 p-1">
								<button
									className="btn btn-secondary w-100 my-2"
									onClick={() => {
										setDeleteModal(false);
									}}
								>
									Back
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default DeleteArticleModal;
