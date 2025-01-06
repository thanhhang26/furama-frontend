import React, { useEffect, useRef, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { getAllFacilities, searchByName } from "../service/facilitiesService";
import { getAllTypes } from "../service/typesService";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import DeleteComponent from "./DeleteComponent";

function FacilitiesList() {
	const [facilitiesList, setFacilitiesList] = useState([]);
	const [type, setType] = useState([]);
	const [show, setShow] = useState(false);
	const [deleteFacilities, setDeleteFacilities] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			setFacilitiesList(await getAllFacilities());
			setType(await getAllTypes());
		};
		fetchData();
	}, [show]);

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
	return (
		<div>
			<div className="mb-4" id="titleImg">
				<h1 className="text-center shadow p-3 mb-5" id="titleText">
					WELCOME TO FURAMA RESORT
				</h1>
			</div>
			<div className="container">
				<div className="d-flex align-items-center mb-4">
					<div className="flex-grow-1 text-center">
						<h4>FACILITIES</h4>
					</div>
					<div className="flex-shrink-0">
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
					</div>
				</div>

				<div className="container">
					<Row xs={1} md={3} className=" g-4 mt-3">
						{facilitiesList &&
							facilitiesList.map((f) => (
								<Col key={f.id} facilities={f}>
									<Link to={"/facilities/detail/" + f.id}>
										<Card>
											<Card.Img variant="top" src={f.imgSrc} alt={f.imgAlt} />
											<Card.Body>
												<Card.Title>{f.title}</Card.Title>
												<Card.Text>
													Room size: {f.size} m<sup>2</sup>
												</Card.Text>
											</Card.Body>
										</Card>
									</Link>
									<div className="d-flex ">
										<button className="btn btn-secondary me-3" onClick={() => showModalDelete(f)}>
											Delete
										</button>
										<Link className="btn btn-sm btn-secondary d-flex justify-content-center" id="add-link" to="/add_new">
											Add New
										</Link>
									</div>
								</Col>
							))}
					</Row>
				</div>
			</div>
			<div>
				<DeleteComponent facilities={deleteFacilities} show={show} closeModal={closeModal} />
			</div>
		</div>
	);
}
export default FacilitiesList;
