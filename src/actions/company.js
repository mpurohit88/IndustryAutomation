import * as types from '../constants/company';

export function listHaveError(bool) {
    return {
        type: types.LIST_HAVE_ERROR,
        hasError: bool
    };
}

export function listAreLoading(bool) {
    return {
        type: types.LIST_ARE_LOADING,
        isLoading: bool
    };
}

export function listFetchDataSuccess(list) {
    return {
        type: types.LIST_FETCH_DATA_SUCCESS,
        list
    };
}