import { post } from '../api/httpClient';
import * as quoteAction from '../../actions/quote'

export function sendEmail(arg) {
	return (dispatch) => {
		post('api/email/send', arg.formData)
			.then((data) => {
				dispatch(quoteAction.quoteStartUpdateDataSuccess(data));
				arg.cb();
			})
			.catch(() => dispatch(quoteAction.quoteDetailsHaveError(true)));
	};
}
