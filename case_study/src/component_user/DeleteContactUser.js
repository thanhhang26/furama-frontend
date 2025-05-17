import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteContactById } from "../service/contactService";

function DeleteContactUser({ show, closeModal, contact }) {
	const handleClose = async () => {
		await closeModal();
	};

	const handleDelete = async () => {
		try {
			if (contact?.id) {
				await deleteContactById(contact.id);
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
					<Modal.Title>Xoá liên hệ</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Bạn có muốn xoá liên hệ{" "}
					<strong>
						{contact?.id} - {contact?.name}
					</strong>
					?
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleDelete}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default DeleteContactUser;
