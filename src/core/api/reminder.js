import { get } from './httpClient'

export const getAllReminders = function (from_date, to_date) {
  return new Promise(function (resolve, reject) {
    get('api/reminder/allReminders', {from_date, to_date})
      .then(result => {
        resolve(result);
      }).catch(err => {
        console.log(err);
        reject(err);
      });
  });
}