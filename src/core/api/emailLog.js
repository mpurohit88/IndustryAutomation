import { get, post } from './httpClient'

export const getEmailLog = function (task_id) {
  return new Promise(function (resolve, reject) {
    get('api/emailLog/allLogs')
      .then(result => {
        resolve(result);
      }).catch(err => {
        console.log(err);
        reject(err);
      });
  });
}