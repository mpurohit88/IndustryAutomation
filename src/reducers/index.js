import { combineReducers } from 'redux';
import company from './company';
import customer from './customer';
import product from './product';
import quote from './quote';
import user from './user';

const rootReducer = combineReducers({
  company,
  customer,
  product,
  quote,
  user
});

export default rootReducer;
