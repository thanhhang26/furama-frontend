import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../service/accountService";
import { login } from "../redux/accountAction";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { Col, Row } from "react-bootstrap";

function LoginComponent() {
	const [user] = useState({ userName: "", password: "" });
	const account = useSelector((state) => state?.user?.account);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (account) navigate("/furama");
	}, [account, navigate]);

	const handleSubmit = async (value) => {
		const result = await checkLogin(value);
		if (result) {
			window.localStorage.setItem("user", JSON.stringify(result));
			dispatch(login(result));
			toast.success("Đăng nhập thành công");
		} else {
			toast.error("Sai tài khoản hoặc mật khẩu");
		}
	};

	const validationSchema = Yup.object({
		userName: Yup.string().required("Không được để trống"),
		password: Yup.string().required("Không được để trống"),
	});

	return (
		<div
			className="login-container"
			style={{
				backgroundImage:
					"url('https://sktravel.com.vn/wp-content/uploads/2021/05/top-4-khach-san-resort-co-khong-gian-thien-nhien-dep-nhat-nha-trang.jpg')",
			}}
		>
			<div className="login-overlay"></div>
			<div className="login-card shadow">
				<h3 className="text-center mb-4">Đăng nhập</h3>
				<Formik initialValues={user} onSubmit={handleSubmit} validationSchema={validationSchema}>
					<Form>
						<div className="mb-3">
							<label className="form-label">Tên đăng nhập hoặc email:</label>
							<Field type="text" name="userName" className="form-control" placeholder="Tên đăng nhập hoặc email" />
							<ErrorMessage name="username" component="div" className="text-danger mt-2" />
						</div>
						<div className="mb-3">
							<label className="form-label">Mật khẩu:</label>
							<Field type="password" name="password" className="form-control" placeholder="Nhập mật khẩu" />
							<ErrorMessage name="password" component="div" className="text-danger mt-2" />
						</div>
						<div className="text-center">
							<button type="submit" className="btn mt-3 w-100 btn-custom-outline">
								Đăng nhập
							</button>
						</div>
						<div className="mt-3 d-flex justify-content-between">
							<div>
								<Link to="/register" className="text-decoration-none" style={{ color: "#04605" }}>
									Bạn chưa có tài khoản?
								</Link>
							</div>
							<div>
								<Link to="/" className="text-decoration-none " style={{ color: "#04605" }}>
									Quên mật khẩu?
								</Link>
							</div>
						</div>
					</Form>
				</Formik>
			</div>
		</div>
	);
}

export default LoginComponent;
