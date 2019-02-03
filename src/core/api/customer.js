
import { get, post } from './httpClient'

import * as customerAction from '../../actions/customer'

export function addCustomer(newCustomer) {
	return (dispatch) => {
		post('api/customer/add', newCustomer.data)
			.then((data) => { 
				newCustomer.cb(); 
				dispatch(customerAction.customerListFetchDataSuccess(data))
			})
			.catch(() => dispatch(customerAction.customerListHaveError(true)));
	};
}

export function itemsFetchData() {
	return (dispatch) => {
		dispatch(customerAction.customerListAreLoading(true));

		get('api/customer/all')
			.then((data) => {
				dispatch(customerAction.customerListAreLoading(false));
				return data;
			})
			.then((data) => dispatch(customerAction.customerListFetchDataSuccess(data)))
			.catch(() => dispatch(customerAction.customerListHaveError(true)));
	};
}