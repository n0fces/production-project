import { PayloadAction } from '@reduxjs/toolkit';

import { buildSlice } from '@/shared/lib/store';

import { CounterScheme } from '../types/counterScheme';

const initialState: CounterScheme = {
	value: 0,
};

export const counterSlice = buildSlice({
	name: 'counter',
	initialState,
	reducers: {
		increment: (state) => {
			state.value += 1;
		},
		decrement: (state) => {
			state.value -= 1;
		},
		add: (state, { payload }: PayloadAction<number>) => {
			state.value += payload;
		},
	},
});

export const { increment: counterIncrement, decrement: counterDecrement } =
	counterSlice.actions;
export const counterReducer = counterSlice.reducer;
export const useCounterActions = counterSlice.useActions;
