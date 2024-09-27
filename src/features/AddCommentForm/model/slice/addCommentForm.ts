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
});

export const { actions: addCommentFormActions } = addCommentFormSlice;
export const { reducer: addCommentFormReducer } = addCommentFormSlice;
