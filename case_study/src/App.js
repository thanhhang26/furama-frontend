import { Route, Routes } from "react-router-dom";
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
function App() {
	const account = useSelector((state) => state?.user?.account);
	return (
		<>
			<Routes>
				<Route element={<HomeLayout />}>
					<Route path={"/furama"} element={<FuramaComponent />}></Route>
					<Route path={"/homepage"} element={<Homepage />}></Route>
					<Route path={"/facilities"} element={account?.role === "ADMIN" ? <FacilitiesList /> : <FacilitiesUser />} />
					<Route path={"/contact"} element={<ContactUser />}></Route>
					<Route path={"/facilities/detail/:id"} element={account?.role === "ADMIN" ? <DetailComponent /> : <DetailUser />} />
					<Route path={"/add_new"} element={<AddComponent />}></Route>
					<Route path={"/edit/:id"} element={<EditComponent />}></Route>
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
