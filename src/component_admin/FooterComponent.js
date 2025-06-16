import React, { useEffect, useState } from "react";
import { FaFacebookSquare, FaInstagramSquare, FaYoutube } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllContact } from "../service/facilitiesService";
import { GiPositionMarker } from "react-icons/gi";
import { FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

function FooterComponent() {
	const [show, setShow] = useState(false);
	const [contact, setContact] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const data = await getAllContact();
			setContact(data);
		};
		fetchData();
	}, []);
	return (
		<footer className="footer-container">
			<div className="footer-content">
				<div className="footer-left">
					<h2 className="footer-title">Hướng Dẫn Di Chuyển</h2>
					<p className="footer-text">Khu nghỉ dưỡng Furama là cơ sở hàng đầu để khám phá một trong những điểm đến hấp dẫn nhất Châu Á...</p>
					<button className="footer-button rounded-2" onClick={() => setShow(true)}>
						Xem Trên Bản Đồ
					</button>

					{/* Modal hiển thị bản đồ */}
					<Modal show={show} onHide={() => setShow(false)} size="lg" centered>
						<Modal.Header closeButton>
							<Modal.Title>Vị trí trên Google Maps</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<iframe
								title="Google Maps"
								width="100%"
								height="400"
								style={{ border: 0 }}
								allowFullScreen
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.7155586743224!2d108.2523074741787!3d16.028315840533764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421745e7d7db4b%3A0x7da015b86c51edea!2zMTAzIFbDtSBOZ3V5w6puIEdpw6FwLCBLaHXDqiBN4bu5LCBOZ8WpIEjDoG5oIFPGoW4sIMSQw6AgTuG6tW5nLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1740338513942!5m2!1svi!2s"
							></iframe>
						</Modal.Body>
					</Modal>

					<h3 className="footer-subtitle">Địa Điểm</h3>
					<ul className="footer-list">
						<li>
							<span className="location-name">Cố đô Huế</span>
							<span className="location-time">2 tiếng</span>
						</li>
						<li>
							<span className="location-name">Phố cổ Hội An</span>
							<span className="location-time">30 phút</span>
						</li>
						<li>
							<span className="location-name">Thánh địa Mỹ Sơn</span>
							<span className="location-time">90 phút</span>
						</li>
						<li>
							<span className="location-name">Động Phong Nha</span>
							<span className="location-time">3 tiếng</span>
						</li>
					</ul>
				</div>

				<div className="footer-right">
					<h3 className="footer-contact-title">Liên hệ</h3>
					{contact?.length > 0 ? (
						contact.map((c) => (
							<div key={c.id}>
								<p>
									<span className=" me-3">
										<GiPositionMarker />
									</span>
									{c.address}
								</p>
								<p>
									<span className="me-3">
										<FaPhone />
									</span>
									{c.phone}
								</p>
								<p>
									<span className="me-3">
										<IoMdMail />
									</span>
									{c.mail}
								</p>
							</div>
						))
					) : (
						<p className="text-center">Không có dữ liệu</p>
					)}
					<div className="footer-social-icons">
						<Link to="#" className="social-icon">
							<FaFacebookSquare />
						</Link>
						<Link to="#" className="social-icon">
							<FaInstagramSquare />
						</Link>
						<Link to="#" className="social-icon">
							<FaYoutube />
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default FooterComponent;
