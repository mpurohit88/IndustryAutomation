import * as types from '../constants/user';

export function userListHaveError(bool) {
    return {
        type: types.USER_LIST_HAVE_ERROR,
        hasError: bool
    };
}

export function userListAreLoading(bool) {
    return {
        type: types.USER_LIST_ARE_LOADING,
        isLoading: bool
    };
}

export function userListFetchDataSuccess(list) {
    return {
        type: types.USER_LIST_FETCH_DATA_SUCCESS,
        list
    };
}

export function userClearCredentials(list) {
    return {
        type: types.USER_CLEAR_CREDENTIALS
    };
}