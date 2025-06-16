import { combineReducers } from "redux";
import { LOGIN_TYPE, LOGOUT_TYPE } from "./accountConstant";

const initState = {
	account: window.localStorage.getItem("user") ? JSON.parse(window.localStorage.getItem("user")) : null,
};
function accountReducer(state = initState, action) {
	switch (action.type) {
		case LOGIN_TYPE:
			return {
				...state,
				account: action.payload,
				avatar: action.payload.avatar || "/image/avatar.jpg",
			};
		case LOGOUT_TYPE:
			localStorage.removeItem("user"); //Xoá localStorage khi logout
			return {
				...state,
				account: null,
			};
		default:
			return state;
	}
}
export const rootReducer = combineReducers({
	user: accountReducer,
});
