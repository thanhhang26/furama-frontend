import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React from "react";
import { checkUser, registerUser } from "../service/accountService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Register() {
	const initialValues = { email: "", userName: "", password: "", confirmPassword: "" };
	const navigate = useNavigate();

	const handleSubmit = async (values, { resetForm }) => {
		const isUserExist = await checkUser(values.email);
		if (isUserExist) {
			toast.error("Email đã tồn tại!");
			return;
		}
		const success = await registerUser({
			email: values.email,
			userName: values.userName,
			password: values.password,
		});
		if (success) {
			toast.success("Đăng ký thành công! Vui lòng đăng nhập lại");
			resetForm();
			navigate("/login");
		} else {
			toast.error("Lỗi đăng ký. Vui lòng thử lại!");
		}
	};
	////Nếu không gọi resetForm(), sau khi đăng ký, form vẫn giữ nguyên dữ liệu cũ.

	const validationSchema = Yup.object({
		email: Yup.string().required("Không được để trống").email("Email không hợp lệ"),
		userName: Yup.string().required("Không được để trống"),
		password: Yup.string().required("Không được để trống"),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
			.required("Không được để trống"),
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
				<h3 className="text-center mb-4">Đăng ký</h3>
				<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
					<Form>
						<div className="mb-3">
							<label className="form-label">Email:</label>
							<Field type="text" name="email" className="form-control" placeholder="Nhập email" />
							<ErrorMessage name="email" component="div" className="text-danger mt-2" />
						</div>
						<div className="mb-3">
							<label className="form-label">Tên của bạn:</label>
							<Field type="text" name="userName" className="form-control" placeholder="Nhập tên của bạn" />
							<ErrorMessage name="userName" component="div" className="text-danger mt-2" />
						</div>
						<div className="mb-3">
							<label className="form-label">Mật khẩu:</label>
							<Field type="password" name="password" className="form-control" placeholder="Nhập mật khẩu" />
							<ErrorMessage name="password" component="div" className="text-danger mt-2" />
						</div>
						<div className="mb-3">
							<label className="form-label">Xác nhận mật khẩu:</label>
							<Field type="password" name="confirmPassword" className="form-control" placeholder="Xác nhận mật khẩu" />
							<ErrorMessage name="confirmPassword" component="div" className="text-danger mt-2" />
						</div>
						<div className="text-center">
							<button type="submit" className="btn mt-3 w-100 btn-custom-outline">
								Đăng ký
							</button>
						</div>
					</Form>
				</Formik>
			</div>
		</div>
	);
}
export default Register;
