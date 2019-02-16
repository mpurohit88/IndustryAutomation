import { post } from '../api/httpClient';
import * as quoteAction from '../../actions/quote'

export function sendEmail(body, taskId, nextTaskId, userActivityId, cb) {
	return (dispatch) => {
		post('api/email/send', { 'body': body, taskId: taskId, nextTaskId: nextTaskId, userActivityId: userActivityId})
		.then((data) =>  {
			dispatch(quoteAction.quoteStartUpdateDataSuccess(data));
			cb();
		})
		.catch(() => dispatch(quoteAction.quoteDetailsHaveError(true)));
	};
}
