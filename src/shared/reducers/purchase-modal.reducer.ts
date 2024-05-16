import { createSlice } from '@reduxjs/toolkit';

export const purchaseModalCloseState = true;

export const initialState = { currentState: purchaseModalCloseState};

export type purchaseModalState = Readonly<typeof initialState>;

export const purchaseModalSlice = createSlice({
    name: 'purchaseModal',
    initialState: initialState as purchaseModalState,
    reducers: {
        reset() {
            return initialState;
        },
        toggle(state) {
            state.currentState = !state.currentState; 
        }
    }
});

export const { reset, toggle } = purchaseModalSlice.actions;

export const purchaseModalReducer = purchaseModalSlice.reducer;
