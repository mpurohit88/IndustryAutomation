import {USER_LIST_ARE_LOADING, USER_LIST_FETCH_DATA_SUCCESS, USER_CLEAR_CREDENTIALS} from '../constants/user';
import objectAssign from 'object-assign';
import initialState from './initialState';

export default function user(state = initialState.user, action) {
  switch (action.type) {
    case USER_LIST_ARE_LOADING:
      // For this example, just simulating a save by changing date modified.
      // In a real app using Redux, you might use redux-thunk and handle the async call in fuelSavingsActions.js
      return objectAssign({}, state, {isLoading: action.isLoading});

    case USER_LIST_FETCH_DATA_SUCCESS:
      return objectAssign({}, state, {list: action.list.userList, credentials: action.list.credentials});
    
    case USER_CLEAR_CREDENTIALS:
      return objectAssign({}, state, {credentials: undefined});

    default:
      return state;
  }
}
