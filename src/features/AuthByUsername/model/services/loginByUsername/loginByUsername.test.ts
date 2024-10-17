import { userActions } from '@/entities/User';

import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { loginByUsername } from './loginByUsername';

describe('loginByUsername.test', () => {
	// * было до введения нами вспомогательного класса
	// // мокаем dispatch и getState
	// let dispatch: Dispatch;
	// let getState: () => StateScheme;

	// // перед каждый тестом будем мокать данные функции
	// beforeEach(() => {
	// 	// Библиотека Jest предоставляет jest.fn()функцию для создания «фиктивной» функции.
	// 	dispatch = jest.fn();
	// 	getState = jest.fn();
	// });

	test('success login', async () => {
		const userValue = { username: '123', id: '1' };
		// мы там возвращаем промис, в котором передаем ключ data

		const thunk = new TestAsyncThunk(loginByUsername);
		thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }));
		// callThunk - асинхронная функция, поэтому не забываем await
		const result = await thunk.callThunk({
			username: '123',
			password: '123',
		});
		// далее в зависимости от того, что мы получили в объекте result, мы можем делать различные проверки
		// здесь мы убеждаемся, что диспатч с изменением стора был вызван. Мы здесь проверяем даже не сам вызов диспатча, а то, с какими аргументами он был вызван
		expect(thunk.dispatch).toHaveBeenCalledWith(
			userActions.setAuthData(userValue),
		);
		// первый раз диспатч у нас отрабатывает, когда мы вызвали сам loginByUsername
		// второй раз диспатч срабатывает, когда вызываем с userActions.setAuthData(userValue)
		// третий раз, когда возвращаем результат
		// исходя из этих размышлений мы можем делать проверку на количество сработанных dispatch
		expect(thunk.dispatch).toHaveBeenCalledTimes(3);
		// сначала делаем проверку, что у нас вообще вызывался данный метод
		expect(thunk.api.post).toHaveBeenCalled();
		// потом делаем проверку на то, что закончился с состоянием fulfilled
		expect(result.meta.requestStatus).toBe('fulfilled');
		expect(result.payload).toEqual(userValue);
	});

	test('error login', async () => {
		// когда мы создаем вот такой отдельный объект при вызове класса, то dispatch и getState у нас свои в каждом объекте, поэтому мы не используем beforeEach
		const thunk = new TestAsyncThunk(loginByUsername);
		thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
		const result = await thunk.callThunk({
			username: '123',
			password: '123',
		});
		expect(thunk.dispatch).toHaveBeenCalledTimes(2);
		expect(thunk.api.post).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('rejected');
		expect(result.payload).toBe('Нет ответа от сервера');
	});

	// * было до введения нами вспомогательного класса
	// test('success login', async () => {
	// 	const userValue = { username: '123', id: '1' };
	// 	// мы там возвращаем промис, в котором передаем ключ data
	// 	mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));
	// 	// createAsyncThunk возвращает AsyncThunkAction (экшен)
	// 	const action = loginByUsername({ username: '123', password: '123' });
	// 	// 3 параметром задали undefined, потому что пока не работаем с extra параметром
	// 	// Этот экшен, который мы получили, обычно вызываем внутри диспатча. Как мы сейчас поняли, что нужно передавать в action? По типам нам стало лень пробираться, поэтому мы типа вызвали пустой action(), а потом посмотрели, что принимает эта функция
	// 	// вызываем этот экшен и получаем какой-то результат
	// 	const result = await action(dispatch, getState, undefined);
	// 	// далее в зависимости от того, что мы получили в объекте result, мы можем делать различные проверки
	// 	// здесь мы убеждаемся, что диспатч с изменением стора был вызван. Мы здесь проверяем даже не сам вызов диспатча, а то, с какими аргументами он был вызван
	// 	expect(dispatch).toHaveBeenCalledWith(
	// 		userActions.setAuthData(userValue)
	// 	);
	// 	// первый раз диспатч у нас отрабатывает, когда мы вызвали сам loginByUsername
	// 	// второй раз диспатч срабатывает, когда вызываем с userActions.setAuthData(userValue)
	// 	// третий раз, когда возвращаем результат
	// 	// исходя из этих размышлений мы можем делать проверку на количество сработанных dispatch
	// 	expect(dispatch).toHaveBeenCalledTimes(3);
	// 	// сначала делаем проверку, что у нас вообще вызывался данный метод
	// 	expect(mockedAxios.post).toHaveBeenCalled();
	// 	// потом делаем проверку на то, что закончился с состоянием fulfilled
	// 	expect(result.meta.requestStatus).toBe('fulfilled');
	// 	expect(result.payload).toEqual(userValue);
	// });

	// test('error login', async () => {
	// 	mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
	// 	const action = loginByUsername({ username: '123', password: '123' });
	// 	const result = await action(dispatch, getState, undefined);
	// 	expect(dispatch).toHaveBeenCalledTimes(2);
	// 	expect(mockedAxios.post).toHaveBeenCalled();
	// 	expect(result.meta.requestStatus).toBe('rejected');
	// 	expect(result.payload).toBe('error');
	// });
});
