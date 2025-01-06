import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { addNewFacilities } from "../service/facilitiesService";
import { useNavigate } from "react-router-dom";
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
	});

	const [types, setTypes] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const list = await getTypeById();
			setTypes(list);
		};
		fetchData();
	}, []); // Thêm mảng phụ thuộc rỗng

	const navigate = useNavigate();

	const handleSubmit = async (values) => {
		const facilities = { ...values };
		await addNewFacilities(facilities);
		navigate("/facilities");
	};

	return (
		<div className="container">
			<h3>Add new facilities</h3>
			<Formik initialValues={facilities} onSubmit={handleSubmit}>
				<Form className="mt-3">
					<div className="row mb-3 ms-1 align-items-center">
						<label className="col-sm-1">Facilities:</label>
						<div className="col-sm-4">
							<Field as="select" name="type" className="form-select">
								<option value="">Types</option>
								{types.map((e) => (
									<option key={e.id} value={e.name}>
										{e.name}
									</option>
								))}
							</Field>
						</div>
					</div>

					<div className="row mb-3 ms-1 align-items-center">
						<label className="col-sm-1">Title:</label>
						<div className="col-sm-4">
							<Field type="text" name="title" className="form-control" placeholder="Nhập số phòng ngủ" />
						</div>
					</div>

					<div className="row mb-3 ms-1 align-items-center">
						<label className="col-sm-1">Size:</label>
						<div className="col-sm-4">
							<Field type="text" name="size" className="form-control" placeholder="Nhập số phòng ngủ" />
						</div>
					</div>

					<div className="row mb-3 ms-1 align-items-center">
						<label className="col-sm-1">Bedroom:</label>
						<div className="col-sm-4">
							<Field type="text" name="information.bedroom" className="form-control" placeholder="Nhập số phòng ngủ" />
						</div>
					</div>

					<div className="row mb-3 ms-1 align-items-center">
						<label className="col-sm-1">Bed:</label>
						<div className="col-sm-4">
							<Field type="text" name="information.bed" className="form-control" placeholder="Nhập số giường" />
						</div>
					</div>

					<div className="row mb-3 ms-1 align-items-center">
						<label className="col-sm-1">Bathroom:</label>
						<div className="col-sm-4">
							<Field type="text" name="information.bathroom" className="form-control" placeholder="Nhập số phòng tắm" />
						</div>
					</div>

					<div className="row mb-3 ms-1 align-items-center">
						<label className="col-sm-1">Kitchen:</label>
						<div className="col-sm-4">
							<Field type="text" name="information.kitchen" className="form-control" placeholder="Nhập số nhà bếp" />
						</div>
					</div>

					<div className="row mb-3 ms-1 align-items-center">
						<label className="col-sm-1">Customer:</label>
						<div className="col-sm-4">
							<Field type="text" name="information.customer" className="form-control" placeholder="Nhập tên khách hàng" />
						</div>
					</div>

					<div className="row mb-3 ms-1 align-items-center">
						<label className="col-sm-1">Price:</label>
						<div className="col-sm-4">
							<Field type="text" name="information.price" className="form-control" placeholder="Nhập giá" />
						</div>
					</div>

					<button type="submit" className="btn btn-secondary btn-sm mb-3 ms-2">
						Thêm
					</button>
				</Form>
			</Formik>
		</div>
	);
}

export default AddComponent;
