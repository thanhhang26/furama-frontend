import React from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/accountAction";
import { Nav } from "react-bootstrap";
import Image from "react-bootstrap/Image";

function HeaderComponent() {
	const account = useSelector((state) => state?.user?.account);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleLogout = () => {
		dispatch(logout());
		navigate("/");
	};
	return (
		<div className="container">
			<header className="d-flex flex-wrap justify-content-center py-3 border-bottom">
				<Link className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none" to="/furama">
					<svg className="bi me-2" width={40} height={32}>
						<use xlinkHref="#bootstrap" />
					</svg>
					<img src={image} alt="Furama Logo" className=" logo me-2" />
				</Link>
				<ul className="nav nav-pills">
					{!account && (
						<li className="nav-item">
							<Link className="btn btn-custom-outline mt-3" to={"/login"}>
								Đăng nhập
							</Link>
						</li>
					)}

					{account && (
						<ul className="nav nav-pills mt-3">
							<li className="nav-item me-3">
								<img
									src={account?.avatar ? account.avatar : "/image/avatar.jpg"}
									alt="avatar"
									width={40}
									height={40}
									className="rounded-circle"
									style={{
										objectFit: "cover",
									}}
								/>
							</li>
							<li className="nav-item">
								<Link className="btn btn-custom-outline ms-1 " id="logoutButton" onClick={handleLogout} to={"/furama"}>
									Đăng xuất
								</Link>
							</li>
						</ul>
					)}
				</ul>
			</header>
		</div>
	);
}
export default HeaderComponent;
