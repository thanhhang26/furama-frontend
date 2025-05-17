import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import image1 from "../image1.jpg";
import image2 from "../image2.jpg";
import image3 from "../image3.jpg";
import { getFacilitiesById } from "../service/facilitiesService";
import { Link, useParams } from "react-router-dom";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

function DetailUser() {
	const [index, setIndex] = useState(0);
	const [facilitiesDetail, setFacilitiesDetail] = useState({
		id: "",
		title: "",
		information: {
			bedroom: "",
			bed: "",
			bathroom: "",
			kitchen: "",
			customer: "",
			price: "",
		},
	});

	const { id } = useParams();
	useEffect(() => {
		window.scrollTo(0, 0); // Trượt lên đầu trang khi component được render
		const detailData = async () => {
			const detail = await getFacilitiesById(id);
			setFacilitiesDetail(detail);
		};
		detailData();
	}, [id]);

	const handleSelect = (selectedIndex) => {
		setIndex(selectedIndex);
	};

	return (
		<div className="mt-4">
			<h3 className="text-center mb-4" style={{ color: "#cbbe73" }}>
				{facilitiesDetail.title}
			</h3>
			<Carousel activeIndex={index} onSelect={handleSelect} className=" shadow overflow-hidden">
				<Carousel.Item>
					<img src={image1} alt="Living Room" className="d-block w-100" />
				</Carousel.Item>
				<Carousel.Item>
					<img src={image2} alt="Bedroom" className="d-block w-100" />
				</Carousel.Item>
				<Carousel.Item>
					<img src={image3} alt="Kitchen" className="d-block w-100" />
				</Carousel.Item>
			</Carousel>

			<Row className="mt-4 ms-3 me-3 mb-3">
				<Col md={8}>
					<Row className="g-3">
						{" "}
						<Col md={6} className="text-center">
							<Card className="p-3 shadow-sm h-100 d-flex flex-column justify-content-center">
								<p className="fw-bold">Phòng ngủ</p>
								<p>{facilitiesDetail.information.bedroom} phòng ngủ</p>
							</Card>
						</Col>
						<Col md={6} className="text-center">
							<Card className="p-3 shadow-sm h-100 d-flex flex-column justify-content-center">
								<p className="fw-bold">Giường</p>
								<p>{facilitiesDetail.information.bed} giường</p>
							</Card>
						</Col>
						<Col md={6} className="text-center">
							<Card className="p-3 shadow-sm h-100 d-flex flex-column justify-content-center">
								<p className="fw-bold">Phòng tắm</p>
								<p>{facilitiesDetail.information.bathroom} phòng tắm</p>
							</Card>
						</Col>
						<Col md={6} className="text-center">
							<Card className="p-3 shadow-sm h-100 d-flex flex-column justify-content-center">
								<p className="fw-bold">Phòng bếp</p>
								<p>{facilitiesDetail.information.kitchen} phòng bếp</p>
							</Card>
						</Col>
						<Col md={6} className="text-center">
							<Card className="p-3 shadow-sm h-100 d-flex flex-column justify-content-center">
								<p className="fw-bold">Khách hàng</p>
								<p>{facilitiesDetail.information.customer} khách hàng</p>
							</Card>
						</Col>
						<Col md={6} className="text-center">
							<Card className="p-3 shadow-sm h-100 d-flex flex-column justify-content-center">
								<p className="fw-bold">Giá tiền (VNĐ)</p>
								<p>{facilitiesDetail.information.price}</p>
							</Card>
						</Col>
					</Row>
				</Col>
				<Col md={4}>
					<Card className="shadow-sm p-3 text-white" style={{ backgroundColor: "#046056" }}>
						<ul className="list-unstyled">
							<li>
								<FaRegArrowAltCircleRight className="me-2" />
								Nhận Phòng: 02:00 PM
							</li>
							<li>
								<FaRegArrowAltCircleRight className="me-2" />
								Trả Phòng: 11:00 AM
							</li>
							<li>
								<FaRegArrowAltCircleRight className="me-2" />
								Dịch Vụ Vận Chuyển
							</li>
							<li>
								<FaRegArrowAltCircleRight className="me-2" />
								Cung Cấp Trợ Giúp Đặc Biệt
							</li>
							<li>
								<FaRegArrowAltCircleRight className="me-2" />
								Dịch Vụ Phòng
							</li>
						</ul>
						<Link variant="light" className=" btn w-100 btn-custom" to={"/booking"}>
							ĐẶT PHÒNG
						</Link>
						<p className="text-center mt-2">Best Choice - Low Price Guarantee</p>
					</Card>
				</Col>
			</Row>
		</div>
	);
}

export default DetailUser;
