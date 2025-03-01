import React from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/accountAction";

function HeaderComponent() {
	const account = useSelector((state) => state.user.account);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleLogout = () => {
		dispatch(logout());
		navigate("/");
	};
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
						<Link className="btn btn-secondary" to={"/login"}>
							Sign in
						</Link>
					</li>
					<li className="nav-item ms-auto">
						<div className="  mt-2 ms-2 fw-bold ">{account && account.username}</div>
					</li>
					<li className="nav-item ms-auto">
						{account && (
							<div className=" btn btn-outline-secondary ms-3  " onClick={handleLogout} Logout>
								Logout
							</div>
						)}
					</li>
				</ul>
			</header>
		</div>
	);
}
export default HeaderComponent;
