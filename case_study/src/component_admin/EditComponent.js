import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { updateFacilities, getFacilitiesById } from "../service/facilitiesService";
import * as Yup from "yup";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getTypeById } from "../service/typesService";
import { Form as BootstrapForm, Button, Col, Row } from "react-bootstrap";

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
		navigate(`/facilities/`);
	};

	const validationSchema = Yup.object({
		title: Yup.string()
			.trim()
			.required("Không được để trống")
			.matches(/^[\p{L}\d\s]+$/u, "Tên không hợp lệ"), //\p{L}: Bất kỳ chữ cái Unicode nào (bao gồm cả tiếng Việt có dấu), \d: Bất kỳ chữ số nào (0–9)
		information: Yup.object({
			size: Yup.number().typeError("Diện tích phải là số").required("Không được để trống"),
			bedroom: Yup.number()
				.typeError("Số phòng ngủ phải là số")
				.min(0, "Số phòng ngủ không hợp lệ")
				.max(99, "Số phòng ngủ không hợp lệ")
				.required("Không được để trống"),
			bed: Yup.number()
				.typeError("Số giường ngủ phải là số")
				.min(0, "Số giường ngủ không hợp lệ")
				.max(99, "Số giường ngủ không hợp lệ")
				.required("Không được để trống"),
			bathroom: Yup.number()
				.typeError("Số phòng tắm phải là số")
				.min(0, "Số phòng tắm không hợp lệ")
				.max(99, "Số phòng tắm không hợp lệ")
				.required("Không được để trống"),
			kitchen: Yup.number()
				.typeError("Số phòng bếp phải là số")
				.min(0, "Số phòng bếp không hợp lệ")
				.max(99, "Số phòng bếp không hợp lệ")
				.required("Không được để trống"),
			customer: Yup.number()
				.typeError("Số phòng ngủ phải là số")
				.min(0, "Số phòng ngủ không hợp lệ")
				.max(99, "Số phòng ngủ không hợp lệ")
				.required("Không được để trống"),
			price: Yup.string()
				.trim() // loại bỏ khoảng trắng đầu/cuối
				.required("Không được để trống")
				.matches(/^\d{1,3}(\.\d{3})*$/, "Giá tiền không hợp lệ (vd: 1.000.000)"),
		}),
	});

	if (!facilities) {
		return "";
	}

	return (
		<div className="container mt-4 mb-4">
			<div className=" p-4">
				<h3 className="card-title text-center">CHỈNH SỬA THÔNG TIN PHÒNG</h3>
				<Formik initialValues={facilities} onSubmit={handleSubmit} validationSchema={validationSchema}>
					{({ handleChange, handleBlur, values, setFieldValue }) => (
						<Form className="mt-3">
							<Row>
								<Col>
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
								</Col>
								<Col>
									<div className="mb-3">
										<label className="form-label">Tên phòng:</label>
										<Field type="text" name="title" className="form-control" placeholder="Nhập tên phòng" />
										<ErrorMessage name="title" component="div" className="text-danger" />
									</div>
								</Col>
							</Row>

							<Row>
								<Col>
									<div className="mb-3">
										<label className="form-label">
											Diện tích phòng m<sup>2:</sup>
										</label>
										<Field type="text" name="size" className="form-control" placeholder="Nhập kích thước" />
										<ErrorMessage name="size" component="div" className="text-danger mt-2" />
									</div>
								</Col>
								<Col>
									<div className="mb-3">
										<label className="form-label">Phòng ngủ:</label>
										<Field type="text" name="information.bedroom" className="form-control" placeholder="Nhập số lượng phòng ngủ" />
										<ErrorMessage name="information.bedroom" component="div" className="text-danger mt-2" />
									</div>
								</Col>
							</Row>

							<Row>
								<Col>
									<div className="mb-3">
										<label className="form-label">Giường:</label>
										<Field type="text" name="information.bed" className="form-control" placeholder="Nhập số lượng giường" />
										<ErrorMessage name="information.bed" component="div" className="text-danger mt-2" />
									</div>
								</Col>
								<Col>
									<div className="mb-3">
										<label className="form-label">Phòng tắm:</label>
										<Field type="text" name="information.bathroom" className="form-control" placeholder="Nhập số lượng phòng tắm" />
										<ErrorMessage name="information.bathroom" component="div" className="text-danger mt-2" />
									</div>
								</Col>
							</Row>

							<Row>
								<Col>
									<div className="mb-3">
										<label className="form-label">Phòng bếp:</label>
										<Field type="text" name="information.kitchen" className="form-control" placeholder="Nhập số lượng nhà bếp" />
										<ErrorMessage name="information.kitchen" component="div" className="text-danger mt-2" />
									</div>
								</Col>
								<Col>
									<div className="mb-3">
										<label className="form-label">Số lượng khách:</label>
										<Field type="text" name="information.customer" className="form-control" placeholder="Nhập tên khách hàng" />
										<ErrorMessage name="information.customer" component="div" className="text-danger mt-2" />
									</div>
								</Col>
							</Row>

							<Row>
								<Col>
									<div className="mb-3">
										<label className="form-label">Giá tiền (VNĐ):</label>

										<Field type="text" name="information.price" className="form-control" placeholder="Nhập giá" />
										<ErrorMessage name="information.price" component="div" className="text-danger mt-2" />
									</div>
								</Col>
								<Col>
									<div className="mb-3">
										<label className="form-label">Tính năng:</label>
										<FieldArray name="features">
											{({ push, remove }) => (
												<div>
													{values.features.map((_, index) => (
														<Row key={index} className="mb-2">
															<Col md={8}>
																<BootstrapForm.Group>
																	<Field
																		name={`features.${index}`}
																		as={BootstrapForm.Control}
																		type="text"
																		placeholder={`Tính năng ${index + 1}`}
																		onChange={handleChange}
																		onBlur={handleBlur}
																	/>
																	<ErrorMessage name={`features.${index}`} component="div" className="text-danger" />
																</BootstrapForm.Group>
															</Col>
															<Col md={4}>
																<Button variant="" className="btn-outline-danger" onClick={() => remove(index)}>
																	Xóa
																</Button>
															</Col>
														</Row>
													))}
													<Button className="btn-custom-outline" onClick={() => push("")}>
														+ Thêm Tính Năng
													</Button>
												</div>
											)}
										</FieldArray>
									</div>
								</Col>
							</Row>

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
