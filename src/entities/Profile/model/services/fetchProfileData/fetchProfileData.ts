import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from '../../types/profile';

export const fetchProfileData = createAsyncThunk<
	Profile,
	void,
	ThunkConfig<string>
>(
	'profile/fetchProfileData',
	async (_, { rejectWithValue, extra: { api, navigate } }) => {
		try {
			const response = await api.get<Profile>('/profile');
			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue('error');
		}
	}
);
