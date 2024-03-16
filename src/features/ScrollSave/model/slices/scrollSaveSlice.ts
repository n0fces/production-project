import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ScrollSaveScheme } from '../types/scrollSaveScheme';

const initialState: ScrollSaveScheme = {
	scroll: {},
};

export const scrollSaveSlice = createSlice({
	name: 'scrollSaveSlice',
	initialState,
	reducers: {
		setScrollPosition: (
			state,
			{ payload }: PayloadAction<{ path: string; position: number }>
		) => {
			state.scroll[payload.path] = payload.position;
		},
	},
	// extraReducers: (builder) => {
	// 	builder
	// 		.addCase(EXAMPLE.pending, (state) => {
	// 			state.isLoading = true;
	// 			state.error = undefined;
	// 		})
	// 		.addCase(EXAMPLE.fulfilled, (state) => {
	// 			state.isLoading = false;
	// 		})
	// 		.addCase(EXAMPLE.rejected, (state, action) => {
	// 			state.isLoading = false;
	// 			state.error = action.payload;
	// 		});
	// },
});

export const { actions: scrollSaveActions, reducer: scrollSaveReducer } =
	scrollSaveSlice;
