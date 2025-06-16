import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteBookingById } from "../service/bookingAdminService";

function DeleteBookingUser({ show, closeModal, booking }) {
  const handleClose = async () => {
    await closeModal();
  };

  const handleDelete = async () => {
    try {
      if (booking?.id) {
        await deleteBookingById(booking.id);
        handleClose();
      } else {
        console.error("No ID provided");
      }
    } catch (error) {
      return [];
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xoá đơn đặt phòng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có muốn xoá khách hàng{" "}
          <strong>
            {booking?.id} -{" "}
            {`${booking?.customer?.lastName || ""} ${booking?.customer?.firstName || ""}`.trim() ||
              "Không có tên khách hàng"}
          </strong>
          ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Xoá
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteBookingUser;
