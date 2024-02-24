import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';

interface loginByUsernameProps {
	username: string;
	password: string;
}

// Здесь будут коды ошибки. В стейте будет хранить коды ошибок, а вот в компонентах в зависимости от кода ошибки показывать нужный текст
enum LoginError {
	INCORRECT_DATA = '',
	SERVER_ERROR = '',
}

export const loginByUsername = createAsyncThunk<
	User,
	loginByUsernameProps,
	{ rejectValue: string }
>('login/loginByUsername', async (authData, { rejectWithValue, dispatch }) => {
	try {
		const response = await axios.post<User>(
			'http://localhost:8000/login',
			authData
		);
		// Если с сервера нам вернулся пустой объект, то будем считать это ошибкой. Предполагаем, что сервер обязательно должен нам что-то вернуть
		if (!response.data) {
			throw new Error();
		}
		localStorage.setItem(
			USER_LOCALSTORAGE_KEY,
			JSON.stringify(response.data)
		);
		dispatch(userActions.setAuthData(response.data));

		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue('error');
	}
});
