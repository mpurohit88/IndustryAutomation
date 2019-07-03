import { get, post } from './httpClient'

export function addCurrency(newCurrency) {
  return (dispatch) => {
    post('api/currencyType/add', newCurrency)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => console.log("Currency not Added"));
  };
}

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