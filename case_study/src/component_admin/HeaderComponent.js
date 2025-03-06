import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/accountAction";
import { FaBars, FaBell, FaSearch } from "react-icons/fa";
import Image from "react-bootstrap/Image";
import logo from "../Logo.png";

function HeaderComponent() {
	const account = useSelector((state) => state?.user?.account);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		navigate("/");
	};

	return (
		<div className="container-fluid px-3">
			<header className="d-flex align-items-center justify-content-between py-2 border-bottom">
				{/* Menu Icon
				<button className="btn d-md-none">
					<FaBars size={22} />
				</button> */}

				{/* Logo */}
				<Link to="/furama" className="d-flex align-items-center">
					<Image src={logo} alt="Furama Logo" className="me-2" style={{ height: "70px", width: "auto" }} />
				</Link>

				<div className="d-flex align-items-center gap-3">
					{account && (
						<div className="d-flex align-items-center gap-2">
							<Image
								src={account?.avatar ? account.avatar : "/image/avatar.jpg"}
								alt="avatar"
								width={35}
								height={35}
								className="rounded-circle"
								style={{ objectFit: "cover" }}
							/>
							<div
								className="fw-bold text-truncate"
								style={{ maxWidth: "100px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
							>
								{account?.userName ?? "User"}
							</div>
							<Link className="btn btn-custom-outline ms-1" id="logoutButton" onClick={handleLogout} to={"/furama"}>
								Đăng xuất
							</Link>
						</div>
					)}

					{!account && (
						<Link className="btn btn-custom-outline" to={"/login"}>
							Đăng nhập
						</Link>
					)}
				</div>
			</header>
		</div>
	);
}

export default HeaderComponent;
