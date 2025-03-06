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

function FacilitiesUser() {
	const [facilitiesList, setFacilitiesList] = useState([]);
	const [type, setType] = useState([]);
	const [show, setShow] = useState(false);
	const [deleteFacilities, setDeleteFacilities] = useState({});
	const [totalSize, setTotalSize] = useState(PAGE_SIZE);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const [reload, setReload] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const [data, totalRecords] = await getAllFacilities(page, totalSize);
			setFacilitiesList(data);

			setType(await getAllTypes());
			setTotalPage(Math.ceil(totalRecords / PAGE_SIZE));
		};
		fetchData();
	}, [show, page, reload]);

	const searchNameRef = useRef();
	const searchTypeRef = useRef();

	const handleSearchName = async () => {
		let name = searchNameRef.current.value.trim();
		let typeId = searchTypeRef.current.value;

		setFacilitiesList(await searchByName(name, typeId));
	};
	const showModalDelete = (facilities) => {
		setDeleteFacilities(facilities);
		setShow(true);
	};

	const closeModal = () => {
		setShow(false);
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
		setReload(!reload);
	};
	return (
		<div>
			<div className="mb-4" id="titleImg">
				<h1 className="text-center shadow p-3 mb-5" id="titleText">
					CÁC LOẠI PHÒNG
				</h1>
			</div>

			<div className="container">
				<div className="d-flex align-items-center mb-4">
					<div className="flex-shrink-0 ms-3">
						<div className="input-group mb-3">
							<input name="searchName" type="text" className="form-control border-end-0" placeholder="Tìm kiếm" ref={searchNameRef} />
							<select name="typeSearch" className="form-select border-start-0 border-end-0" id="type" ref={searchTypeRef}>
								<option value="">Tất cả</option>
								{type.map((e) => (
									<option key={e.id} value={e.id}>
										{e.name}
									</option>
								))}
							</select>
							<button className="btn btn btn-custom-outline px-3 border-0" type="button" onClick={handleSearchName}>
								<FaSearch className="me-1" />
							</button>
							<button className="btn btn-custom-outline px-3 border-0" type="button" onClick={reloadData}>
								<FaSyncAlt />
							</button>
						</div>
					</div>
				</div>

				<div className="container">
					<Row xs={1} md={3} className="g-4 mt-3">
						{facilitiesList?.length > 0 ? (
							facilitiesList.map((f) => (
								<Col key={f.id}>
									<Card className="h-100 d-flex flex-column shadow">
										<Card.Img variant="top" src={f.imgSrc} alt={f.imgAlt} />
										<Card.Body className="d-flex flex-column">
											<Card.Title>{f.title}</Card.Title>
											<Card.Text>
												Room size: {f.size} m<sup>2</sup>
											</Card.Text>
											<div className="mt-auto">
												<Row className="d-flex justify-content-between align-items-center">
													<OverlayTrigger
														placement="bottom"
														overlay={
															<Tooltip id={`tooltip-${f.id}`}>
																<ul className="px-3 py-2 m-0" style={{ textAlign: "left" }}>
																	{f.feature?.map((item, index) => (
																		<li key={index}>{item}</li>
																	))}
																</ul>
															</Tooltip>
														}
													>
														<Link to={`/facilities/detail/${f.id}`} className="btn btn-sm d-flex align-items-center justify-content-center px-2 py-1">
															<FiAlertCircle className="me-2" style={{ fontSize: "14px" }} />
															Xem chi tiết
														</Link>
													</OverlayTrigger>
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
