import { StateScheme } from '@/app/providers/StoreProvider';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

import { getProfileData } from './getProfileData';

describe('getProfileData.test', () => {
	test('should return data', () => {
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
				data,
			},
		};
		expect(getProfileData(state as StateScheme)).toEqual(data);
	});
	test('should work with empty state', () => {
		const state: DeepPartial<StateScheme> = {};
		expect(getProfileData(state as StateScheme)).toEqual(undefined);
	});
});
