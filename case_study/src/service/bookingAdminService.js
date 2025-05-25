import axios from "axios";
import { BASE_URL } from "./api";

export async function getAllBookingList(page, limit) {
	try {
		const response = await axios.get(`${BASE_URL}/booking?_page=${page}&_limit=${limit}`);
		const totalRecords = response.headers["x-total-count"];
		return [response.data, totalRecords];
	} catch (e) {
		return [];
	}
}

export async function searchBooking(nameBooking, phoneBooking, page, limit) {
	try {
		let response = [];
		if (phoneBooking) {
			response = await axios.get(`${BASE_URL}/booking?_page=${page}&_limit=${limit}&phone_like=${phoneBooking}`);
		} else {
			response = await axios.get(`${BASE_URL}/booking?_page=${page}&_limit=${limit}`);
		}
		const totalRecords = response.headers["x-total-count"];
		return [response.data, totalRecords];
	} catch (e) {}
}

export async function deleteBookingById(id) {
	try {
		const response = await axios.delete(`${BASE_URL}/booking/${id}`);
		return response.data;
	} catch (e) {}
}

export async function updateBooking(id, booking) {
	try {
		const response = await axios.put(`${BASE_URL}/booking/${id}`, booking);
		return response.data;
	} catch (e) {
		return null;
	}
}

export async function getBookingById(id) {
	try {
		const response = await axios.get(`${BASE_URL}/booking/${id}`);
		return response.data;
	} catch (e) {}
}
