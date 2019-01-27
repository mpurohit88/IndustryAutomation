
import { post } from './httpClient'

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