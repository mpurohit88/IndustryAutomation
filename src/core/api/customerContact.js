import { get, post } from './httpClient'

export const quoteContactDetail = function (id) {
    return new Promise(function (resolve, reject) {
        get('api/customerContact/quoteContactDetail', { id })
            .then(result => {
                resolve(result);
            }).catch(err => {
                console.log(err);
                reject(err);
            });
    });
}