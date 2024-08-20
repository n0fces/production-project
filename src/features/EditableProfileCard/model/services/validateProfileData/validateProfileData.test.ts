import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { validateProfileData } from './validateProfileData';
import { ValidateProfileError } from '../../consts/consts';

const data = {
	first: 'Ilya',
	lastname: 'Abzalov',
	age: 21,
	currency: Currency.RUB,
	country: Country.Russia,
	city: 'Saint-Petersburg',
	username: 'admin',
};

describe('validateProfileData.test', () => {
	test('success', async () => {
		const result = validateProfileData(data);
		expect(result).toEqual([]);
	});

	test('without first and last name', async () => {
		const result = validateProfileData({
			...data,
			first: '',
			lastname: '',
		});
		expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
	});

	test('incorrect age', async () => {
		const result = validateProfileData({
			...data,
			age: undefined,
		});
		expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
	});

	test('incorrect countrye', async () => {
		const result = validateProfileData({
			...data,
			country: undefined,
		});
		expect(result).toEqual([ValidateProfileError.INCORRECT_COUNTRY]);
	});

	test('incorrect all', async () => {
		const result = validateProfileData({});
		expect(result).toEqual([
			ValidateProfileError.INCORRECT_USER_DATA,
			ValidateProfileError.INCORRECT_AGE,
			ValidateProfileError.INCORRECT_COUNTRY,
		]);
	});
});
