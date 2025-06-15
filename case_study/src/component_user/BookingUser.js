import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllFacilities } from "../service/facilitiesService";
import { addBooking, getAllBooking } from "../service/bookingUserService";
import { Bounce, toast } from "react-toastify";
import TotalPrice from "./TotalPrice";
import { IoBedSharp } from "react-icons/io5";
import { TbToolsKitchen } from "react-icons/tb";
import { FaBath } from "react-icons/fa";
import { MdError } from "react-icons/md";

function BookingUser() {
  const [booking, setBooking] = useState({
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
    facilityId: "id",
  });

  const [selectedFacility, setSelectedFacility] = useState(null);
  const { id } = useParams();
  console.log("ID from URL:", id);
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      const rawFacilities = await getAllFacilities();
      const facilitiesData = rawFacilities.flat();

      const matchedFacility = facilitiesData.find(
        (facility) => String(facility?.id ?? facility?.facility?.id) === String(id)
      );

      if (matchedFacility) {
        const priceFromFacility =
          matchedFacility?.information?.price ?? matchedFacility?.facility?.information?.price ?? "";

        setSelectedFacility(matchedFacility);

        setBooking({
          id: "",
          customer: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
          },
          startDate: "",
          endDate: "",
          guests: "",
          totalPrice: "",
          price: priceFromFacility,
          facilityId: matchedFacility?.id ?? matchedFacility?.facility?.id ?? "",
          note: "",
        });
      } else {
        setSelectedFacility(null);
        setBooking({
          id: "",
          customer: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
          },
          startDate: "",
          endDate: "",
          guests: "",
          totalPrice: "",
          price: "",
          facilityId: "",
          note: "",
        });
      }
    };

    fetchData();
  }, [id]);

  const validationSchema = Yup.object({
    customer: Yup.object({
      fullName: Yup.string().trim().required("Trường này là bắt buộc"), //.trim(): tránh lỗi khoảng trắng vô tình khi nhập
      capital: Yup.string().trim().required("Trường này là bắt buộc"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa số")
        .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
        .max(11, "Số điện thoại không được quá 11 chữ số")
        .required("Trường này là bắt buộc"),
      email: Yup.string().email("Email không hợp lệ").required("Trường này là bắt buộc"),
    }),
    guests: Yup.number()
      .typeError("Số khách phải là số")
      .min(1, "Số khách phải ít nhất là 1")
      .required("Trường này là bắt buộc"),
    startDate: Yup.date().required("Trường này là bắt buộc"),
    endDate: Yup.date()
      .min(Yup.ref("startDate"), "Ngày đi phải sau hoặc bằng ngày đến")
      .required("Trường này là bắt buộc"),
  });

  const navigate = useNavigate();
  const handleSubmit = async (value) => {
    const booking = {
      ...value,
    };

    await addBooking(booking);
    toast.success("Đặt phòng thành công!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    navigate("/facilities");
  };

  return (
    <>
      <div className="container card mt-4 mb-4 p-3 shadow-sm" style={{ borderRadius: 12 }}>
        {selectedFacility ? (
          <Row>
            <Col md={5}>
              <img
                src={selectedFacility?.image}
                alt={selectedFacility?.imgAlt || "Facility"}
                className="img-fluid rounded"
                style={{ objectFit: "cover", width: "100%", height: "220px" }}
              />
            </Col>
            <Col md={7} className="d-flex flex-column justify-content-start">
              <h2>{selectedFacility?.title}</h2>
              <p className="text-body-tertiary mb-4">{selectedFacility?.information.customer} khách</p>
              <p className="d-flex gap-4 flex-wrap align-items-center mb-4">
                <span className="d-flex align-items-center gap-1">
                  <IoBedSharp /> {selectedFacility?.information.bedroom} phòng ngủ
                </span>
                <span className="d-flex align-items-center gap-1">
                  <TbToolsKitchen /> {selectedFacility?.information.kitchen} phòng bếp
                </span>
                <span className="d-flex align-items-center gap-1">
                  <FaBath /> {selectedFacility?.information.bathroom} phòng tắm
                </span>
              </p>
              <p className="text-body-secondary">
                {selectedFacility?.size} m<sup>2</sup> {" • "}
                {selectedFacility?.features?.map((item, index, arr) => (
                  <span key={index}>
                    {item}
                    {index < arr.length - 1 && " • "}
                  </span>
                ))}
              </p>
              <span className="d-flex align-items-center gap-1 mt-2">
                <MdError />
                Không hoàn tiền | Thanh toán ngay hôm nay
              </span>
            </Col>
          </Row>
        ) : (
          <p className="text-center">Không có dữ liệu</p>
        )}
      </div>

      <div className="container mt-4">
        <Formik
          enableReinitialize={true}
          initialValues={booking}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form className="card p-4 mb-4">
            <TotalPrice />
            <div>
              <h3 className="mb-3">Thông tin chi tiết của bạn</h3>
              <Row className="g-5">
                <Col md={6}>
                  <div className="mb-3 ">
                    <label className="form-label fw-semibold">Họ và tên</label>
                    <Field
                      type="text"
                      name="customer.fullName"
                      className="form-control"
                      placeholder="Nhập họ tên của bạn"
                    />
                    <ErrorMessage name="customer.lastName" component="div" className="text-danger" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email</label>
                    <Field type="email" name="customer.email" className="form-control" placeholder="Nhập email" />
                    <ErrorMessage name="customer.email" component="div" className="text-danger" />
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Thành phố</label>
                    <Field
                      type="text"
                      name="customer.capital"
                      className="form-control"
                      placeholder="Nhập thành phố của bạn"
                    />
                    <ErrorMessage name="customer.firstName" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Số điện thoại</label>
                    <Field
                      type="text"
                      name="customer.phone"
                      className="form-control"
                      placeholder="Nhập số điện thoại của bạn"
                    />
                    <ErrorMessage name="customer.phone" component="div" className="text-danger" />
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
                    <Field type="date" name="startDate" className="form-control" placeholder="Nhập họ của bạn" />
                    <ErrorMessage name="startDate" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Giá tiền 1 ngày (VNĐ)</label>
                    <Field name="price">
                      {({ field }) => (
                        <input {...field} type="text" className="form-control" readOnly value={field.value || ""} />
                      )}
                    </Field>
                    <ErrorMessage name="price" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold ">Tổng tiền (VNĐ)</label>
                    <Field type="text" name="totalPrice" className="form-control" readOnly />
                    <ErrorMessage name="totalPrice" component="div" className="text-danger" />
                  </div>
                </Col>

                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Ngày đi</label>
                    <Field type="date" name="endDate" className="form-control" placeholder="Nhập tên của bạn" />
                    <ErrorMessage name="endDate" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Số lượng khách</label>
                    <Field type="number" name="guests" className="form-control" placeholder="Nhập số lượng khách" />
                    <ErrorMessage name="guests" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Ghi chú (Không bắt buộc)</label>
                    <Field as="textarea" name="note" className="form-control" placeholder="Nội dung" rows="1" />
                    <ErrorMessage name="note" component="div" className="text-danger" />
                  </div>
                </Col>
              </Row>
            </div>

            <div className="text-center mt-4">
              <Button type="submit" className="btn btn-custom-outline px-4">
                Đặt phòng
              </Button>
              <Link type="button" className="btn btn-outline-secondary ms-3 px-4" to={`/facilities`}>
                Trở về
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default BookingUser;
