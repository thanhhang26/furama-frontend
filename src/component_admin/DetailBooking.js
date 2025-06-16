import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useParams } from "react-router-dom";
import { getBookingById } from "../service/bookingAdminService";
import { getAllFacilities } from "../service/facilitiesService";

function DetailBooking() {
  const [bookingDetail, setBookingDetail] = useState({
    id: "",
    customer: {
      fullName: "",
      capital: "",
      phone: "",
      email: "",
    },
    startDate: "",
    endDate: "",
    guests: "",
    totalPrice: "",
    price: "",
    facilityId: "",
    facilityTitle: "",
    note: "",
  });

  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0); // Trượt lên đầu trang khi component được render
    const detailData = async () => {
      const rawFacilities = await getAllFacilities();
      const facilitiesData = rawFacilities.flat();

      const detail = await getBookingById(id);

      const matchedFacility = facilitiesData.find(
        (facility) => String(facility?.id ?? facility?.facility?.id) === String(detail.facilityId)
      );

      const priceFromFacility =
        matchedFacility?.information?.price ?? matchedFacility?.facility?.information?.price ?? "";
      const titleFromFacility = matchedFacility?.title ?? matchedFacility?.facility?.title ?? "Không rõ";
      console.log(titleFromFacility);

      setBookingDetail({
        ...detail,
        price: priceFromFacility,
        facilityTitle: titleFromFacility,
      });
    };

    detailData();
  }, [id]);

  return (
    <div className="container mt-4">
      <div>
        <h3 className="mb-3">Thông tin chi tiết của bạn</h3>
        <Row className="g-5">
          <Col md={6}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Họ và tên</label>
              <input
                type="text"
                name="customer.lastName"
                className="form-control"
                value={bookingDetail.customer.fullName}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                name="customer.email"
                className="form-control"
                value={bookingDetail.customer.email}
                readOnly
              />
            </div>
          </Col>

          <Col md={6}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Thành phố</label>
              <input
                type="text"
                name="customer.firstName"
                className="form-control"
                value={bookingDetail.customer.capital}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Số điện thoại</label>
              <input
                type="text"
                name="customer.phone"
                className="form-control"
                value={bookingDetail.customer.phone}
                readOnly
              />
            </div>
          </Col>
        </Row>
      </div>

      <div>
        <h3 className="mb-3">Thông tin đặt phòng</h3>
        <Row className="g-5">
          <Col md={6}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Ngày đến</label>
              <input type="date" name="startDate" className="form-control" value={bookingDetail.startDate} readOnly />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Giá tiền 1 ngày (VNĐ)</label>
              <input type="text" name="price" className="form-control" value={bookingDetail.price} readOnly />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Tổng tiền (VNĐ)</label>
              <input type="text" name="totalPrice" className="form-control" value={bookingDetail.totalPrice} readOnly />
            </div>
          </Col>

          <Col md={6}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Ngày đi</label>
              <input type="date" name="endDate" className="form-control" value={bookingDetail.endDate} readOnly />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Số lượng khách</label>
              <input type="number" name="guests" className="form-control" value={bookingDetail.guests} readOnly />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Loại phòng</label>
              <input
                type="text"
                name="facilityTitle"
                className="form-control"
                value={bookingDetail.facilityTitle}
                readOnly
              />
            </div>
          </Col>
        </Row>
        <div className="mb-3">
          <label className="form-label fw-semibold">Ghi chú</label>
          <textarea type="text" name="note" className="form-control" value={bookingDetail.note} readOnly />
        </div>
      </div>

      <div className="text-end mt-4">
        <Link type="button" className="btn btn-custom-outline ms-3 mb-3 px-4" to={`/bookingAdmin`}>
          Trở về
        </Link>
      </div>
    </div>
  );
}

export default DetailBooking;
