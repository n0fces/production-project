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
});

export const { actions: scrollSaveActions, reducer: scrollSaveReducer } =
	scrollSaveSlice;
