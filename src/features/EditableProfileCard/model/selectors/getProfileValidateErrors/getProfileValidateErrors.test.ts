import { StateScheme } from 'app/providers/StoreProvider';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { getProfileValidateErrors } from './getProfileValidateErrors';
import { ValidateProfileError } from '../../consts/consts';

describe('getProfileValidateErrors.test', () => {
	test('should return some validate errors', () => {
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
				validateErrors: [ValidateProfileError.INCORRECT_USER_DATA],
			},
		};
		expect(getProfileValidateErrors(state as StateScheme)).toEqual([
			ValidateProfileError.INCORRECT_USER_DATA,
		]);
	});
	test('should work with empty state', () => {
		const state: DeepPartial<StateScheme> = {};
		expect(getProfileValidateErrors(state as StateScheme)).toEqual(
			undefined
		);
	});
});
