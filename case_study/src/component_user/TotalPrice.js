import { useEffect } from "react";
import { useFormikContext } from "formik";

function TotalPrice() {
	const { values, setFieldValue } = useFormikContext();
	const { startDate, endDate, price } = values;

	useEffect(() => {
		if (startDate && endDate && price) {
			const start = new Date(startDate);
			const end = new Date(endDate);

			if (isNaN(start.getTime()) || isNaN(end.getTime())) {
				setFieldValue("totalPrice", "");
				return;
				//Tạo đối tượng Date từ 2 ngày.
				// Nếu 1 trong 2 ngày không hợp lệ (kết quả NaN), đặt totalPrice về rỗng và dừng tính toán.
			}

			const diffTime = end.getTime() - start.getTime();
			const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

			const cleanedPrice = String(price).replace(/\./g, "");
			const parsedPrice = parseFloat(cleanedPrice);
			//Giá price có thể có dấu chấm (.) phân cách hàng nghìn, ví dụ "1.200.000".
			// Loại bỏ tất cả dấu chấm để chuyển thành chuỗi số thuần, ví dụ "1200000".
			// Chuyển chuỗi sang số thực (float).
			if (days > 0 && !isNaN(parsedPrice)) {
				//Tính tổng tiền = số ngày * giá tiền.
				const total = days * parsedPrice;

				// Format: 24.000.000
				const formattedTotal = new Intl.NumberFormat("vi-VN").format(total);
				setFieldValue("totalPrice", formattedTotal);
			} else {
				setFieldValue("totalPrice", "");
			}
		} else {
			setFieldValue("totalPrice", "");
		}
	}, [startDate, endDate, price, setFieldValue]);

	return null;
}

export default TotalPrice;

//diffTime tính số milliseconds giữa ngày kết thúc và ngày bắt đầu (1 giây = 1000 milliseconds, 1 phút = 60 giây, 1 giờ = 60 phút, 1 ngày = 24 giờ). Vậy 1000 * 60 * 60 * 24 = số milliseconds trong 1 ngày. Chia diffTime cho số này sẽ ra số ngày (theo số thực).
// Chia cho số milliseconds 1 ngày để ra số ngày.
// Dùng Math.ceil để làm tròn lên.
// Cộng thêm 1 để bao gồm cả ngày đầu và ngày cuối trong khoảng thời gian tính tổng. Cộng thêm 1 để tính cả ngày bắt đầu lẫn ngày kết thúc.
