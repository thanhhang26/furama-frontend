import { Outlet } from "react-router-dom";

//chứa login, quên mật khẩu, đăng kí
const AuthLayout = () => {
	return (
		<>
			<Outlet />
		</>
	);
};

export default AuthLayout;
