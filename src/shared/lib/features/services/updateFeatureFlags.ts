import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { updateFeatureFlagsMutation } from '../api/featureFlagsApi';
import { getAllFeatureFlags, setFeatureFlags } from '../lib/setGetFeatures';

interface UpdateFeatureFlagOptions {
	userId: string;
	newFeatures: Partial<FeatureFlags>;
}

// async thunk, при помощи которого будет осуществляться переключение ui отображения
export const updateFeatureFlag = createAsyncThunk<
	void,
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
				// по итогу все равно весь объект фичей отправляем)
				features: allFeatures,
			}),
		);

		// при обновлении фичей посредством перезагрузки данное решение не нужно
		// при использование forceUpdate данное решение нужно, так как не происходит перезагрузки
		setFeatureFlags(allFeatures);

		// чтобы изменения отобразились, необходимо перезагрузить страницу
		// при текущей реализации мы храним фичи просто в константе, поэтому так
		window.location.reload();
		return undefined;
	} catch (e) {
		console.log(e);
		return rejectWithValue('');
	}
});
