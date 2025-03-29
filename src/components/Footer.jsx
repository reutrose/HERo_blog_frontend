import { Link } from "react-router-dom";

function Footer() {
	return (
		<>
			<div className="container rounded bg-dark">
				<div className="row text-light">
					<div className="col-6 col-md-4">
						<img src="/HERo-nobg.svg" alt="HERo" width="100" height="50" />
					</div>
					<div className="col-6 col-md-4 p-2">
						<h5>Pages</h5>
						<hr />
						<ul style={{ listStyleType: "none" }} className="list-group">
							<li>
								<Link className="text-decoration-none text-light">
									About Us
								</Link>
							</li>
							<li>
								<Link className="text-decoration-none text-light">
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link className="text-decoration-none text-light">
									Our Articles
								</Link>
							</li>
							<li>
								<Link className="text-decoration-none text-light">
									Categories
								</Link>
							</li>
						</ul>
					</div>
					<div className="col-12 col-md-4 p-2">
						<h5>Join Our Newsletter</h5>
						<hr />
						<div className="input-group mb-3">
							<input
								type="email"
								className="form-control"
								placeholder="Email"
								aria-label="Email"
								aria-describedby="button-addon2"
								style={{ backgroundColor: "pink" }}
							/>
							<button
								className="btn btn-outline-pink-subtle"
								type="button"
								id="button-addon2"
							>
								Join
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Footer;
