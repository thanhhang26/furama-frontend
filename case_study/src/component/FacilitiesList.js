import React, { useEffect, useRef, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { getAllFacilities, searchByName } from "../service/facilitiesService";
import { getAllTypes } from "../service/typesService";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import DeleteComponent from "./DeleteComponent";
import { PAGE_SIZE } from "../service/constant";

function FacilitiesList() {
	const [facilitiesList, setFacilitiesList] = useState([]);
	const [type, setType] = useState([]);
	const [show, setShow] = useState(false);
	const [deleteFacilities, setDeleteFacilities] = useState({});
	const [totalSize, setTotalSize] = useState(PAGE_SIZE);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	useEffect(() => {
		const fetchData = async () => {
			const [data, totalRecords] = await getAllFacilities(page, totalSize);
			setFacilitiesList(data);

			setType(await getAllTypes());
			setTotalPage(Math.ceil(totalRecords / PAGE_SIZE));
		};
		fetchData();
	}, [show, page]);

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
							<input name="searchName" type="text" className="form-control" placeholder="Search" ref={searchNameRef} />
							<select name="typeSearch" className="form-select" id="type" ref={searchTypeRef}>
								<option value="">All</option>
								{type.map((e) => (
									<option key={e.id} value={e.id}>
										{e.name}
									</option>
								))}
							</select>
							<button className="btn btn-outline-secondary" type="button" onClick={handleSearchName}>
								Search
							</button>
						</div>
						<div className="d-flex justify-content-start">
							<Link className="btn btn-success mt-3 mb-3 px-4" id="add-link" to="/add_new">
								Thêm mới
							</Link>
						</div>
					</div>
				</div>

				<div className="container">
					<Row xs={1} md={3} className="g-4 mt-3">
						{facilitiesList &&
							facilitiesList.map((f) => (
								<Col key={f.id}>
									<Card className="h-100 d-flex flex-column">
										<Card.Img variant="top" src={f.imgSrc} alt={f.imgAlt} />
										<Card.Body className="d-flex flex-column">
											<Card.Title>{f.title}</Card.Title>
											<Card.Text>
												Room size: {f.size} m<sup>2</sup>
											</Card.Text>
											<div className="mt-auto">
												<Link to={`/facilities/detail/${f.id}`} className="btn btn-primary me-2">
													Xem chi tiết
												</Link>
												<button className="btn btn-danger" onClick={() => showModalDelete(f)}>
													Xoá
												</button>
											</div>
										</Card.Body>
									</Card>
								</Col>
							))}
					</Row>
				</div>
			</div>

			<div>
				<DeleteComponent facilities={deleteFacilities} show={show} closeModal={closeModal} />
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
export default FacilitiesList;
