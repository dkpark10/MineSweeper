import { combineReducers } from 'redux';
import loginReducer, { LoginStatus } from './login';
import styleReducer, { StyleState } from './style';

export interface RootState {
  login: LoginStatus,
  style: StyleState
}

export default combineReducers<RootState>({
  login: loginReducer,
  style: styleReducer,
});
