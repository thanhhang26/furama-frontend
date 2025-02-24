import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ReactPlayer from "react-player";

function Homepage() {
	return (
		<Container className="mt-5">
			<Row>
				<Col md={6}>
					<h2 className="fw-bold d-flex text-align-justify" style={{ color: "#cbbe73" }}>
						KHU NGHỈ DƯỠNG ĐẲNG CẤP THẾ GIỚI FURAMA ĐÀ NẴNG
					</h2>
					<p>
						Hướng ra bãi biển Đà Nẵng trải dài cát trắng, Furama Resort Đà Nẵng là cửa ngõ đến với 3 di sản văn hoá thế giới: Hội An (20 phút), Mỹ Sơn
						(90 phút) và Huế (120 phút). Với 196 phòng hạng sang cùng với 68 căn biệt thự từ hai đến bốn phòng ngủ có hồ bơi riêng đều được trang trí
						trang nhã, theo phong cách thiết kế truyền thống của Việt Nam và kiến trúc thuộc địa của Pháp, biến Furama thành khu nghỉ dưỡng danh giá
						nhất tại Việt Nam – vinh dự được đón tiếp nhiều người nổi tiếng, giới hoàng gia, chính khách, ngôi sao điện ảnh và các nhà lãnh đạo kinh
						doanh quốc tế.
					</p>
				</Col>
				<Col md={6} className="text-center">
					<ReactPlayer url="https://youtu.be/MzwSoM9EQl4" controls width="100%" />{" "}
				</Col>
			</Row>

			<Row className="mt-4">
				<Col md={6} className="text-center ">
					<img src="https://furamavietnam.com/wp-content/uploads/2018/08/06-2.jpg" alt="Beach View" className="img-fluid rounded" />
					<img src="https://furamavietnam.com/wp-content/uploads/2018/08/DES-PHONGNHA-1.jpg" alt="Beach View" className="img-fluid rounded mt-3" />
				</Col>
				<Col md={6}>
					<p>
						Ẩm thực tại khu nghỉ dưỡng là trải nghiệm kết hợp giữa các món ăn Việt Nam, châu Á, Ý và châu Âu cùng các món bít tết nhập khẩu hảo hạng.
						Khu nghỉ dưỡng mang đến cho quý khách những không gian ẩm thực đa dạng bao gồm – quầy bar nhìn ra biển, hồ bơi Lagoon được bao quanh bởi
						khu vườn nhiệt đới, ẩm thực truyền thống Ý tại nhà hàng Don Cipriani’s, chất Á Đông tại Café Indochine hay nhà hàng bít tết “The Fan – Cái
						Quạt” nằm ngay trên bãi biển. Khu nghỉ dưỡng Furama Đà Nẵng còn gây ấn tượng và tạo nhiều thích thú cho khách thông qua các chương trình
						vui chơi đầy thú vị như các chuyến du ngoạn, thể thao trên nước, lặn biển cũng như các dịch vụ Spa, chăm sóc sức khoẻ và sắc đẹp.
					</p>
					<p>
						Nằm tại vị trí đắc địa gần trung tâm Đà Nẵng và là nơi kết nối quốc tế thuận tiện đến Singapore, Bangkok, Xiêm Riệp, Kuala Lumpur, Đài
						Loan, Tokyo, Osaka, Busan, Seoul, Tokyo, Osaka và Hồng Kông – Ma Cao, Trung Quốc bao gồm: Bắc Kinh, Thượng Hải, Hàng Châu, Quảng Châu,
						Thành Đô bằng các chuyến bay trực tiếp, khu nghỉ dưỡng Furama Đà Nẵng là điểm đến lý tưởng cho các đại lý du lịch, doanh nghiệp, công ty
						tổ chức sự kiện. Cung Hội nghị có thể chứa tới 3000 người, cùng với 10 phòng chức năng khác có sức chứa từ 50 đến 300 người. Cung hội nghị
						Ariyana Convention Centre Đà Nẵng (ACC) được xây dựng để tổ chức sự kiện APEC 2017, kết nối với Cung hội nghị Furama (ICP) tạo thành quần
						thể MICE lớn nhất Việt Nam có sức chứa lên tới 5,000 khách.
					</p>
					<p>
						Một loạt các bữa tiệc theo chủ đề trên bãi biển hoặc xung quanh hồ Lagoon, trong phòng đại tiệc hoặc bên ngoài khu nghỉ dưỡng. Thêm vào đó
						là các hoạt động nhóm và thể thao trên nước, “Trung tâm lặn” đạt tiêu chuẩn lặn biển quốc tế, cũng như các dịch vụ chăm sóc sức khoẻ và
						sắc đẹp đã khiến Furama Đà Nẵng trở thành địa điểm lý tưởng cho các nhóm MICE.
					</p>
				</Col>
			</Row>
		</Container>
	);
}
export default Homepage;
