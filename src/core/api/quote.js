
import { get, post } from './httpClient'
import * as quoteAction from '../../actions/quote'

export function createQuote(newQuote) {
	return (dispatch) => {
		post('api/quote/create', newQuote.data)
			.then((data) => {
				newQuote.cb();

				newQuote.data.quote.id ?
					dispatch(quoteAction.quoteDetailsFetchDataSuccess(data))
					:
					dispatch(quoteAction.quoteListFetchDataSuccess(data))

			})
			.catch(() => dispatch(quoteAction.quoteListHaveError(true)));
	};
}

export function itemsFetchData(customerId, userId, statusId, from_date, to_date) {
	return (dispatch) => {
		dispatch(quoteAction.quoteListAreLoading(true));

		get('api/quote/all', { customerId, userId, statusId, from_date, to_date })
			.then((data) => {
				dispatch(quoteAction.quoteListAreLoading(false));
				return data;
			})
			.then((data) => dispatch(quoteAction.quoteListFetchDataSuccess(data)))
			.catch(() => dispatch(quoteAction.quoteListHaveError(true)));
	};
}

export function itemsFetchQuoteDetails(quoteId, cb) {
	return (dispatch) => {
		dispatch(quoteAction.quoteDetailsAreLoading(true));

		get('api/quote/getQuoteDetail', { quoteId })
			.then((data) => {
				dispatch(quoteAction.quoteDetailsAreLoading(false));
				cb(data);
				return data;
			})
			.then((data) => dispatch(quoteAction.quoteDetailsFetchDataSuccess(data)))
			.catch(() => dispatch(quoteAction.quoteDetailsHaveError(true)));
	};
}

export function quoteStart(taskHistId, quoteId) {
	return (dispatch) => {
		dispatch(quoteAction.quoteStartIsLoading(true));

		post('api/quote/start', { taskHistId, quoteId })
			.then((data) => {
				dispatch(quoteAction.quoteStartIsLoading(false));
				return data;
			})
			.then((data) => dispatch(quoteAction.quoteStartFetchDataSuccess(data)))
			.catch(() => dispatch(quoteAction.quoteStartHaveError(true)));
	};
}

export function updateStatus(quoteId, status, cb) {
	return (dispatch) => {
		dispatch(quoteAction.quoteStartIsLoading(true));

		post('api/quote/updateStatus', { quoteId, status })
			.then((data) => {
				dispatch(quoteAction.quoteStartIsLoading(false));
				return data;
			})
			.then((data) => {
				dispatch(quoteAction.quoteStartFetchDataSuccess(data));
				cb(data);
			})
			.catch(() => dispatch(quoteAction.quoteStartHaveError(true)));
	};
}

export function updateDispatchSummary(quoteId, customerId, acivityTaskId, data, products, body, cb) {
	return (dispatch) => {
		dispatch(quoteAction.quoteStartIsLoading(true));

		post('api/quote/updateDispatchSummary', { quoteId, customerId, acivityTaskId, data, products, body })
			.then((data) => {
				dispatch(quoteAction.quoteStartIsLoading(false));
				return data;
			})
			.then((data) => {
				dispatch(quoteAction.quoteStartFetchDataSuccess(data));
				cb(data);
			})
			.catch(() => dispatch(quoteAction.quoteStartHaveError(true)));
	};
}

export function uploadDocument(newProduct) {
	return (dispatch) => {
		post('api/quote/uploadDocument', newProduct.formData)
			.then((data) => {
				dispatch(quoteAction.quoteStartUpdateDataSuccess(data));
			})
			.catch(() => dispatch(quoteAction.quoteDetailsHaveError(true)));
	};
}

export function getDispatchSummary(quote_id) {
	return new Promise(function (resolve, reject) {
		get('api/quote/getDispatchSummary', { quote_id })
			.then(result => {
				resolve(result);
			}).catch(err => {
				console.log(err);
				reject(err);
			});
	});
}
export function sendPaymentReminder(quoteId, nextActivityTaskId, acivityTaskId, data, products, body, cb) {
	return (dispatch) => {
		dispatch(quoteAction.quoteStartIsLoading(true));

		post('api/quote/sendPaymentReminder', { quoteId, nextActivityTaskId, acivityTaskId, data, products, body })
			.then((data) => {
				dispatch(quoteAction.quoteStartIsLoading(false));
				return data;
			})
			.then((data) => {
				dispatch(quoteAction.quoteStartFetchDataSuccess(data));
				cb(data);
			})
			.catch(() => dispatch(quoteAction.quoteStartHaveError(true)));
	};
}