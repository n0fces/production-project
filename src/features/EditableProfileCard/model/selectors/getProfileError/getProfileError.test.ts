import { StateScheme } from 'app/providers/StoreProvider';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { getProfileError } from './getProfileError';

describe('getProfileError.test', () => {
	test('should return error', () => {
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
				error: 'error',
			},
		};
		expect(getProfileError(state as StateScheme)).toEqual('error');
	});
	test('should work with empty state', () => {
		const state: DeepPartial<StateScheme> = {};
		expect(getProfileError(state as StateScheme)).toEqual(undefined);
	});
});
