import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { User, UserScheme } from '../types/user';
import { setFeatureFlags } from '@/shared/lib/features';
import { saveJsonSettings } from '../services/saveJsonSettings';
import { JsonSettings } from '../types/jsonSettings';

const initialState: UserScheme = {
	_inited: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// устанавливаем пользователя при авторизации
		setAuthData: (state, action: PayloadAction<User>) => {
			state.authData = action.payload;
			setFeatureFlags(action.payload.features);
		},
		// чтобы идентифицировать, что пользователь уже авторизован
		initAuthData: (state) => {
			const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
			if (user) {
				const json = JSON.parse(user) as User;
				state.authData = json;
				setFeatureFlags(json.features);
			}
			state._inited = true;
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
	},
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
