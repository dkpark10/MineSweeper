export const TITLE = 'title/TITLE' as const;

export interface TitleStatus {
  title: string;
}

interface TitleAction {
  type: string,
}

const initialState: TitleStatus = {
  title: 'Game World',
};

export const setTitle = () => ({
  type: TITLE,
});

// 리듀서
export default function titleReducer(state: TitleStatus, action: TitleAction): TitleStatus {
  switch (action.type) {
    case TITLE:
      return {
        ...state,
        title: 'Game World',
      };
    default:
      return state || initialState;
  }
}
