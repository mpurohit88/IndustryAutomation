
import { get, post } from './httpClient'
import * as userAction from '../../actions/user'

export function registerUser(newUser) {
	return (dispatch) => {
		post('api/user/register', newUser.data)
			.then((data) => { 
				newUser.cb(); 
				dispatch(userAction.userListFetchDataSuccess(data))
			})
			.catch(() => dispatch(userAction.userListHaveError(true)));
	};
}

export function itemsFetchData() {
	return (dispatch) => {
		dispatch(userAction.userListAreLoading(true));

		get('api/user/all')
			.then((data) => {
				dispatch(userAction.userListAreLoading(false));
				return data;
			})
			.then((data) => dispatch(userAction.userListFetchDataSuccess(data)))
			.catch(() => dispatch(userAction.userListHaveError(true)));
	};
}