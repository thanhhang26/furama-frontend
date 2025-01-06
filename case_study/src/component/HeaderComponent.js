import React from "react";
import { Link } from "react-router-dom";
import image from "../Logo.png";

function HeaderComponent() {
	return (
		<div className="container">
			<header className="d-flex flex-wrap justify-content-center py-3 border-bottom">
				<Link className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none" to="/">
					<svg className="bi me-2" width={40} height={32}>
						<use xlinkHref="#bootstrap" />
					</svg>
					<img src={image} alt="Furama Logo" className=" logo me-2" />
				</Link>
				<ul className="nav nav-pills">
					<li className="nav-item">
						<Link className="nav-link text-dark">Support</Link>
					</li>
					<li className="nav-item">
						<Link className="btn btn-secondary">Sign in</Link>
					</li>
				</ul>
			</header>
		</div>
	);
}
export default HeaderComponent;
