import { post } from '../api/httpClient';
import * as quoteAction from '../../actions/quote'

export function sendEmail(body, from, to, subject, taskId, nextTaskId, userActivityId, cb) {
	return (dispatch) => {
		post('api/email/send', { message: { from: from, to: to, subject: subject, body: body }, taskId: taskId, nextTaskId: nextTaskId, userActivityId: userActivityId })
			.then((data) => {
				dispatch(quoteAction.quoteStartUpdateDataSuccess(data));
				cb();
			})
			.catch(() => dispatch(quoteAction.quoteDetailsHaveError(true)));
	};
}
