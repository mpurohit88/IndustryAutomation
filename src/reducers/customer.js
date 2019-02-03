import {CUSTOMER_LIST_ARE_LOADING, CUSTOMER_LIST_FETCH_DATA_SUCCESS} from '../constants/customer';
import objectAssign from 'object-assign';
import initialState from './initialState';

export default function customer(state = initialState.customer, action) {
  switch (action.type) {
    case CUSTOMER_LIST_ARE_LOADING:
      // For this example, just simulating a save by changing date modified.
      // In a real app using Redux, you might use redux-thunk and handle the async call in fuelSavingsActions.js
      return objectAssign({}, state, {isLoading: action.isLoading});

    case CUSTOMER_LIST_FETCH_DATA_SUCCESS:
      return objectAssign({}, state, {list: action.list});

    default:
      return state;
  }
}
