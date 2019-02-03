import {PRODUCT_LIST_ARE_LOADING, PRODUCT_LIST_FETCH_DATA_SUCCESS} from '../constants/product';
import objectAssign from 'object-assign';
import initialState from './initialState';

export default function product(state = initialState.product, action) {
  switch (action.type) {
    case PRODUCT_LIST_ARE_LOADING:
      // For this example, just simulating a save by changing date modified.
      // In a real app using Redux, you might use redux-thunk and handle the async call in fuelSavingsActions.js
      return objectAssign({}, state, {isLoading: action.isLoading});

    case PRODUCT_LIST_FETCH_DATA_SUCCESS:
      return objectAssign({}, state, {list: action.list});

    default:
      return state;
  }
}
