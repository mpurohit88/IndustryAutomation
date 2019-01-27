
import { post } from './httpClient'

export const createQuote = function (newUser) {
    return new Promise(function (resolve, reject) {
        post('api/quote/create', newUser)
        .then(res => {
            resolve(res.data);
        }).catch(err => {
                console.log(err);
                reject(err);
            });
    });
}