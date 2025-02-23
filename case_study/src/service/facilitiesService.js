import axios from "axios";
import { BASE_URL } from "./api";

export async function getAllFacilities() {
	try {
		const response = await axios.get(`${BASE_URL}/facilitiesList`);
		return response.data;
	} catch (e) {
		return [];
	}
}

export async function searchByName(name, typeId) {
	try {
		let response = [];
		if (name && typeId) {
			response = await axios.get(`${BASE_URL}/facilitiesList?typeId=${typeId}&title_like=${name}`);
		} else if (typeId) {
			response = await axios.get(`${BASE_URL}/facilitiesList?typeId=${typeId}`);
		} else if (name) {
			response = await axios.get(`${BASE_URL}/facilitiesList?title_like=${name}`);
		} else {
			response = await axios.get(`${BASE_URL}/facilitiesList`);
		}
		return response.data;
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
