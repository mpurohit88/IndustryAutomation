import {QUOTE_LIST_ARE_LOADING, QUOTE_LIST_FETCH_DATA_SUCCESS, 
  QUOTE_DETAILS_ARE_LOADING, QUOTE_DETAILS_FETCH_DATA_SUCCESS,
  QUOTE_START_ARE_LOADING, QUOTE_START_FETCH_DATA_SUCCESS, QUOTE_START_UPDATE_DATA_SUCCESS} from '../constants/quote';
import objectAssign from 'object-assign';
import initialState from './initialState';

export default function quote(state = initialState.quote, action) {
  switch (action.type) {
    case QUOTE_LIST_ARE_LOADING:
      // For this example, just simulating a save by changing date modified.
      // In a real app using Redux, you might use redux-thunk and handle the async call in fuelSavingsActions.js
      return objectAssign({}, state, {isLoading: action.isLoading});

    case QUOTE_LIST_FETCH_DATA_SUCCESS:
      return objectAssign({}, state, {list: action.list});

    case QUOTE_START_ARE_LOADING:
    case QUOTE_DETAILS_ARE_LOADING:
      // For this example, just simulating a save by changing date modified.
      // In a real app using Redux, you might use redux-thunk and handle the async call in fuelSavingsActions.js
      return objectAssign({}, state, {isLoading: action.isLoading});

    case QUOTE_START_FETCH_DATA_SUCCESS:
    case QUOTE_DETAILS_FETCH_DATA_SUCCESS:
      return objectAssign({}, state, {details: action.details});

      case QUOTE_START_UPDATE_DATA_SUCCESS: 
        let newState = {...state.details};
        newState.tasks = action.tasks.tasks;
        return objectAssign({}, state, {details: newState});

    default:
      return state;
  }
}
