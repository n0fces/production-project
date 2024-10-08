import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { User, userActions } from '@/entities/User';

interface LoginByUsernameProps {
	username: string;
	password: string;
}

export const loginByUsername = createAsyncThunk<
	User,
	LoginByUsernameProps,
	ThunkConfig<string>
>(
	'login/loginByUsername',
	async (authData, { rejectWithValue, dispatch, extra: { api } }) => {
		try {
			const response = await api.post<User>('/login', authData);
			// Если с сервера нам вернулся пустой объект, то будем считать это ошибкой. Предполагаем, что сервер обязательно должен нам что-то вернуть
			if (!response.data) {
				throw new Error();
			}

			dispatch(userActions.setAuthData(response.data));

			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue('error');
		}
	},
);
