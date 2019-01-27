
import { get, post } from './httpClient'

export const addProduct = function (newProduct) {
    return new Promise(function (resolve, reject) {
        post('api/product/add', newProduct)
        .then(result => {
            resolve(result);
        }).catch(err => {
                console.log(err);
                reject(err);
            });
    });
}

export const all = function () {
	return new Promise(function (resolve, reject) {
		get('api/product/all', {})
		.then(result => {
				resolve(result);
		}).catch(err => {
						console.log(err);
						reject(err);
				});
    });
}