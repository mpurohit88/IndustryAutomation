import * as types from '../constants/product';

export function productListHaveError(bool) {
    return {
        type: types.PRODUCT_LIST_HAVE_ERROR,
        hasError: bool
    };
}

export function productListAreLoading(bool) {
    return {
        type: types.PRODUCT_LIST_ARE_LOADING,
        isLoading: bool
    };
}

export function productListFetchDataSuccess(list) {
    return {
        type: types.PRODUCT_LIST_FETCH_DATA_SUCCESS,
        list
    };
}