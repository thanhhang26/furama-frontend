import { ErrorMessage, Form, Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { getAllContact } from "../service/facilitiesService";
import { GiPositionMarker } from "react-icons/gi";
import { FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import * as Yup from "yup";

function ContactUser() {
	const [contact, setContact] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const data = await getAllContact();
			setContact(data);
		};
		fetchData();
	}, []);

	const validationSchema = Yup.object({
		name: Yup.string().required("Vui lòng nhập họ tên"),
		email: Yup.string().required("Vui lòng nhập email"),
		phone: Yup.string()
			.matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa số")
			.min(10, "Số điện thoại phải có ít nhất 10 chữ số")
			.max(11, "Số điện thoại không được quá 11 chữ số")
			.required("Vui lòng nhập số điện thoại"),
	});
	return (
		<div className="container py-4">
			<div className="row">
				{/* Thông tin liên hệ bên trái */}
				<div className="col-md-5">
					<p className="breadcrumb">Trang chủ » Liên hệ »</p>
					{contact?.length > 0 ? (
						contact.map((c) => (
							<div key={c.id}>
								<p>
									<strong>
										<span className=" me-3">
											<GiPositionMarker />
										</span>
										{c.address}
									</strong>
								</p>
								<p>
									<span className="me-3">
										<FaPhone />
									</span>
									{c.phone}
								</p>
								<p>
									<span className="me-3">
										<IoMdMail />
									</span>
									{c.mail}
								</p>
							</div>
						))
					) : (
						<p className="text-center">Không có dữ liệu</p>
					)}
				</div>

				{/* Form liên hệ bên phải */}
				<div className="col-md-7">
					<p className="form-title">Vui lòng liên hệ với chúng tôi nếu bạn cần thêm thông tin</p>
					<Formik validationSchema={validationSchema}>
						<Form className="contact-form">
							<div className="row">
								<div className="col-md-6 mb-3">
									<Field type="text" name="name" className="form-control" placeholder="Họ tên *" />
									<ErrorMessage name="name" component="div" className="error-text mt-2" style={{ color: "red" }} />
								</div>
								<div className="col-md-6 mb-3">
									<Field type="email" name="email" className="form-control" placeholder="Email *" />
									<ErrorMessage name="email" component="div" className="error-text mt-2" style={{ color: "red" }} />
								</div>
							</div>

							<div className="mb-3">
								<Field type="text" name="phone" className="form-control" placeholder="Số điện thoại *" />
								<ErrorMessage name="phone" component="div" className="error-text mt-2" style={{ color: "red" }} />
							</div>

							<div className="mb-3">
								<Field as="textarea" name="message" className="form-control" placeholder="Nội dung" rows="3" />
							</div>

							<button type="submit" className="btn btn-custom-outline w-25" d>
								GỬI
							</button>
						</Form>
					</Formik>
				</div>
			</div>
		</div>
	);
}
export default ContactUser;
