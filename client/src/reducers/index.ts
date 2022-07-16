import { combineReducers } from 'redux';
import loginReducer, { LoginStatus } from './login';
import titleReducer, { TitleStatus } from './title';

export interface RootState {
  login: LoginStatus,
  title: TitleStatus,
}

export default combineReducers<RootState>({
  login: loginReducer,
  title: titleReducer,
});
