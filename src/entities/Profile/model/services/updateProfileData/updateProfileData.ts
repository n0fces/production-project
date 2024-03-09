import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile, ValidateProfileError } from '../../types/profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { validateProfileData } from '../validateProfileData/validateProfileData';

export const updateProfileData = createAsyncThunk<
	Profile,
	void,
	ThunkConfig<ValidateProfileError[]>
>(
	'profile/updateProfileData',
	async (_, { rejectWithValue, extra: { api }, getState }) => {
		// получаем текущие данные из формы редактирования
		const formData = getProfileForm(getState());
		const errors = validateProfileData(formData);
		if (errors.length) {
			return rejectWithValue(errors);
		}
		try {
			// отправляем запрос на обновление данных для конкретного пользователя
			const response = await api.put<Profile>(
				`/profile/${formData?.id}`,
				formData
			);
			// предполагаем, что сервер точно должен нам вернуть какие-то данные
			if (!response.data) throw new Error();
			return response.data;
		} catch (error) {
			return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
		}
	}
);
