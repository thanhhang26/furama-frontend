import { combineReducers } from "redux";

const initState = {
	account: {
		userName: "",
		password: "",
		role: "",
	},
};
function accountReducer(state = initState, action) {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				account: action.payload,
			};
		case "LOGOUT":
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
