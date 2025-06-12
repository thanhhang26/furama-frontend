import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllFacilities } from "../service/facilitiesService";
import { getAllBooking } from "../service/bookingUserService";
import { Bounce, toast } from "react-toastify";
import TotalPrice from "../component_user/TotalPrice";
import { updateBooking } from "../service/bookingAdminService";

function EditBooking() {
  const [booking, setBooking] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedFacility, setSelectedFacility] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0); // Trượt lên đầu trang khi component được render
    const fetchData = async () => {
      const bookingData = await getAllBooking();
      const rawFacilities = await getAllFacilities();
      const facilitiesData = rawFacilities.flat();

      const selectedBooking = bookingData.find((item) => String(item.id) === String(id));
      if (selectedBooking) {
        const matchedFacility = facilitiesData.find(
          (facility) => String(facility?.id ?? facility?.facility?.id) === String(selectedBooking?.facilityId)
        );
        const priceFromFacility = matchedFacility?.information?.price ?? matchedFacility?.facility?.information?.price;
        const titleFromFacility = matchedFacility?.title ?? matchedFacility?.facility?.title;

        setSelectedFacility(matchedFacility);
        setBooking({
          ...selectedBooking,
          price: priceFromFacility || "",
          facilityTitle: titleFromFacility,
        });
      }
    };
    fetchData();
  }, [id]);

  const validationSchema = Yup.object({
    customer: Yup.object({
      firstName: Yup.string().trim().required("Vui lòng nhập điền vào chỗ trống"), //.trim(): tránh lỗi khoảng trắng vô tình khi nhập
      lastName: Yup.string().trim().required("Vui lòng nhập điền vào chỗ trống"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa số")
        .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
        .max(11, "Số điện thoại không được quá 11 chữ số")
        .required("Vui lòng nhập số điện thoại"),
      email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập điền vào chỗ trống"),
    }),
    guests: Yup.number()
      .typeError("Số khách phải là số")
      .min(1, "Số khách phải ít nhất là 1")
      .required("Vui lòng nhập số khách"),
    startDate: Yup.date().required("Vui lòng chọn ngày đến"),
    endDate: Yup.date()
      .min(Yup.ref("startDate"), "Ngày đi phải sau hoặc bằng ngày đến")
      .required("Vui lòng chọn ngày đi"),
  });

  const handleSubmit = async (value) => {
    await updateBooking(value.id, value);
    toast.success("Chỉnh sửa thành công!", {
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
    navigate("/bookingAdmin");
  };

  return (
    <>
      <div className="container mt-4">
        <h3 className="text-center">CHỈNH SỬA THÔNG TIN ĐẶT PHÒNG</h3>
        <Formik
          enableReinitialize={true}
          initialValues={booking}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form className=" p-4 mb-4">
            <TotalPrice />
            <div>
              <h4 className="mb-3">Thông tin chi tiết của bạn</h4>
              <Row className="g-5">
                <Col md={6}>
                  <div className="mb-3 ">
                    <label className="form-label fw-semibold">Họ</label>
                    <Field
                      type="text"
                      name="customer.lastName"
                      className="form-control"
                      placeholder="Nhập họ của bạn"
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
                    <label className="form-label fw-semibold">Tên</label>
                    <Field
                      type="text"
                      name="customer.firstName"
                      className="form-control"
                      placeholder="Nhập tên của bạn"
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
              <h4 className="mb-3">Thông tin đặt phòng</h4>
              <Row className="g-5">
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Ngày đến</label>
                    <Field type="date" name="startDate" className="form-control" placeholder="Nhập họ của bạn" />
                    <ErrorMessage name="startDate" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Giá tiền 1 ngày (VNĐ)</label>
                    <Field type="text" name="price" className="form-control" readOnly />
                    <ErrorMessage name="price" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Tổng tiền (VNĐ)</label>
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
                    <label className="form-label fw-semibold">Loại phòng</label>
                    <Field type="text" name="facilityTitle" className="form-control" placeholder="Tên loại phòng" />
                    <ErrorMessage name="facilityTitle" component="div" className="text-danger" />
                  </div>
                </Col>
              </Row>
            </div>
            {/* Nút Submit */}
            <div className="text-center mt-4">
              <Button type="submit" className="btn btn-custom-outline px-4">
                Lưu
              </Button>
              <Link type="button" className="btn btn-outline-secondary ms-3 px-4" to={`/bookingAdmin`}>
                Trở về
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default EditBooking;
