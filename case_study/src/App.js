import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import FacilitiesList from "./component_admin/FacilitiesList";
import DetailComponent from "./component_admin/DetailComponent";
import AddComponent from "./component_admin/AddComponent";
import Homepage from "./component_admin/Homepage";
import EditComponent from "./component_admin/EditComponent";
import { ToastContainer } from "react-toastify";
import HomeLayout from "./layout/HomeLayout";
import AuthLayout from "./layout/AuthLayout";
import { useSelector } from "react-redux";
import FacilitiesUser from "./component_user/FacilitiesUser";
import DetailUser from "./component_user/DetailUser";
import ContactUser from "./component_user/ContactUser";
import FuramaComponent from "./component_admin/FuramaConponent";
import LoginComponent from "./login-logout/LoginComponent";
import Register from "./login-logout/Register";
import BookingUser from "./component_user/BookingUser";
import ContactAdmin from "./component_admin/ContactAdmin";
import BookingAdmin from "./component_admin/BookingAdmin";
function App() {
	<div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
		<BookingUser />
	</div>;
	const account = useSelector((state) => state?.user?.account);
	return (
		<>
			<Routes>
				<Route element={<HomeLayout />}>
					<Route path="/" element={<FuramaComponent />} />
					<Route path={"/furama"} element={<FuramaComponent />}></Route>
					<Route path={"/homepage"} element={<Homepage />}></Route>
					<Route path={"/facilities"} element={account?.role === "ADMIN" ? <FacilitiesList /> : <FacilitiesUser />} />
					<Route path={"/facilities/detail/:id"} element={account?.role === "ADMIN" ? <DetailComponent /> : <DetailUser />} />
					<Route path={"/add_new"} element={account?.role === "ADMIN" ? <AddComponent /> : <Navigate to="/" />} />
					<Route path={"/edit/:id"} element={account?.role === "ADMIN" ? <EditComponent /> : <Navigate to="/" />} />
					<Route path={"/contact"} element={<ContactUser />}></Route>
					<Route path={"/booking"} element={<BookingUser />}></Route>
					<Route path={"/contactAdmin"} element={<ContactAdmin />}></Route>
					<Route path={"/contact"} element={<ContactUser />}></Route>
					<Route path={"/facilitiesUser/detail/:id"} element={<DetailUser />}></Route>
				</Route>
				<Route element={<AuthLayout />}>
					<Route path={"/login"} element={<LoginComponent />}></Route>
					<Route path={"/register"} element={<Register />}></Route>
				</Route>
			</Routes>
			<ToastContainer />
		</>
	);
}

export default App;
