import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { HiArrowPath } from "react-icons/hi2";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Pagination } from "react-bootstrap";
import { PAGE_SIZE } from "../service/constant";
import { getAllBookingList, searchBooking } from "../service/bookingAdminService";
import DeleteBookingUser from "./DeleteBookingUser";
import { getAllFacilities } from "../service/facilitiesService";

function BookingAdmin() {
  const [bookingList, setBookingList] = useState([]);
  const [totalSize, setTotalSize] = useState(PAGE_SIZE);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [show, setShow] = useState(false);
  const [deleteBookings, setDeleteBookings] = useState([]);
  const [reload, setReload] = useState(true);
  const { id } = useParams();
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0); // Trượt lên đầu trang khi component được render
    const fetchData = async () => {
      const [data, totalRecords] = await getAllBookingList(page, totalSize);
      const rawFacility = await getAllFacilities();
      const facilitiesData = rawFacility.flat();
      setBookingList(data);
      setFacilities(facilitiesData);
      setTotalPage(Math.ceil(totalRecords / PAGE_SIZE));
    };
    fetchData();
  }, [page, reload, show]);

  const searchNameRef = useRef();
  const searchPhoneRef = useRef();
  const searchRoomRef = useRef();
  const handleSearchName = async () => {
    let nameBooking = searchNameRef.current.value.trim().toLowerCase();
    let phoneBooking = searchPhoneRef.current.value.trim();
    let roomBooking = searchRoomRef.current.value.trim().toLowerCase();

    const [data, totalRecords] = await searchBooking(nameBooking, phoneBooking, roomBooking, page, PAGE_SIZE);
    setTotalPage(Math.ceil(totalRecords / PAGE_SIZE));
    setBookingList(data);
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
    setDeleteBookings(contact);
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  const reloadData = () => {
    searchNameRef.current.value = "";
    searchPhoneRef.current.value = "";
    searchRoomRef.current.value = "";
    setReload(!reload);
  };

  return (
    <div>
      <div className="container my-3">
        <div className="text-center mb-5">
          <h2>DANH SÁCH ĐẶT PHÒNG</h2>
        </div>
        <Row className="g-4 align-items-center booking-search-row">
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
            <div className="d-flex align-items-center">
              <input
                type="text"
                id="customerPhone"
                className="form-control"
                style={{ width: "250px" }}
                placeholder="Tên phòng"
                ref={searchRoomRef}
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

      <div className="container table-responsive-custom">
        <table className="table table-success table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th className="text-center" style={{ width: "40px" }}>
                STT
              </th>
              <th className="text-center" style={{ width: "250px" }}>
                Họ Tên
              </th>
              <th className="text-center" style={{ width: "250px" }}>
                Số điện thoại
              </th>
              <th className="text-center" style={{ width: "250px" }}>
                Loại phòng
              </th>
              <th colSpan={2} className="text-center" style={{ width: "250px" }}>
                Thông tin đặt phòng
              </th>
            </tr>
          </thead>
          <tbody>
            {bookingList.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              bookingList.map(
                (b, i) => (
                  console.log("Booking item:", b),
                  (
                    <tr key={b.id}>
                      <td className="text-center align-middle">{(page - 1) * PAGE_SIZE + i + 1}</td>
                      <td className="align-middle">{b.customer?.fullName || "Không rõ"}</td>
                      <td className="align-middle">{b.customer.phone}</td>
                      <td className="align-middle">
                        {facilities.find((f) => String(f.id) === String(b.facilityId))?.title || "Không rõ"}
                      </td>
                      <td className="text-center align-middle">
                        <Link className="btn btn-custom-outline me-3" to={`/detailBooking/${b.id}`}>
                          Chi tiết
                        </Link>
                        <Link className="btn btn-custom-outline me-3" to={`/editBooking/${b.id}`}>
                          Sửa
                        </Link>
                        <button onClick={() => showModalDelete(b)} className="btn btn-outline-danger">
                          Xoá
                        </button>
                      </td>
                    </tr>
                  )
                )
              )
            )}
          </tbody>
        </table>
      </div>
      <div>
        <DeleteBookingUser booking={deleteBookings} show={show} closeModal={closeModal} />
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

export default BookingAdmin;
