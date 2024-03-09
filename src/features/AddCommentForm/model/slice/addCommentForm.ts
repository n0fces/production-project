import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AddCommentFormScheme } from '../types/addCommentForm';

const initialState: AddCommentFormScheme = {
	text: '',
};

export const addCommentFormSlice = createSlice({
	name: 'addCommentForm',
	initialState,
	reducers: {
		setText: (state, action: PayloadAction<string>) => {
			state.text = action.payload;
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

export const { actions: addCommentFormActions } = addCommentFormSlice;
export const { reducer: addCommentFormReducer } = addCommentFormSlice;
