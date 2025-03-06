export async function uploadImageToCloudinary(file) {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("upload_preset", "upload_image");
	formData.append("cloud_name", "dtcpg30ca");
	try {
		const response = await fetch(`https://api.cloudinary.com/v1_1/dtcpg30ca/image/upload`, {
			method: "POST",
			body: formData,
		});
		const data = await response.json();
		return data.secure_url; // Trả về URL ảnh từ Cloudinary
	} catch (error) {
		console.error("Lỗi tải ảnh lên Cloudinary:", error);
		return null;
	}
}
