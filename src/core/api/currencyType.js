import { get, post } from './httpClient'

export const getCurrencyType = function (task_id) {
  return new Promise(function (resolve, reject) {
    get('api/currencyType/all')
      .then(result => {
        resolve(result);
      }).catch(err => {
        console.log(err);
        reject(err);
      });
  });
}