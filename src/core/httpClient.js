import axios from 'axios';

const host = 'http://localhost:3000/';

export const registerUser = function (newUser) {
    return new Promise(function (resolve, reject) {
        axios(host + 'api/user/register', {
            method: 'POST',
            data: newUser
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
                console.log(err);
                reject(err);
            });
    });
}

export const addProduct = function (newUser) {
    return new Promise(function (resolve, reject) {
        axios(host + 'api/product/add', {
            method: 'POST',
            data: newUser
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
                console.log(err);
                reject(err);
            });
    });
}

export const registerCompany = function (newComapny) {
    return new Promise(function (resolve, reject) {
        axios(host + 'api/company/register', {
            method: 'POST',
            data: newComapny
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
                console.log(err);
                reject(err);
            });
    });
}