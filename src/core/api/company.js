
import { get, post } from './httpClient'
import * as companyAction from '../../actions/company'

export function registerCompany(newCompany) {
	return (dispatch) => {
		post('api/company/register', newCompany.data)
			.then((data) => {
				newCompany.cb();
				dispatch(companyAction.listFetchDataSuccess(data))
			})
			.catch(() => dispatch(companyAction.listHaveError(true)));
	};
}

export function itemsFetchData() {
	return (dispatch) => {
		dispatch(companyAction.listAreLoading(true));

		get('api/company/all')
			.then((data) => {
				dispatch(companyAction.listAreLoading(false));
				return data;
			})
			.then((data) => dispatch(companyAction.listFetchDataSuccess(data)))
			.catch(() => dispatch(companyAction.listHaveError(true)));
	};
}

export const getById = function () {
	return new Promise(function (resolve, reject) {
		get('api/company/getById')
			.then(result => {
				resolve(result);
			}).catch(err => {
				console.log(err);
				reject(err);
			});
	});
}