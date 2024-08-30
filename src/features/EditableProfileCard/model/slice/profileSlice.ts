import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Profile } from '@/entities/Profile';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { ProfileScheme } from '../types/EditableProfileCardSchema';

const initialState: ProfileScheme = {
	readonly: true,
	isLoading: false,
	error: undefined,
	data: undefined,
};

export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setReadonly: (state, action: PayloadAction<boolean>) => {
			state.readonly = action.payload;
		},
		cancelEdit: (state) => {
			state.readonly = true;
			state.validateErrors = undefined;
			// при отмене изменений мы сбрасываем все то, что навводили
			state.form = state.data;
		},
		updateProfile: (state, action: PayloadAction<Profile>) => {
			state.form = {
				...state.form,
				...action.payload,
			};
		},
	},
	extraReducers: (builder) => {
		builder
			// в редаксе есть массовая обработка событий через addMatcher, который может позволить сократить здесь код
			.addCase(fetchProfileData.pending, (state) => {
				state.isLoading = true;
				state.error = undefined;
			})
			.addCase(
				fetchProfileData.fulfilled,
				(state, action: PayloadAction<Profile>) => {
					state.isLoading = false;
					state.data = action.payload;
					state.form = action.payload;
				},
			)
			.addCase(fetchProfileData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(updateProfileData.pending, (state) => {
				state.isLoading = true;
				state.validateErrors = undefined;
			})
			.addCase(
				updateProfileData.fulfilled,
				(state, action: PayloadAction<Profile>) => {
					state.isLoading = false;
					state.data = action.payload;
					state.form = action.payload;
					state.readonly = true;
					state.validateErrors = undefined;
				},
			)
			.addCase(updateProfileData.rejected, (state, action) => {
				state.isLoading = false;
				state.validateErrors = action.payload;
			});
	},
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
