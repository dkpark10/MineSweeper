import { combineReducers } from 'redux';
import gameReducer, { GameState } from './game';
import loginReducer, { LoginStatus } from './login';
import styleReducer, { StyleState } from './style';

export interface RootState {
  game: GameState,
  login: LoginStatus,
  style: StyleState
}

export default combineReducers<RootState>({
  game: gameReducer,
  login: loginReducer,
  style: styleReducer
});