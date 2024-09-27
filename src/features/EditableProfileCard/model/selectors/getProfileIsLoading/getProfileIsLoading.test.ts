import { StateScheme } from '@/app/providers/StoreProvider';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

import { getProfileIsLoading } from './getProfileIsLoading';

describe('getProfileIsLoading.test', () => {
	test('should return loading state', () => {
		const data = {
			first: 'Ilya',
			lastname: 'Abzalov',
			age: 21,
			currency: Currency.RUB,
			country: Country.Russia,
			city: 'Saint-Petersburg',
			username: 'admin',
		};
		const state: DeepPartial<StateScheme> = {
			profile: {
				isLoading: true,
			},
		};
		expect(getProfileIsLoading(state as StateScheme)).toEqual(true);
	});
	test('should work with empty state', () => {
		const state: DeepPartial<StateScheme> = {};
		expect(getProfileIsLoading(state as StateScheme)).toEqual(undefined);
	});
});
