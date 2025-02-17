type Action = { type: 'SET_ACTIVE_INDEX' | 'SET_IMG_ADDRESS', payload?: any }

export const imageViewerInitialState = {
    imgAddress: '',
    activIndex: 0
}

type InitalState = typeof imageViewerInitialState;
export function imageViewerReducer(state: InitalState, action: Action): InitalState {

    const actions: Record<string, () => InitalState> = {
        SET_IMG_ADDRESS: () => ({ ...state, imgAddress: action?.payload }),
        SET_ACTIVE_INDEX: () => ({ ...state, activIndex: action?.payload })
    }
    return (actions[action?.type]() || state);
}

export const imageViewerActions  = (dispatch: React.Dispatch<Action>) => ({
    setImgAddress: (src: string) => dispatch({ type: "SET_IMG_ADDRESS", payload: src }),
    setActiveIndex: (index: number) => dispatch({ type: "SET_ACTIVE_INDEX", payload: index }),
});