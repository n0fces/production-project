import { rtkApi } from '@/shared/api/rtkApi';
import { FeatureFlags } from '@/shared/types/featureFlags';

interface UpdateFeatureFlagsOptions {
	userId: string;
	// необходимо поменять только одну из настроек, поэтому указано через Partial
	features: Partial<FeatureFlags>;
}

const featureFlagsApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		updateFeatureFlags: build.mutation<undefined, UpdateFeatureFlagsOptions>({
			query: ({ userId, features }) => ({
				url: `/users/${userId}`,
				method: 'PATCH',
				body: {
					features,
				},
			}),
		}),
	}),
});

export const updateFeatureFlagsMutation =
	featureFlagsApi.endpoints.updateFeatureFlags.initiate;
