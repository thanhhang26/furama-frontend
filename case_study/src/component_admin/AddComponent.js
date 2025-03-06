import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { addNewFacilities } from "../service/facilitiesService";
import { Link, useNavigate } from "react-router-dom";
import { getTypeById } from "../service/typesService";
import * as Yup from "yup";
import { uploadImageToCloudinary } from "../service/imageService";
import { Form as BootstrapForm, Button, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";

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
		features: [],
		image: null,
	});

	const [types, setTypes] = useState([]);
	const [previewImg, setPreviewImg] = useState(null);

	useEffect(() => {
		window.scrollTo(0, 0); // Trượt lên đầu trang khi component được render
		const fetchData = async () => {
			const list = await getTypeById();
			setTypes(list);
			setFacilities((prev) => ({ ...prev, image: previewImg }));
		};
		fetchData();
	}, [previewImg]);

	const navigate = useNavigate();

	const handleSubmit = async (values) => {
		const facilities = { ...values, image: values.image };
		await addNewFacilities(facilities);
		navigate("/facilities");
	};

	const handleUpload = async (event, setFieldValue) => {
		const file = event.target.files[0];
		const imageUrl = await uploadImageToCloudinary(file); // Gửi file ảnh đến Cloudinary API để upload. Nhận lại URL ảnh do Cloudinary trả về.
		if (imageUrl) {
			setPreviewImg(imageUrl);
			setFieldValue("image", imageUrl);
		} else {
			toast.error("Upload image failed!");
		}
		setFieldValue("image", imageUrl); // Lưu URL ảnh vào Formik
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
		features: Yup.array().of(Yup.string()),
	});

	return (
		<div className="container mt-4 mb-4">
			<div className="card shadow p-4">
				<h3 className="card-title text-center">THÊM MỚI CÁC PHÒNG</h3>
				<Formik initialValues={facilities} onSubmit={handleSubmit} validationSchema={validationSchema}>
					{({ values, handleChange, handleBlur, setFieldValue }) => (
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
														<Button variant="danger" onClick={() => remove(index)}>
															Xóa
														</Button>
													</Col>
												</Row>
											))}
											<Button variant="success" onClick={() => push("")}>
												+ Thêm Tính Năng
											</Button>
										</div>
									)}
								</FieldArray>
							</div>

							<div className="mb-3">
								<label className="form-label">Cập nhật ảnh:</label>
								<input type="file" className="form-control" accept="image/*" onChange={(event) => handleUpload(event, setFieldValue)} />
								{previewImg && <img src={previewImg} width={500} height={300} className="mt-3 max-h-[400px] object-contain" alt="imgSrc" />}
							</div>

							<div className="text-start">
								<button type="submit" className="btn btn-custom-outline">
									Lưu
								</button>
								<Link type="button" className="btn btn-outline-secondary ms-3" to={"/facilities"}>
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
