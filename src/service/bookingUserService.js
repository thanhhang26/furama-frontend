import axios from "axios";
import { BASE_URL } from "./api";

export async function getAllBooking() {
	try {
		const response = await axios.get(`${BASE_URL}/booking`);
		return response.data;
	} catch (e) {
		return [];
	}
}

export async function addBooking(booking) {
	try {
		const response = await axios.post(`${BASE_URL}/booking`, booking);
		return response.data;
	} catch (e) {
		return [];
	}
}
