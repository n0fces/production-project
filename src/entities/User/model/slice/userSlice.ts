import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
	LOCAL_STORAGE_DESIGN_KEY,
	USER_LOCALSTORAGE_KEY,
} from '@/shared/const/localStorage';
import { User, UserScheme } from '../types/user';
import { setFeatureFlags } from '@/shared/lib/features';
import { saveJsonSettings } from '../services/saveJsonSettings';
import { JsonSettings } from '../types/jsonSettings';
import { initAuthData } from '../services/initAuthData';

const initialState: UserScheme = {
	_inited: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// устанавливаем пользователя при авторизации
		setAuthData: (state, { payload }: PayloadAction<User>) => {
			state.authData = payload;
			setFeatureFlags(payload.features);
			localStorage.setItem(USER_LOCALSTORAGE_KEY, payload.id);
			localStorage.setItem(
				LOCAL_STORAGE_DESIGN_KEY,
				payload.features?.isAppRedesigned ? 'new' : 'old',
			);
		},
		logout: (state) => {
			state.authData = undefined;
			localStorage.removeItem(USER_LOCALSTORAGE_KEY);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(
			saveJsonSettings.fulfilled,
			(state, { payload }: PayloadAction<JsonSettings>) => {
				// jsonSettings будут устанавливаться только в случае, если пользователь уже проинициализирован
				if (state.authData) {
					state.authData.jsonSettings = payload;
				}
			},
		);
		builder.addCase(
			initAuthData.fulfilled,
			(state, { payload }: PayloadAction<User>) => {
				state.authData = payload;
				console.log(payload);
				console.log(payload.features);
				setFeatureFlags(payload.features);
				state._inited = true;
			},
		);
		builder.addCase(initAuthData.rejected, (state) => {
			// чтобы приложение все равно проинициализировалось
			state._inited = true;
		});
	},
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
