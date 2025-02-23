import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { updateFacilities, getFacilitiesById } from "../service/facilitiesService";
import * as Yup from "yup";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getTypeById } from "../service/typesService";

function EditComponent() {
	const [facilities, setFacilities] = useState(null);
	const [types, setTypes] = useState([]);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			setFacilities(await getFacilitiesById(id));
			setTypes(await getTypeById());
		};
		fetchData();
	}, [id]);

	const handleSubmit = async (value) => {
		await updateFacilities(value.id, value);
		navigate(`/facilities${value.id}`);
	};

	const validationSchema = Yup.object({
		id: Yup.string().required("Không được để trống").min(1, "Nhập ID hợp lệ!"),
		title: Yup.string()
			.required("Không được để trống")
			.matches(/^([A-Z]+(?:\s[A-Z]+)*)\s?(\d{1,2})?$/, "Tên không hợp lệ"),
		information: Yup.object({
			bedroom: Yup.string()
				.required("Không được để trống")
				.matches(/^\d{1,2}$/, "Số phòng ngủ không hợp lệ"),
			bed: Yup.string()
				.required("Không được để trống")
				.matches(/^\d{1,2}$/, "Số giường không hợp lệ"),
			bathroom: Yup.string()
				.required("Không được để trống")
				.matches(/^\d{1,2}$/, "Số phòng tắm không hợp lệ"),
			kitchen: Yup.string()
				.required("Không được để trống")
				.matches(/^\d{1,2}$/, "Số nhà bếp không hợp lệ"),
			customer: Yup.string()
				.required("Không được để trống")
				.matches(/^\d{1,2}$/, "Số khách không hợp lệ"),
			price: Yup.string()
				.required("Không được để trống")
				.matches(/^[0-9]+$/, "Giá tiền không hợp lệ"),
		}),
	});

	if (!facilities) {
		return "";
	}

	return (
		<div className="container mt-4">
			<div className="card shadow p-4">
				<h3 className="card-title text-center">CHỈNH SỬA THÔNG TIN PHÒNG</h3>
				<Formik initialValues={facilities} onSubmit={handleSubmit} validationSchema={validationSchema}>
					{({ setFieldValue }) => (
						<Form>
							<div className="mb-3">
								<label className="form-label">Loại dịch vụ:</label>
								<Field as="select" name="typeId" className="form-select">
									<option value="">Các dịch vụ</option>
									{types.map((e) => (
										<option key={e.id} value={e.id}>
											{e.name}
										</option>
									))}
								</Field>
							</div>

							<div className="mb-3">
								<label className="form-label">Tên phòng:</label>
								<Field type="text" name="title" className="form-control" placeholder="Nhập tên phòng" />
								<ErrorMessage name="name" component="div" className="text-danger" />
							</div>

							<div className="mb-3">
								<label className="form-label">Phòng ngủ:</label>
								<Field type="text" name="information.bedroom" className="form-control" placeholder="Nhập số lượng" />
							</div>

							<div className="mb-3">
								<label className="form-label">Giường:</label>
								<Field type="text" name="information.bed" className="form-control" placeholder="Nhập số lượng" />
							</div>

							<div className="mb-3">
								<label className="form-label">Phòng tắm:</label>
								<Field type="text" name="information.bathroom" className="form-control" placeholder="Nhập số lượng" />
							</div>

							<div className="mb-3">
								<label className="form-label">Phòng bếp:</label>
								<Field type="text" name="information.kitchen" className="form-control" placeholder="Nhập số lượng" />
							</div>

							<div className="mb-3">
								<label className="form-label">Số lượng khách:</label>
								<Field type="text" name="information.customer" className="form-control" placeholder="Nhập số lượng" />
							</div>

							<div className="mb-3">
								<label className="form-label">Giá tiền (VNĐ):</label>
								<Field type="text" name="information.price" className="form-control" placeholder="Nhập giá" />
							</div>

							<div className="text-start">
								<button type="submit" className="btn btn-success">
									Lưu
								</button>
								<Link type="button" className="btn btn-secondary ms-3" to="/facilities">
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

export default EditComponent;
