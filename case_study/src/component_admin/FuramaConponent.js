import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ReactPlayer from "react-player";
import { getAllCard } from "../service/facilitiesService";

function FuramaComponent() {
	const [card, setCard] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const data = await getAllCard();
			setCard(data);
		};
		fetchData();
	}, []);
	return (
		<>
			<div
				style={{
					backgroundImage:
						"url('https://sktravel.com.vn/wp-content/uploads/2021/05/top-4-khach-san-resort-co-khong-gian-thien-nhien-dep-nhat-nha-trang.jpg')",
					height: "100vh",
					backgroundSize: "cover",
					backgroundPosition: "center",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					color: "white",
				}}
			></div>
			<div className="mt-5 p-4 ">
				<Row>
					<Col md={3}>
						<h2 className="fw-bold text-align-justify" style={{ color: "#cbbe73" }}>
							KHU NGHỈ DƯỠNG ĐẲNG CẤP THẾ GIỚI FURAMA ĐÀ NẴNG
						</h2>
					</Col>
					<Col md={5} className="text-center">
						<ReactPlayer url="https://www.youtube.com/watch?v=Z6_JZ8Ao6-c" controls width="90%" height={"90%"} />
					</Col>
					<Col md={4} className="text-center mt-3">
						<p style={{ textAlign: "justify" }}>
							Hướng ra bãi biển Đà Nẵng trải dài cát trắng, Furama Resort Đà Nẵng là cửa ngõ đến với 3 di sản văn hoá thế giới: Hội An (20 phút), Mỹ
							Sơn (90 phút) và Huế (120 phút). Với 196 phòng hạng sang cùng với 70 căn biệt thự từ hai đến bốn phòng ngủ có hồ bơi riêng đều được
							trang trí trang nhã, theo phong cách thiết kế truyền thống của Việt Nam và kiến trúc thuộc địa của Pháp, biến Furama thành khu nghỉ
							dưỡng danh giá nhất tại Việt Nam – vinh dự được đón tiếp nhiều người nổi tiếng, giới hoàng gia, chính khách, ngôi sao điện ảnh và các
							nhà lãnh đạo kinh doanh quốc tế.
						</p>
					</Col>
				</Row>
			</div>
			<div>
				<h3 className="fw-bold d-flex text-align-center justify-content-center" style={{ color: "#cbbe73" }}>
					ƯU ĐÃI & KHUYẾN MẠI
				</h3>
				<div className="container mb-4">
					<Row xs={1} md={3} className="g-4 mt-3">
						{card?.length > 0 ? (
							card.map((card) => (
								<Col key={card.id}>
									<Card className="h-100 d-flex flex-column shadow">
										<Card.Img variant="top" src={card.imgSrc} alt={card.imgAlt} />
										<Card.Body className="d-flex flex-column">
											<Card.Text style={{ textAlign: "justify" }}>{card.text}</Card.Text>
										</Card.Body>
									</Card>
								</Col>
							))
						) : (
							<p className="text-center">Không có dữ liệu</p>
						)}
					</Row>
				</div>
			</div>
		</>
	);
}

export default FuramaComponent;
