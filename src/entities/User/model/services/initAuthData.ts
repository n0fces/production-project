import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';

import { getUserDataByIdQuery } from '../../api/userApi';
import { User } from '../types/user';

export const initAuthData = createAsyncThunk<
	User,
	undefined,
	ThunkConfig<string>
>('user/initAuthData', async (_, { rejectWithValue, dispatch }) => {
	const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);

	if (!userId) {
		return rejectWithValue('');
	}

	try {
		// unwrap позволяет достать результат разрешенного промиса
		// здесь он используется для того, чтобы провеить, что настройки пришли
		// далее настройки возвращаются
		const response = await dispatch(getUserDataByIdQuery(userId)).unwrap();

		return response;
	} catch (error) {
		return error instanceof Error
			? rejectWithValue(error.message)
			: rejectWithValue('error');
	}
});
