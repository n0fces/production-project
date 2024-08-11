import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { profileActions, profileReducer } from './profileSlice';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import {
	ProfileScheme,
	ValidateProfileError,
} from '../types/EditableProfileCardSchema';

const data = {
	first: 'Ilya',
	lastname: 'Abzalov',
	age: 21,
	currency: Currency.RUB,
	country: Country.Russia,
	city: 'Saint-Petersburg',
	username: 'admin',
};

describe('profileSlice.test', () => {
	// на самом деле тестирование этих редьюсеров, когда там практически нет сложной логики, не имеет смысла
	test('setReadonly', () => {
		const state: DeepPartial<ProfileScheme> = {
			readonly: false,
		};
		expect(
			profileReducer(
				state as ProfileScheme,
				profileActions.setReadonly(true)
			)
		).toEqual({
			readonly: true,
		});
	});

	test('cancelEdit', () => {
		const state: DeepPartial<ProfileScheme> = {
			data,
			form: { username: '' },
		};
		expect(
			profileReducer(state as ProfileScheme, profileActions.cancelEdit())
		).toEqual({
			readonly: true,
			validateErrors: undefined,
			data,
			form: data,
		});
	});

	test('updateProfile', () => {
		const state: DeepPartial<ProfileScheme> = { form: { username: '' } };

		expect(
			profileReducer(
				state as ProfileScheme,
				profileActions.updateProfile({
					username: 'Ilya',
				})
			)
		).toEqual({
			form: { username: 'Ilya' },
		});
	});

	// Здесь мы тестируем асинхронные экшены. Все аналогично, только мы здесь явно указываем какое именно состояние тестируется у асинхронного экшена
	test('test update profile service pending', () => {
		const state: DeepPartial<ProfileScheme> = {
			isLoading: false,
			validateErrors: [ValidateProfileError.SERVER_ERROR],
		};

		expect(
			profileReducer(state as ProfileScheme, updateProfileData.pending)
		).toEqual({
			isLoading: true,
			validateErrors: undefined,
		});
	});

	test('test update profile service fullfiled', () => {
		const state: DeepPartial<ProfileScheme> = {
			isLoading: true,
		};

		expect(
			profileReducer(
				state as ProfileScheme,
				updateProfileData.fulfilled(data, '')
			)
		).toEqual({
			isLoading: false,
			validateErrors: undefined,
			readonly: true,
			validateError: undefined,
			form: data,
			data,
		});
	});
});
