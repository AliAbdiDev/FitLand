import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    selectedSize: '',
    selectedColor: '',
}

const productDetailSelection = createSlice({
    name: 'product Detail Selection',
    initialState,
    reducers: {
        sizeProductSelector: (state, action: PayloadAction<{ selectedSize: '' }>) => {
            state.selectedSize = action.payload.selectedSize
        },
        colorProductSelector: (state, action: PayloadAction<{ selectedColor: '' }>) => {
            state.selectedColor = action.payload.selectedColor;
        }
    }
})

export default productDetailSelection;
export const { sizeProductSelector, colorProductSelector } = productDetailSelection.actions;