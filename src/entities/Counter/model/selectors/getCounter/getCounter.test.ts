import { DeepPartial } from '@reduxjs/toolkit';
import { StateScheme } from 'app/providers/StoreProvider';
import { getCounter } from './getCounter';

describe('getCounter', () => {
	test('should return counter value', () => {
		// DeepPartial позволяет нам инициализировать не весь стейт, а только то, что нам нужно. Как раз функция для наших тестов
		const state: DeepPartial<StateScheme> = {
			counter: { value: 10 },
		};
		// использование as нехорошо, но здесь это вполне уместно, так как без этого он будет ругаться, что мы передаем DeepPartial
		expect(getCounter(state as StateScheme)).toEqual({ value: 10 });
	});
});
