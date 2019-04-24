import { get, post } from './httpClient'

export const getEmailBody = function (task_id) {
  return new Promise(function (resolve, reject) {
    get('api/taskEmail/getEmailBody', { task_id })
      .then(result => {
        resolve(result);
      }).catch(err => {
        console.log(err);
        reject(err);
      });
  });
}