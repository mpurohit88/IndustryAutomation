
import { get, post } from './httpClient'
import * as productAction from '../../actions/product'

export function addProduct(newProduct) {
	return (dispatch) => {
		post('api/product/add', newProduct.formData, newProduct.config)
			.then((data) => { 
				newProduct.cb(); 
				dispatch(productAction.productListFetchDataSuccess(data))
			})
			.catch(() => dispatch(productAction.productListHaveError(true)));
	};
}

export function itemsFetchData() {
	return (dispatch) => {
		dispatch(productAction.productListAreLoading(true));

		get('api/product/all')
			.then((data) => {
				dispatch(productAction.productListAreLoading(false));
				return data;
			})
			.then((data) => dispatch(productAction.productListFetchDataSuccess(data)))
			.catch(() => dispatch(productAction.productListHaveError(true)));
	};
}