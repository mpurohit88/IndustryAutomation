
import { get, post } from './httpClient'

export const registerUser = function (newUser) {
    return new Promise(function (resolve, reject) {
        post('api/user/register', newUser)
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
        get('api/user/all')
        .then(res => {
            resolve(res);
        }).catch(err => {
                console.log(err);
                reject(err);
            });
    });
}