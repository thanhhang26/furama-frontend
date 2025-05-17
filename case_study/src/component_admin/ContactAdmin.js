import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { HiArrowPath } from "react-icons/hi2";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Pagination } from "react-bootstrap";
import { getAllContactList, search } from "../service/contactService";
import { PAGE_SIZE } from "../service/constant";
import DeleteContactUser from "../component_user/DeleteContactUser";

function ContactAdmin() {
	const [contactList, setContactList] = useState([]);
	const [totalSize, setTotalSize] = useState(PAGE_SIZE);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const [show, setShow] = useState(false);
	const [deleteContacts, setDeleteContacts] = useState([]);
	const [reload, setReload] = useState(true);

	useEffect(() => {
		window.scrollTo(0, 0); // Trượt lên đầu trang khi component được render
		const fetchData = async () => {
			const [data, totalRecords] = await getAllContactList(page, totalSize);
			setContactList(data);
			setTotalPage(Math.ceil(totalRecords / PAGE_SIZE));
		};
		fetchData();
	}, [page, reload, show]);

	const searchNameRef = useRef();
	const searchPhoneRef = useRef();
	const handleSearchName = async () => {
		let nameContact = searchNameRef.current.value.trim();
		let phoneContact = searchPhoneRef.current.value.trim();

		const [data, totalRecords] = await search(nameContact, phoneContact, page, PAGE_SIZE);
		setTotalPage(Math.ceil(totalRecords / PAGE_SIZE));
		setContactList(data);
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

	const showModalDelete = (contact) => {
		setDeleteContacts(contact);
		setShow(true);
	};

	const closeModal = () => {
		setShow(false);
	};

	const reloadData = () => {
		searchNameRef.current.value = "";
		searchPhoneRef.current.value = "";
		setReload(!reload);
	};

	return (
		<div>
			<div className="container my-3">
				<div className="text-center mb-5">
					<h2>DANH SÁCH KHÁCH HÀNG</h2>
				</div>
				<Row className="g-4 align-items-center">
					<Col xs="auto">
						<div className="d-flex align-items-center">
							<input
								type="text"
								id="customerName"
								className="form-control"
								style={{ width: "250px" }}
								placeholder="Tên khách hàng"
								ref={searchNameRef}
							/>
						</div>
					</Col>

					<Col xs="auto">
						<div className="d-flex align-items-center">
							<input
								type="text"
								id="customerPhone"
								className="form-control"
								style={{ width: "250px" }}
								placeholder="Số điện thoại"
								ref={searchPhoneRef}
							/>
						</div>
					</Col>

					<Col xs="auto">
						<div className="d-flex">
							<button
								type="button"
								className="btn btn-secondary rounded-circle d-flex justify-content-center align-items-center"
								style={{ width: "40px", height: "40px" }}
								onClick={handleSearchName}
							>
								<FaSearch color="red" size={20} />
							</button>
							<button
								type="button"
								className="btn btn-secondary rounded-circle ms-2 d-flex justify-content-center align-items-center"
								style={{ width: "40px", height: "40px" }}
								onClick={reloadData}
							>
								<HiArrowPath style={{ width: "20px", height: "20px" }} />
							</button>
						</div>
					</Col>
				</Row>
			</div>

			<div className="container">
				<table className="table table-light table-bordered table-striped">
					<thead>
						<tr>
							<th className="text-center" style={{ width: "40px" }}>
								STT
							</th>
							<th className="text-center" style={{ width: "250px" }}>
								Họ Tên
							</th>
							<th className="text-center" style={{ width: "250px" }}>
								Email
							</th>
							<th className="text-center" style={{ width: "250px" }}>
								Số điện thoại
							</th>
							<th className="text-center" style={{ width: "250px" }}>
								Nội dung
							</th>
							<th className="text-center" style={{ width: "250px" }}></th>
						</tr>
					</thead>
					<tbody>
						{contactList.length === 0 ? (
							<tr>
								<td colSpan="6" className="text-center">
									Không có dữ liệu
								</td>
							</tr>
						) : (
							contactList.map((c, i) => (
								<tr key={c.id}>
									<td className="text-center">{(page - 1) * PAGE_SIZE + i + 1}</td>
									<td>{c.name}</td>
									<td>{c.email}</td>
									<td>{c.phone}</td>
									<td>{c.content}</td>
									<td className="text-center">
										<button onClick={() => showModalDelete(c)} className="btn btn-danger">
											Xoá
										</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
			<div>
				<DeleteContactUser contact={deleteContacts} show={show} closeModal={closeModal} />
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

export default ContactAdmin;
