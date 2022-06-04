// 액션 타입을 선언
// 뒤에 as const 를 붙여줌으로써 나중에 액션 객체를 만들게 action.type 의 값을 추론하는 과정에서
// action.type 이 string 으로 추론되지 않고 같이 실제 문자열 값으로 추론 되도록 
export const SETEXTRACELL = 'game/SETEXTRACELL' as const;
export const GAMERESET = 'game/GAMERESET' as const;
export const RECORDTIME = 'game/RECORDTIME' as const;

export interface GameState {
  gameRestart: boolean,
  isGameOver: number,
  takenTime:number
};

interface GameAction {
  type: string,
  payload: number,
  reset:boolean
}

const initialState: GameState = {
  gameRestart: false,
  isGameOver: 987654321,
  takenTime: -1
};

// action creator
export const setExtraCell = (diff: number) => ({
  type: SETEXTRACELL,
  payload: diff
});

export const gameReset = (diff: boolean) => ({
  type: GAMERESET,
  reset: diff
})

export const setRecordTime = (time:number) => ({
  type: RECORDTIME,
  payload: time
})

// 리듀서
export default function gameReducer(state: GameState = initialState, action: GameAction): GameState {
  switch (action.type) {
    case SETEXTRACELL:
      return {
        ...state,
        isGameOver: action.payload
      }
    case GAMERESET:
      return{
        ...state,
        gameRestart: action.reset
      }
    case RECORDTIME:
      return{
        ...state,
        takenTime: action.payload
      }
    default:
      return state;
  }
}