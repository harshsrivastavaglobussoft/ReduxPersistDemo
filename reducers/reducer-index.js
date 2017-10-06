import {combineReducers} from 'redux';
import UserArray from './user-reducer';
import ActiveUser from './activeuser-reducer';
import AuthUser from './authuser-reducer';
const AllReducer = combineReducers({
  UserArray : UserArray,
  ActiveUser : ActiveUser,
  AuthUser : AuthUser,
});
export default AllReducer;
