import { StateScheme } from '@/app/providers/StoreProvider';
import { ValidateProfileError } from '../../consts/consts';
import { getProfileValidateErrors } from './getProfileValidateErrors';

describe('getProfileValidateErrors.test', () => {
	test('should work with filled state', () => {
		const state: DeepPartial<StateScheme> = {
			profile: {
				validateErrors: [
					ValidateProfileError.SERVER_ERROR,
					ValidateProfileError.INCORRECT_AGE,
				],
			},
		};
		expect(getProfileValidateErrors(state as StateScheme)).toEqual([
			ValidateProfileError.SERVER_ERROR,
			ValidateProfileError.INCORRECT_AGE,
		]);
	});
	test('should work with empty state', () => {
		const state: DeepPartial<StateScheme> = {};
		expect(getProfileValidateErrors(state as StateScheme)).toEqual(undefined);
	});
});
