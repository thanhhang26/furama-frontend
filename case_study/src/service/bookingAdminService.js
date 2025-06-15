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

export async function searchBooking(nameBooking, phoneBooking, roomBooking, page, limit) {
  try {
    let response = [];

    if (nameBooking && phoneBooking && roomBooking) {
      response = await axios.get(
        `${BASE_URL}/booking?_page=${page}&_limit=${limit}&customer.fullName_like=${nameBooking}&customer.phone_like=${phoneBooking}&facilityTitle_like=${roomBooking}`
      );
    } else if (nameBooking && roomBooking) {
      response = await axios.get(
        `${BASE_URL}/booking?_page=${page}&_limit=${limit}&customer.fullName_like=${nameBooking}&facilityTitle_like=${roomBooking}`
      );
    } else if (phoneBooking && roomBooking) {
      response = await axios.get(
        `${BASE_URL}/booking?_page=${page}&_limit=${limit}&customer.phone_like=${phoneBooking}&facilityTitle_like=${roomBooking}`
      );
    } else if (nameBooking && phoneBooking) {
      response = await axios.get(
        `${BASE_URL}/booking?_page=${page}&_limit=${limit}&customer.fullName_like=${nameBooking}&customer.phone_like=${phoneBooking}`
      );
    } else if (nameBooking) {
      response = await axios.get(
        `${BASE_URL}/booking?_page=${page}&_limit=${limit}&customer.fullName_like=${nameBooking}`
      );
    } else if (phoneBooking) {
      response = await axios.get(
        `${BASE_URL}/booking?_page=${page}&_limit=${limit}&customer.phone_like=${phoneBooking}`
      );
    } else if (roomBooking) {
      response = await axios.get(`${BASE_URL}/booking?_page=${page}&_limit=${limit}&facilityTitle_like=${roomBooking}`);
    } else {
      response = await axios.get(`${BASE_URL}/booking?_page=${page}&_limit=${limit}`);
    }

    return [response.data, response.headers["x-total-count"]];
  } catch (e) {
    console.error("Lỗi khi tìm kiếm booking:", e);
    return [[], 0];
  }
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
