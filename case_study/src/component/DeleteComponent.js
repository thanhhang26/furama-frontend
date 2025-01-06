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
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Do you want to delete the facilities{" "}
					<strong>
						{facilities?.id} - {facilities?.name}
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

export default DeleteComponent;
