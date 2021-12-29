// action 정의 
export const ISLOGIN = 'login/ISLOGIN' as const;

export interface LoginStatus {
  isLogin: boolean
  id: string
};

interface LoginAction {
  type: string,
  payload: LoginStatus
};

const initialState: LoginStatus = {
  isLogin: false,
  id: '',
};

export const setLogin = (loginInfo: LoginStatus): LoginAction => ({
  type: ISLOGIN,
  payload: loginInfo
});

// 리듀서
export default function loginReducer(state: LoginStatus = initialState, action: LoginAction): LoginStatus {
  switch (action.type) {
    case ISLOGIN:
      return {
        ...state,
        isLogin: action.payload.isLogin,
        id: action.payload.id
      }
    default:
      return state;
  }
}