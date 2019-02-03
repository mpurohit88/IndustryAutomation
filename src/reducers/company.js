import {LIST_ARE_LOADING, LIST_FETCH_DATA_SUCCESS} from '../constants/company';
import objectAssign from 'object-assign';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function company(state = initialState.company, action) {
  let newState;

  switch (action.type) {
    case LIST_ARE_LOADING:
      // For this example, just simulating a save by changing date modified.
      // In a real app using Redux, you might use redux-thunk and handle the async call in fuelSavingsActions.js
      return objectAssign({}, state, {isLoading: action.isLoading});

    case LIST_FETCH_DATA_SUCCESS:
      return objectAssign({}, state, {list: action.list});

    default:
      return state;
  }
}
