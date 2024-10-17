import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { FeatureFlags } from '@/shared/types/featureFlags';

import { updateFeatureFlagsMutation } from '../api/featureFlagsApi';
import { getAllFeatureFlags } from '../lib/setGetFeatures';

interface UpdateFeatureFlagOptions {
	userId: string;
	newFeatures: Partial<FeatureFlags>;
}

// async thunk, при помощи которого будет осуществляться переключение ui отображения
export const updateFeatureFlag = createAsyncThunk<
	undefined,
	UpdateFeatureFlagOptions,
	ThunkConfig<string>
>('features/updateFeatureFlag', async ({ userId, newFeatures }, thunkApi) => {
	const { rejectWithValue, dispatch } = thunkApi;

	const allFeatures = {
		...getAllFeatureFlags(),
		...newFeatures,
	};

	try {
		await dispatch(
			updateFeatureFlagsMutation({
				userId,
				features: allFeatures,
			}),
		);

		// чтобы изменения отобразились, необходимо перезагрузить страницу
		// при текущей реализации мы храним фичи просто в константе, поэтому так
		window.location.reload();
		return undefined;
	} catch (error) {
		return error instanceof Error
			? rejectWithValue(error.message)
			: rejectWithValue('error');
	}
});
