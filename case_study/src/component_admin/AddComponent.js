import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { addNewFacilities } from "../service/facilitiesService";
import { Link, useNavigate } from "react-router-dom";
import { getTypeById } from "../service/typesService";
import * as Yup from "yup";

function AddComponent() {
	const [facilities, setFacilities] = useState({
		id: "",
		title: "",
		size: "",
		information: {
			bedroom: "",
			bed: "",
			bathroom: "",
			kitchen: "",
			customer: "",
			price: "",
		},
		image: null,
	});

	const [types, setTypes] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const list = await getTypeById();
			setTypes(list);
		};
		fetchData();
	}, []);

	const navigate = useNavigate();

	const handleSubmit = async (values) => {
		const facilities = { ...values };
		await addNewFacilities(facilities);
		navigate("/facilities");
	};

	const validationSchema = Yup.object({
		type: Yup.string().required("Vui lòng chọn loại dịch vụ"),
		title: Yup.string().required("Tên phòng không được để trống"),
		size: Yup.number().typeError("Diện tích phải là số").required("Vui lòng nhập diện tích phòng"),
		information: Yup.object({
			bedroom: Yup.number().typeError("Số phòng ngủ phải là số").required("Nhập số lượng phòng ngủ"),
			bed: Yup.number().typeError("Số giường phải là số").required("Nhập số lượng giường"),
			bathroom: Yup.number().typeError("Số phòng tắm phải là số").required("Nhập số lượng phòng tắm"),
			kitchen: Yup.number().typeError("Số phòng bếp phải là số").required("Nhập số lượng nhà bếp"),
			customer: Yup.number().typeError("Số lượng khách phải là số").required("Nhập số lượng khách"),
			price: Yup.number().typeError("Giá tiền phải là số").required("Nhập giá tiền"),
		}),
	});

	return (
		<div className="container mt-4">
			<div className="card shadow p-4">
				<h3 className="card-title text-center">THÊM MỚI CÁC PHÒNG</h3>
				<Formik initialValues={facilities} onSubmit={handleSubmit} validationSchema={validationSchema}>
					{({ setFieldValue }) => (
						<Form>
							<div className="mb-3">
								<label className="form-label">Loại dịch vụ:</label>
								<Field as="select" name="type" className="form-select">
									<option value="">Các dịch vụ</option>
									{types.map((e) => (
										<option key={e.id} value={e.name}>
											{e.name}
										</option>
									))}
								</Field>
							</div>

							<div className="mb-3">
								<label className="form-label">Tên phòng:</label>
								<Field type="text" name="title" className="form-control" placeholder="Nhập tiêu đề" />
								<ErrorMessage name="title" component="div" className="text-danger mt-2" />
							</div>

							<div className="mb-3">
								<label className="form-label">
									Diện tích phòng m<sup>2:</sup>
								</label>
								<Field type="text" name="size" className="form-control" placeholder="Nhập kích thước" />
								<ErrorMessage name="size" component="div" className="text-danger mt-2" />
							</div>

							<div className="mb-3">
								<label className="form-label">Phòng ngủ:</label>
								<Field type="text" name="information.bedroom" className="form-control" placeholder="Nhập số lượng phòng ngủ" />
								<ErrorMessage name="information.bedroom" component="div" className="text-danger mt-2" />
							</div>

							<div className="mb-3">
								<label className="form-label">Giường:</label>
								<Field type="text" name="information.bed" className="form-control" placeholder="Nhập số lượng giường" />
								<ErrorMessage name="information.bed" component="div" className="text-danger mt-2" />
							</div>

							<div className="mb-3">
								<label className="form-label">Phòng tắm:</label>
								<Field type="text" name="information.bathroom" className="form-control" placeholder="Nhập số lượng phòng tắm" />
								<ErrorMessage name="information.bathroom" component="div" className="text-danger mt-2" />
							</div>

							<div className="mb-3">
								<label className="form-label">Phòng bếp:</label>
								<Field type="text" name="information.kitchen" className="form-control" placeholder="Nhập số lượng nhà bếp" />
								<ErrorMessage name="information.kitchen" component="div" className="text-danger mt-2" />
							</div>

							<div className="mb-3">
								<label className="form-label">Số lượng khách:</label>
								<Field type="text" name="information.customer" className="form-control" placeholder="Nhập tên khách hàng" />
								<ErrorMessage name="information.customer" component="div" className="text-danger mt-2" />
							</div>

							<div className="mb-3">
								<label className="form-label">Giá tiền (VNĐ):</label>
								<Field type="text" name="information.price" className="form-control" placeholder="Nhập giá" />
								<ErrorMessage name="information.price" component="div" className="text-danger mt-2" />
							</div>

							<div className="mb-3">
								<label className="form-label">Cập nhật ảnh:</label>
								<input type="file" className="form-control" />
							</div>

							<div className="text-start">
								<button type="submit" className="btn btn-success">
									Lưu
								</button>
								<Link type="button" className="btn btn-secondary ms-3" to={"/facilities"}>
									Trở về
								</Link>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default AddComponent;
