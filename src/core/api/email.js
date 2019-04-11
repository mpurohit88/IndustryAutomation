import { post } from '../api/httpClient';
import * as quoteAction from '../../actions/quote'

export function sendEmail(body, from, to, cc, bcc, subject, taskId, nextTaskId, userActivityId, cb, quoteId) {
	return (dispatch) => {
		post('api/email/send', { message: { from: from, to: to, cc: cc, bcc: bcc, subject: subject, body: body }, taskId: taskId, nextTaskId: nextTaskId, userActivityId: userActivityId, quoteId: quoteId })
			.then((data) => {
				dispatch(quoteAction.quoteStartUpdateDataSuccess(data));
				cb();
			})
			.catch(() => dispatch(quoteAction.quoteDetailsHaveError(true)));
	};
}
