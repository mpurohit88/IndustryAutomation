import { post } from '../api/httpClient';

export function sendEmail(body) {
	return new Promise(function (resolve, reject) {
			post(`api/email/send`, { 'body': body})
			.then(response => {
        if (response) {
					resolve(response);
				}
				
				reject('Error');
    }).catch(err => {
				console.log(err);
				err.response ? reject(err.response.data.error) : reject(err.message);
			});
    });
}