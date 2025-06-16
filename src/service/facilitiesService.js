import axios from "axios";
import { BASE_URL } from "./api";

export async function getAllFacilities(page, limit) {
	try {
		const response = await axios.get(`${BASE_URL}/facilitiesList?_page=${page}&_limit=${limit}`);
		const totalRecords = response.headers["x-total-count"];
		return [response.data, totalRecords];
	} catch (e) {
		return [];
	}
}

export async function searchByName(facilitiesId, typeId, page, limit) {
	try {
		let response = [];
		if (facilitiesId && typeId) {
			response = await axios.get(`${BASE_URL}/facilitiesList?id=${facilitiesId}&_page=${page}&_limit=${limit}&typeId=${typeId}`);
		} else if (typeId) {
			response = await axios.get(`${BASE_URL}/facilitiesList?_page=${page}&_limit=${limit}&typeId=${typeId}`);
		} else if (facilitiesId) {
			response = await axios.get(`${BASE_URL}/facilitiesList?id=${facilitiesId}&_page=${page}&_limit=${limit}`);
		} else {
			response = await axios.get(`${BASE_URL}/facilitiesList`);
		}
		const totalRecords = response.headers["x-total-count"];
		return [response.data, totalRecords];
	} catch (e) {}
}

export async function getFacilitiesById(id) {
	try {
		const response = await axios.get(`${BASE_URL}/facilitiesList/${id}`);
		return response.data;
	} catch (e) {}
}

export async function addNewFacilities(facilities) {
	try {
		const response = await axios.post(`${BASE_URL}/facilitiesList`, facilities);
		return response.data;
	} catch (e) {}
}

export async function deleteFacilitiesById(id) {
	try {
		const response = await axios.delete(`${BASE_URL}/facilitiesList/${id}`);
		return response.data;
	} catch (e) {}
}

export async function updateFacilities(id, facilities) {
	try {
		const response = await axios.put(`${BASE_URL}/facilitiesList/${id}`, facilities);
		return response.data;
	} catch (e) {
		return null;
	}
}

export async function getAllContact() {
	try {
		const response = await axios.get(`${BASE_URL}/contact`);
		return response.data;
	} catch (e) {
		return [];
	}
}

export async function getAllCard() {
	try {
		const response = await axios.get(`${BASE_URL}/card`);
		return response.data;
	} catch (e) {
		return [];
	}
}
