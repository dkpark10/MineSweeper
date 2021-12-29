import { combineReducers } from 'redux';
import gameReducer, { GameState } from './Game';
import loginReducer, { LoginStatus } from './Login';
import styleReducer, { StyleState } from './Style';

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