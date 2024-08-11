import { StateScheme } from 'app/providers/StoreProvider';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { getProfileReadonly } from './getProfileReadonly';

describe('getProfileReadonly.test', () => {
	test('should return readonly state', () => {
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
