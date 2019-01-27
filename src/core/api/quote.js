
import { get, post } from './httpClient'

export const createQuote = function (newUser) {
    return new Promise(function (resolve, reject) {
        post('api/quote/create', newUser)
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
		get('api/quote/all', {})
		.then(result => {
			resolve(result);
		}).catch(err => {
            console.log(err);
            reject(err);
        });
    });
}