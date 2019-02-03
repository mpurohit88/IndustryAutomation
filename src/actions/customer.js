import * as types from '../constants/customer';

export function customerListHaveError(bool) {
    return {
        type: types.CUSTOMER_LIST_HAVE_ERROR,
        hasError: bool
    };
}

export function customerListAreLoading(bool) {
    return {
        type: types.CUSTOMER_LIST_ARE_LOADING,
        isLoading: bool
    };
}

export function customerListFetchDataSuccess(list) {
    return {
        type: types.CUSTOMER_LIST_FETCH_DATA_SUCCESS,
        list
    };
}