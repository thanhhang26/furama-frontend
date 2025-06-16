import axios from "axios";
import { BASE_URL } from "./api";

export async function getAllContactList(page, limit) {
	try {
		const response = await axios.get(`${BASE_URL}/contactList?_page=${page}&_limit=${limit}`);
		const totalRecords = response.headers["x-total-count"];
		return [response.data, totalRecords];
	} catch (e) {
		return [];
	}
}

export async function search(nameContact, phoneContact, page, limit) {
	try {
		let response = [];
		if (nameContact && phoneContact) {
			response = await axios.get(`${BASE_URL}/contactList?name_like=${nameContact}&_page=${page}&_limit=${limit}&phone_like=${phoneContact}`);
		} else if (phoneContact) {
			response = await axios.get(`${BASE_URL}/contactList?_page=${page}&_limit=${limit}&phone_like=${phoneContact}`);
		} else if (nameContact) {
			response = await axios.get(`${BASE_URL}/contactList?name_like=${nameContact}&_page=${page}&_limit=${limit}`);
		} else {
			response = await axios.get(`${BASE_URL}/contactList?_page=${page}&_limit=${limit}`);
		}
		const totalRecords = response.headers["x-total-count"];
		return [response.data, totalRecords];
	} catch (e) {}
}

export async function addNewContacts(contactList) {
	try {
		const response = await axios.post(`${BASE_URL}/contactList`, contactList);
		return response.data;
	} catch (e) {}
}

export async function deleteContactById(id) {
	try {
		const response = await axios.delete(`${BASE_URL}/contactList/${id}`);
		return response.data;
	} catch (e) {}
}
