import axios from "axios";
import { BASE_URL } from "./api";

export async function checkLogin(loginInfo) {
	try {
		const response = await axios.get(`${BASE_URL}/accounts`);
		const account = response.data.find((account) => account.username == loginInfo.username && account.password == loginInfo.password);
		if (account != null) {
			return account;
		} else {
			return null;
		}
	} catch (error) {}
}

// Lấy danh sách user theo email (kiểm tra email tồn tại)
export async function checkUser(email) {
	try {
		const response = await axios.get(`${BASE_URL}/accounts?email=${email}`);
		return response.data.length > 0; // Nếu có ít nhất 1 tài khoản có email này, trả về true
	} catch (error) {
		console.error("Lỗi khi kiểm tra email:", error);
		return false; // Trả về false nếu có lỗi xảy ra
	}
}

// Đăng ký user mới
export async function registerUser(userData) {
	try {
		const response = await axios.post(`${BASE_URL}/accounts`, userData);
		return response.data;
	} catch (error) {
		console.error("Lỗi khi đăng ký tài khoản:", error);
		return null;
	}
}
