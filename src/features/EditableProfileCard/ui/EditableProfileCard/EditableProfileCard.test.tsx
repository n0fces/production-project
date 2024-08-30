import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { $api } from '@/shared/api/api';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Profile } from '@/entities/Profile';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';

// Общие данные мы выносим за пределы тест-кейсов
const profile: Profile = {
	id: '1',
	first: 'admin',
	lastname: 'admin',
	age: 45,
	currency: Currency.USD,
	country: Country.Russia,
	city: 'Moscow',
	username: 'admin123',
};

const options = {
	initialState: {
		profile: {
			readonly: true,
			data: profile,
			form: profile,
		},
		// Нужно для того, чтобы айди пользователя совпадал с тем, который у нас в профиле
		// Режим редактирования должен быть доступен для конкретного пользователя
		user: {
			authData: { id: '1', username: 'admin123' },
		},
	},
	asyncReducers: { profile: profileReducer },
};

describe('features/EditableProfileCard', () => {
	test('Writable mode must appear after click', async () => {
		componentRender(<EditableProfileCard id="1" />, options);
		await userEvent.click(
			screen.getByTestId('EditableProfileCardHeader.EditButton'),
		);
		// После того, как мы вошли в режим редактирования, у нас должна появиться кнопка отмены изменений
		expect(
			screen.getByTestId('EditableProfileCardHeader.CancelButton'),
		).toBeInTheDocument();
	});

	test('New data must be removed after click on the cancel button', async () => {
		componentRender(<EditableProfileCard id="1" />, options);
		await userEvent.click(
			screen.getByTestId('EditableProfileCardHeader.EditButton'),
		);

		await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
		await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));

		await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');
		await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user');

		// Убеждаемся, что введенное значение вообще попало в инпут
		expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user');
		expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user');

		await userEvent.click(
			screen.getByTestId('EditableProfileCardHeader.CancelButton'),
		);
		// После отмены в инпуты должны вернуться прежние значения
		expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('admin');
		expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin');
	});

	test('Validating data', async () => {
		componentRender(<EditableProfileCard id="1" />, options);
		await userEvent.click(
			screen.getByTestId('EditableProfileCardHeader.EditButton'),
		);

		// Очищаем данные
		await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));

		// Сохраняем изменения (должна быть ошибка, так как данное поле не может быть пустым)
		await userEvent.click(
			screen.getByTestId('EditableProfileCardHeader.SaveButton'),
		);

		// Убеждаемся, что появилась ошибка
		expect(
			screen.getByTestId('EditableProfileCard.Error.Paragraph'),
		).toBeInTheDocument();
	});

	test('If you pass vaidating data, we send PUT request to the server', async () => {
		const mockPutReq = jest.spyOn($api, 'put');
		componentRender(<EditableProfileCard id="1" />, options);
		await userEvent.click(
			screen.getByTestId('EditableProfileCardHeader.EditButton'),
		);

		await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');

		await userEvent.click(
			screen.getByTestId('EditableProfileCardHeader.SaveButton'),
		);

		// Убеждаемся, что запрос после успешной валидации отправился на сервер
		expect(mockPutReq).toHaveBeenCalled();
	});
});
