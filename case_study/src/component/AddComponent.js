import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { addNewFacilities } from "../service/facilitiesService";
import { Link, useNavigate } from "react-router-dom";
import { getTypeById } from "../service/typesService";

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

	return (
		<div className="container mt-4">
			<div className="card shadow p-4">
				<h3 className="card-title text-center">THÊM MỚI CÁC PHÒNG</h3>
				<Formik initialValues={facilities} onSubmit={handleSubmit}>
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
							</div>

							<div className="mb-3">
								<label className="form-label">
									Diện tích phòng m<sup>2:</sup>
								</label>
								<Field type="text" name="size" className="form-control" placeholder="Nhập kích thước" />
							</div>

							<div className="mb-3">
								<label className="form-label">Phòng ngủ:</label>
								<Field type="text" name="information.bedroom" className="form-control" placeholder="Nhập số lượng phòng ngủ" />
							</div>

							<div className="mb-3">
								<label className="form-label">Giường:</label>
								<Field type="text" name="information.bed" className="form-control" placeholder="Nhập số lượng giường" />
							</div>

							<div className="mb-3">
								<label className="form-label">Phòng tắm:</label>
								<Field type="text" name="information.bathroom" className="form-control" placeholder="Nhập số lượng phòng tắm" />
							</div>

							<div className="mb-3">
								<label className="form-label">Phòng bếp:</label>
								<Field type="text" name="information.kitchen" className="form-control" placeholder="Nhập số lượng nhà bếp" />
							</div>

							<div className="mb-3">
								<label className="form-label">Số lượng khách:</label>
								<Field type="text" name="information.customer" className="form-control" placeholder="Nhập tên khách hàng" />
							</div>

							<div className="mb-3">
								<label className="form-label">Giá tiền (VNĐ):</label>
								<Field type="text" name="information.price" className="form-control" placeholder="Nhập giá" />
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
