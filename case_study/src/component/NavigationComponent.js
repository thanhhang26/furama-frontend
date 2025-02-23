import React from "react";
import { Link } from "react-router-dom";
import image from "../../src/tropical.jpeg";

function NavigationComponent() {
	return (
		<div className=" navigation ">
			<nav className="  d-flex justify-content-center py-3">
				<ul className="nav nav-pills">
					<li className="nav-item">
						<Link className="nav-link text-white" aria-current="page" to="/homepage">
							Giới thiệu
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link text-white" to="/facilities">
							Loại phòng
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link text-white" to="/">
							Sapa
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link text-white" to="/">
							Các loại dịch vụ khác
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link text-white" to="/">
							Liên hệ
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}
export default NavigationComponent;
