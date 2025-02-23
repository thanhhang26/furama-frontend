import { Route, Routes } from "react-router-dom";
import "./App.css";
import HeaderComponent from "./component/HeaderComponent";
import NavigationComponent from "./component/NavigationComponent";
import FooterComponent from "./component/FooterComponent";
import FacilitiesList from "./component/FacilitiesList";
import DetailComponent from "./component/DetailComponent";
import AddComponent from "./component/AddComponent";
import Homepage from "./component/Homepage";
import EditComponent from "./component/EditComponent";
function App() {
	return (
		<>
			<HeaderComponent />
			<NavigationComponent />
			<Routes>
				<Route path={"/homepage"} element={<Homepage />}></Route>
				<Route path={"/facilities"} element={<FacilitiesList />}></Route>
				<Route path={"/facilities/detail/:id"} element={<DetailComponent />}></Route>
				<Route path={"/add_new"} element={<AddComponent />}></Route>
				<Route path={"/edit/:id"} element={<EditComponent />}></Route>
			</Routes>
			<FooterComponent />
		</>
	);
}

export default App;
