
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