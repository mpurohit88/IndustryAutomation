import { get, post } from './httpClient'

export const getByQuoteId = function (quoteId) {
	return new Promise(function (resolve, reject) {
		get('api/quoteProduct/getByQuoteId', { quoteId })
			.then(result => {
				resolve(result);
			}).catch(err => {
				console.log(err);
				reject(err);
			});
	});
}