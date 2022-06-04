export interface StyleState {
  mainFontColor: string;
  mainThemeColor: string;
};

interface GameAction {
  type: string,
  payload: number,
  reset: boolean
}

const initialState: StyleState = {
  mainFontColor: '#504e5a',
  mainThemeColor: '#1033e3',
};

// 리듀서
export default function styleReducer(state: StyleState = initialState, action: GameAction): StyleState {
  return state;
}