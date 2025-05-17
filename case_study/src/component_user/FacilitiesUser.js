import React, { useEffect, useRef, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { getAllFacilities, searchByName } from "../service/facilitiesService";
import { getAllTypes } from "../service/typesService";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import { PAGE_SIZE } from "../service/constant";
import { FiAlertCircle } from "react-icons/fi";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FaSearch, FaSyncAlt } from "react-icons/fa";
import CustomSelect from "../component_admin/CustomSelect";

function FacilitiesUser() {
	const [facilitiesList, setFacilitiesList] = useState([]);
	const [type, setType] = useState([]);
	const [show, setShow] = useState(false);
	const [totalSize, setTotalSize] = useState(PAGE_SIZE);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const [reload, setReload] = useState(true);
	const [selectedFacilitiesOption, setSelectedFacilitiesOption] = useState(null);

	useEffect(() => {
		window.scrollTo(0, 0); // Trượt lên đầu trang khi component được render
		const fetchData = async () => {
			const [data, totalRecords] = await getAllFacilities(page, totalSize);
			console.log(data, totalRecords);

			setFacilitiesList(data);

			setType(await getAllTypes());
			setTotalPage(Math.ceil(totalRecords / PAGE_SIZE));
		};
		fetchData();
	}, [page, reload]);

	const searchTypeRef = useRef();

	const handleSearchName = async () => {
		let facilitiesId = selectedFacilitiesOption?.value;
		let typeId = searchTypeRef.current.value;

		const [data, totalRecords] = await searchByName(facilitiesId, typeId, page, PAGE_SIZE);
		setTotalPage(Math.ceil(totalRecords / PAGE_SIZE));
		setFacilitiesList(data);
	};

	const handleFirst = () => {
		setPage(1);
	};
	const handlePrev = () => {
		setPage(page - 1);
	};
	const handleNext = () => {
		setPage(page + 1);
	};
	const handleLast = () => {
		setPage(totalPage);
	};
	const reloadData = () => {
		setSelectedFacilitiesOption(null); // Xóa nội dung CustomSelect
		searchTypeRef.current.value = ""; // Reset select về mặc định
		setReload(!reload);
	};
	return (
		<div>
			<div>
				<div className="input-group">
					<CustomSelect
						options={facilitiesList.map((f) => ({ label: f.title, value: f.id }))}
						value={selectedFacilitiesOption}
						placeholder="Tìm kiếm"
						onSelect={(option) => setSelectedFacilitiesOption(option)}
					/>
					<select name="typeSearch" className="form-select border-start-0 border-end-0" style={{ maxWidth: "230px" }} id="type" ref={searchTypeRef}>
						<option value="">Tất cả</option>
						{type.map((e) => (
							<option key={e.id} value={e.id}>
								{e.name}
							</option>
						))}
					</select>
					<button className="btn btn-custom-outline px-3 border-0" type="button" onClick={handleSearchName}>
						<FaSearch className="me-1" />
					</button>
					<button className="btn btn-custom-outline px-3 border-0 rounded-0" type="button" onClick={reloadData}>
						<FaSyncAlt />
					</button>
				</div>
			</div>

			<div className="position-relative text-center mb-4" id="titleImg">
				<img
					src="https://sktravel.com.vn/wp-content/uploads/2021/05/top-4-khach-san-resort-co-khong-gian-thien-nhien-dep-nhat-nha-trang.jpg"
					alt="Room Banner"
					className="img-fluid shadow-lg"
				/>
				<h1 className="position-absolute top-50 start-50 translate-middle text-white fw-bold p-3" id="titleText">
					CÁC LOẠI PHÒNG
				</h1>
			</div>

			<div className="container">
				<div className="container">
					<Row xs={1} md={3} className="g-4 mt-3">
						{facilitiesList?.length > 0 ? (
							facilitiesList.map((f) => (
								<Col key={f.id}>
									<Card className="h-100 d-flex flex-column shadow">
										<Card.Img variant="top" src={f.image} alt={f.imgAlt} style={{ height: "250px", objectFit: "cover" }} />
										<Card.Body className="d-flex flex-column">
											<Card.Title>{f.title}</Card.Title>
											<Card.Text>
												Room size: {f.size} m<sup>2</sup>
											</Card.Text>
											<div className="mt-auto">
												<Row className="d-flex justify-content-between align-items-center">
													<Col>
														<OverlayTrigger
															placement="bottom"
															overlay={
																<Tooltip id={`tooltip-${f.id}`}>
																	<ul className="px-3 py-2 m-0" style={{ textAlign: "left" }}>
																		{f.features?.map((item, index) => (
																			<li key={index}>{item}</li>
																		))}
																	</ul>
																</Tooltip>
															}
														>
															<Link
																to={`/facilities/detail/${f.id}`}
																className="btn btn-sm d-flex align-items-center justify-content-center px-2 py-1"
															>
																<FiAlertCircle className="me-2" style={{ fontSize: "14px" }} />
																Xem chi tiết
															</Link>
														</OverlayTrigger>
													</Col>
												</Row>
											</div>
										</Card.Body>
									</Card>
								</Col>
							))
						) : (
							<p className="text-center">Không có dữ liệu</p>
						)}
					</Row>
				</div>
			</div>

			<Pagination className="container my-4 d-flex justify-content-center" id="pagination">
				<Pagination.First onClick={handleFirst} disabled={page === 1}>
					Trang đầu
				</Pagination.First>
				<Pagination.Prev onClick={handlePrev} disabled={page === 1} />
				{[...Array(totalPage || 0)].map((_, index) => (
					<Pagination.Item key={index} active={page === index + 1} onClick={() => setPage(index + 1)}>
						{index + 1}
					</Pagination.Item>
				))}
				<Pagination.Next onClick={handleNext} disabled={page === totalPage} />
				<Pagination.Last onClick={handleLast} disabled={page === totalPage}>
					Trang cuối
				</Pagination.Last>
			</Pagination>
		</div>
	);
}
export default FacilitiesUser;
