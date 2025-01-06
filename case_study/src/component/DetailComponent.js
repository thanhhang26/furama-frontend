import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import image1 from "../image1.jpg";
import image2 from "../image2.jpg";
import image3 from "../image3.jpg";
import { getFacilitiesById } from "../service/facilitiesService";
import { Link, useParams } from "react-router-dom";

function DetailComponent() {
	const [index, setIndex] = useState(0);
	const [facilitiesDetail, setFacilitiesDetail] = useState({
		id: "",
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
		<div>
			<div className="d-flex align-items-center mb-4">
				<div className="flex-grow-1 text-center mt-4">
					<h3>DETAIL</h3>
				</div>
			</div>

			<Carousel activeIndex={index} onSelect={handleSelect}>
				<Carousel.Item>
					<img src={image1} alt="Image1" />
					<Carousel.Caption>
						<h3>Living Room</h3>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img src={image2} alt="Image1" />
					<Carousel.Caption>
						<h3>Bedroom</h3>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img src={image3} alt="Image1" />
					<Carousel.Caption>
						<h3>Kitchen</h3>
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>

			<Container className="mt-5">
				<Row>
					<Col>
						<div className="">
							<p>{facilitiesDetail.information.bedroom} bedroom(s)</p>
							<p>{facilitiesDetail.information.bed} bed(s)</p>
							<p>{facilitiesDetail.information.bathroom} bathroom(s)</p>
						</div>
					</Col>

					<Col>
						<div className="">
							<p>{facilitiesDetail.information.kitchen} kitchen</p>
							<p>{facilitiesDetail.information.customer} customer(s)</p>
							<p>{facilitiesDetail.information.price} VNĐ</p>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default DetailComponent;
