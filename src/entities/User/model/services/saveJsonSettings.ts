import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { setJsonSettingsMutation } from '../../api/userApi';
import { getUserAuthData } from '../selectors/getUserAuthData/getUserAuthData';
import { getJsonSettings } from '../selectors/jsonSettings';
import { JsonSettings } from '../types/jsonSettings';

export const saveJsonSettings = createAsyncThunk<
	JsonSettings,
	JsonSettings,
	ThunkConfig<string>
>('user/saveJsonSettings', async (newJsonSettings, thunkApi) => {
	const { rejectWithValue, getState, dispatch } = thunkApi;
	// получение информации, необходимой для запроса по обновлению настроек
	const userData = getUserAuthData(getState());
	const currentSettings = getJsonSettings(getState());

	if (!userData) {
		return rejectWithValue('');
	}

	try {
		// unwrap позволяет достать результат разрешенного промиса
		// здесь он используется для того, чтобы провеить, что настройки пришли
		// далее настройки возвращаются
		const response = await dispatch(
			setJsonSettingsMutation({
				userId: userData.id,
				jsonSettings: {
					...currentSettings,
					...newJsonSettings,
				},
			}),
		).unwrap();

		if (!response.jsonSettings) {
			return rejectWithValue('');
		}

		return response.jsonSettings;
	} catch (e) {
		console.log(e);
		return rejectWithValue('');
	}
});
