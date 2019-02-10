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

export function quoteDetailsHaveError(bool) {
    return {
        type: types.QUOTE_DETAILS_HAVE_ERROR,
        hasError: bool
    };
}

export function quoteDetailsAreLoading(bool) {
    return {
        type: types.QUOTE_DETAILS_ARE_LOADING,
        isLoading: bool
    };
}

export function quoteDetailsFetchDataSuccess(details) {
    return {
        type: types.QUOTE_DETAILS_FETCH_DATA_SUCCESS,
        details
    };
}

export function quoteStartHaveError(bool) {
    return {
        type: types.QUOTE_START_HAVE_ERROR,
        hasError: bool
    };
}

export function quoteStartIsLoading(bool) {
    return {
        type: types.QUOTE_START_ARE_LOADING,
        isLoading: bool
    };
}

export function quoteStartFetchDataSuccess(details) {
    return {
        type: types.QUOTE_START_FETCH_DATA_SUCCESS,
        details
    };
}