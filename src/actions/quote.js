import * as types from '../constants/quote';

export function quoteListHaveError(bool) {
    return {
        type: types.QUOTE_LIST_HAVE_ERROR,
        hasError: bool
    };
}

export function quoteListAreLoading(bool) {
    return {
        type: types.QUOTE_LIST_ARE_LOADING,
        isLoading: bool
    };
}

export function quoteListFetchDataSuccess(list) {
    return {
        type: types.QUOTE_LIST_FETCH_DATA_SUCCESS,
        list
    };
}