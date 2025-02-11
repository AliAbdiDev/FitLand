export type ReducerState = {
    productNumber: number;
    selectedColor: string;
    selectedSize: string;
    favoriteProduct: boolean;
};
export type ActionType =
    | "INCREMENT_PRODUCTNUMBER"
    | "DECREMENT_PRODUCTNUMBER"
    | "SET_COLOR"
    | "SET_SIZE"
    | "SET_FAVORITE"
    | "DEFAULT";

export const initialState = {
    productNumber: 1,
    selectedColor: '',
    selectedSize: "",
    favoriteProduct: false,
}

export const productReducer = (
    state: ReducerState,
    action: { payload?: any; type: ActionType }
) => {
    const actions = {
        INCREMENT_PRODUCTNUMBER: () => ({
            ...state,
            productNumber:
                state?.productNumber < 10
                    ? state?.productNumber + 1
                    : state?.productNumber,
        }),
        DECREMENT_PRODUCTNUMBER: () => ({
            ...state,
            productNumber:
                state?.productNumber > 1
                    ? state?.productNumber - 1
                    : state?.productNumber,
        }),
        SET_COLOR: () => ({ ...state, selectedColor: action?.payload }),
        SET_SIZE: () => ({ ...state, selectedSize: action?.payload }),
        SET_FAVORITE: () => ({ ...state, favoriteProduct: action?.payload }),
        DEFAULT: () => state,
    };
    return (actions[action?.type] || actions?.DEFAULT)();
};
