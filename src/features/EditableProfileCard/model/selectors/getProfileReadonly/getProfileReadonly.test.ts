import { StateScheme } from '@/app/providers/StoreProvider';

import { getProfileReadonly } from './getProfileReadonly';

describe('getProfileReadonly.test', () => {
	test('should return readonly state', () => {
		const state: DeepPartial<StateScheme> = {
			profile: {
				readonly: true,
			},
		};
		expect(getProfileReadonly(state as StateScheme)).toEqual(true);
	});
	test('should work with empty state', () => {
		const state: DeepPartial<StateScheme> = {};
		expect(getProfileReadonly(state as StateScheme)).toEqual(undefined);
	});
});
