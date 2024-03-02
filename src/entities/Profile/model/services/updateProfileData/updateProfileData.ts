import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from '../../types/profile';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';

export const updateProfileData = createAsyncThunk<
	Profile,
	void,
	ThunkConfig<string>
>(
	'profile/updateProfileData',
	async (_, { rejectWithValue, extra: { api }, getState }) => {
		// получаем текущие данные из формы редактирования
		const formData = getProfileForm(getState());
		try {
			// отправляем запрос на обновление данных
			const response = await api.put<Profile>('/profile', formData);
			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue('error');
		}
	}
);
