import { get, post } from '../api/httpClient';
import * as quoteAction from '../../actions/quote'

export function setReminder(nextSchedule, taskId, nextTaskId, userActivityId, quoteId, cb) {
    return (dispatch) => {
        post('api/scheduler/add', { 'nextSchedule': nextSchedule, taskId: taskId, nextTaskId: nextTaskId, userActivityId: userActivityId, quoteId: quoteId })
            .then((data) => {
                dispatch(quoteAction.quoteStartUpdateDataSuccess(data));
                cb();
            })
            .catch(() => dispatch(quoteAction.quoteDetailsHaveError(true)));
    };
}

export const getScheduleDetails = function (scheduleId) {
    return new Promise(function (resolve, reject) {
        get('api/scheduler/getScheduleDetails', { scheduleId })
            .then(result => {
                resolve(result);
            }).catch(err => {
                console.log(err);
                reject(err);
            });
    });
}

export function taskDone(taskId, nextTaskId, userActivityId, scheduleId, quoteId, status) {
    return (dispatch) => {
        post('api/scheduler/done', { taskId: taskId, nextTaskId: nextTaskId, userActivityId: userActivityId, scheduleId, quoteId, status })
            .then((data) => {
                dispatch(quoteAction.quoteStartUpdateDataSuccess(data));
                cb();
            })
            .catch(() => dispatch(quoteAction.quoteDetailsHaveError(true)));
    };
}