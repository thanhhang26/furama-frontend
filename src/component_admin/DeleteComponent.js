import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteFacilitiesById } from "../service/facilitiesService";

function DeleteComponent({ show, closeModal, facilities }) {
	const handleClose = async () => {
		await closeModal();
	};

	const handleDelete = async () => {
		try {
			if (facilities?.id) {
				await deleteFacilitiesById(facilities.id);
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
					<Modal.Title>Xoá dịch vụ</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Bạn có muốn xoá dịch vụ{" "}
					<strong>
						{facilities?.id} - {facilities?.title}
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

export default DeleteComponent;
