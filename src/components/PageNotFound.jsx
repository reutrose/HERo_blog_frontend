function PageNotFound() {
	return (
		<>
			<div className="container d-flex h-100 p-5 flex-column justify-content-center align-items-center">
				<p>Oops...</p>
				<p className="display-5 fw-bold">Page Not Found!</p>
				<div className="display-1">
					<i className="bi bi-emoji-frown text-pink"></i>
				</div>
			</div>
		</>
	);
}

export default PageNotFound;
