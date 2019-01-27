
import { get, post } from './httpClient'

export const addCustomer = function (newCustomer) {
	return new Promise(function (resolve, reject) {
			post('api/customer/add', newCustomer)
			.then(res => {
				resolve(res);
			}).catch(err => {
				console.log(err);
				reject(err);
			});
	});
}

export const all = function () {
	return new Promise(function (resolve, reject) {
		get('api/customer/all', {})
		.then(result => {
				resolve(result);
		}).catch(err => {
						console.log(err);
						reject(err);
				});
    });
}