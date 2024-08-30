import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '@/entities/Profile';

export const fetchProfileData = createAsyncThunk<
	Profile,
	string,
	ThunkConfig<string>
>(
	'profile/fetchProfileData',
	async (profileId, { rejectWithValue, extra: { api } }) => {
		try {
			// запрашивам конкретного пользователя
			const response = await api.get<Profile>(`/profile/${profileId}`);
			// предполагаем, что бэкенд точно должен вернуть какие-то данные
			if (!response.data) throw new Error();
			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue('error');
		}
	},
);
