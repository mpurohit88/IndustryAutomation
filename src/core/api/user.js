
import { post } from './httpClient'

export const registerUser = function (newUser) {
    return new Promise(function (resolve, reject) {
        post('api/user/register', newUser)
        .then(res => {
            resolve(res.data);
        }).catch(err => {
                console.log(err);
                reject(err);
            });
    });
}