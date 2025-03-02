import { Outlet } from "react-router-dom";
import HeaderComponent from "../component_admin/HeaderComponent";
import NavigationComponent from "../component_admin/NavigationComponent";
import FooterComponent from "../component_admin/FooterComponent";
import { useSelector } from "react-redux";
import NavigationUser from "../component_user/NavigationUser";

//chứa header, navigation, footer
const HomeLayout = () => {
	const account = useSelector((state) => state?.user?.account); // Lấy thông tin tài khoản từ Redux

	return (
		<>
			<HeaderComponent />
			{account?.role === "ADMIN" ? <NavigationComponent /> : <NavigationUser />}
			<Outlet />
			<FooterComponent />
		</>
	);
};

export default HomeLayout;
