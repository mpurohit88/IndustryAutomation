import { get, post } from './httpClient'

export const getMarketingTemplate = function (task_id) {
  return new Promise(function (resolve, reject) {
    get('api/marketing/getTemplate')
      .then(result => {
        resolve(result);
      }).catch(err => {
        console.log(err);
        reject(err);
      });
  });
}

export const sendEmail = function (data) {
  return new Promise(function (resolve, reject) {
    post('api/marketing/sendEmail', data)
      .then(result => {
        resolve(result);
      }).catch(err => {
        console.log(err);
        reject(err);
      });
  });
}