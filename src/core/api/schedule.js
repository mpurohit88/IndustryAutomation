import { post } from '../api/httpClient';
import * as quoteAction from '../../actions/quote'

export function setReminder(nextSchedule, taskId, nextTaskId, userActivityId, cb) {
    return (dispatch) => {
        post('api/scheduler/add', { 'nextSchedule': nextSchedule, taskId: taskId, nextTaskId: nextTaskId, userActivityId: userActivityId })
            .then((data) => {
                dispatch(quoteAction.quoteStartUpdateDataSuccess(data));
                cb();
            })
            .catch(() => dispatch(quoteAction.quoteDetailsHaveError(true)));
    };
}
