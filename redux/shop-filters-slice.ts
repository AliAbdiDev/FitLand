import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export const initialState = {
    range: [5, 1240],
    colorSelected: '',
    sizeSelected: ''
}
export const shopFilters = createSlice({
    name: 'shopState',
    initialState,
    reducers: {
        rengeInput: (state, action: PayloadAction<{ minValue: number, maxValue: number }>) => {
            state.range = [action.payload.maxValue, action.payload.minValue]
        },
        colorSelector: (state, action: PayloadAction<{ color: string }>) => {
            state.colorSelected = action.payload.color
            console.info(state.colorSelected);
        },
        sizeProduct: (state, action: PayloadAction<{ size: string }>) => {
            state.sizeSelected = action.payload.size
        },
        resetFilters: (state) => {
            state.colorSelected = initialState.colorSelected
            state.range = initialState.range
            state.sizeSelected = initialState.sizeSelected
        }

    }
})

export const { rengeInput, colorSelector, sizeProduct, resetFilters } = shopFilters.actions;