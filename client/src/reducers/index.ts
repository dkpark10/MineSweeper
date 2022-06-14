import { combineReducers } from 'redux';
import loginReducer, { LoginStatus } from './login';

export interface RootState {
  login: LoginStatus,
}

export default combineReducers<RootState>({
  login: loginReducer,
});
