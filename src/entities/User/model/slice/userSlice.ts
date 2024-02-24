import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { User, UserScheme } from '../types/user';

const initialState: UserScheme = {};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// устанавливаем пользователя при авторизации
		setAuthData: (state, action: PayloadAction<User>) => {
			state.authData = action.payload;
		},
		// чтобы идентифицировать, что пользователь уже авторизован
		initAuthData: (state) => {
			const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
			if (user) {
				state.authData = JSON.parse(user);
			}
		},
		logout: (state) => {
			state.authData = undefined;
			localStorage.removeItem(USER_LOCALSTORAGE_KEY);
		},
	},
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;