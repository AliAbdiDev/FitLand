import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        increase: (state) => {
            if (state.value >= 5) return;
            state.value += 1;
        },
        decrease: (state) => {
            if (state.value <= 0) return;
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
            console.info(action.type);
        },
        reset: (state) => {
            state.value = 0
        }
    }
})