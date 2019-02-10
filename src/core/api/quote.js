
import { get, post } from './httpClient'
import * as quoteAction from '../../actions/quote'

export function createQuote(newQuote) {
	return (dispatch) => {
		post('api/quote/create', newQuote.data)
			.then((data) => { 
				newQuote.cb(); 
				dispatch(quoteAction.quoteListFetchDataSuccess(data))
			})
			.catch(() => dispatch(quoteAction.quoteListHaveError(true)));
	};
}

export function itemsFetchData() {
	return (dispatch) => {
		dispatch(quoteAction.quoteListAreLoading(true));

		get('api/quote/all')
			.then((data) => {
				dispatch(quoteAction.quoteListAreLoading(false));
				return data;
			})
			.then((data) => dispatch(quoteAction.quoteListFetchDataSuccess(data)))
			.catch(() => dispatch(quoteAction.quoteListHaveError(true)));
	};
}

export function itemsFetchQuoteDetails(quoteId) {
	return (dispatch) => {
		dispatch(quoteAction.quoteDetailsAreLoading(true));

		get('api/quote/getQuoteDetail', {quoteId})
			.then((data) => {
				dispatch(quoteAction.quoteDetailsAreLoading(false));
				return data;
			})
			.then((data) => dispatch(quoteAction.quoteDetailsFetchDataSuccess(data)))
			.catch(() => dispatch(quoteAction.quoteDetailsHaveError(true)));
	};
}

export function quoteStart(taskHistId, quoteId) {
	return (dispatch) => {
		dispatch(quoteAction.quoteStartIsLoading(true));

		post('api/quote/start', {taskHistId, quoteId})
			.then((data) => {
				dispatch(quoteAction.quoteStartIsLoading(false));
				return data;
			})
			.then((data) => dispatch(quoteAction.quoteStartFetchDataSuccess(data)))
			.catch(() => dispatch(quoteAction.quoteStartHaveError(true)));
	};
}