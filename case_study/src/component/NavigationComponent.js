import React from "react";
import { Link } from "react-router-dom";
import image from "../../src/tropical.jpeg";

function NavigationComponent() {
	return (
		<div className=" navigation ">
			<nav className="  d-flex justify-content-center py-3">
				<ul className="nav nav-pills">
					<li className="nav-item">
						<Link className="nav-link text-white" aria-current="page" to="/facilities">
							The Furama
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link text-white" to="/">
							Villa
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link text-white" to="/">
							House
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link text-white" to="/">
							Room
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link text-white" to="/">
							Services
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link text-white" to="/">
							About Us
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}
export default NavigationComponent;
