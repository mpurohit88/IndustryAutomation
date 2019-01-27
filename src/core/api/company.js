
import { get, post } from './httpClient'

export const registerCompany = function (newCompany) {
	return new Promise(function (resolve, reject) {
			post('api/company/register', newCompany)
			.then(res => {
				resolve(res.data);
			}).catch(err => {
				console.log(err);
				reject(err);
			});
	});
}

export const all = function () {
	return new Promise(function (resolve, reject) {
		get('api/company/all', {})
		.then(result => {
				resolve(result);
		}).catch(err => {
						console.log(err);
						reject(err);
				});
    });
}