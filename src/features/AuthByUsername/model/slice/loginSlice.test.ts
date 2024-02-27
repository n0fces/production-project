import { DeepPartial } from '@reduxjs/toolkit';
import { LoginScheme } from '../types/loginScheme';
import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice.test', () => {
	test('test set username', () => {
		const state: DeepPartial<LoginScheme> = {
			username: '123',
		};
		// редьюсер нам целиком возвращает стейт
		expect(
			loginReducer(state as LoginScheme, loginActions.setUsername('123'))
		).toEqual({ username: '123' });
	});
	test('test set password', () => {
		const state: DeepPartial<LoginScheme> = {
			password: '123',
		};
		expect(
			loginReducer(state as LoginScheme, loginActions.setPassword('123'))
		).toEqual({ password: '123' });
	});
	// мы не стали еще тестировать, что там происходит с isLoading и error, потому что преобразования там в редьюсере примитивные. Но если будет желание, то делается это через вызов асинхронного экшена (в данном случае loginByUsername), у которого есть состояния фулфилд, реджект и пендинг. Для каждого из этих состояний мы создаем экшен креатор и проводим тесты
});
